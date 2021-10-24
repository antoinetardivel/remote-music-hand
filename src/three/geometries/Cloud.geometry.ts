import * as THREE from "three";
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise";
import { WEBGL } from "three/examples/jsm/WebGL.js";

class CloudGeometry {
  public material: THREE.RawShaderMaterial;
  public geometry: THREE.BoxGeometry;
  public mesh: THREE.Mesh;
  public texture: THREE.DataTexture3D;
  public parameters: {
    threshold: number;
    opacity: number;
    range: number;
    steps: number;
  };
  constructor() {
    if (WEBGL.isWebGL2Available() === false) {
      document.body.appendChild(WEBGL.getWebGL2ErrorMessage());
    }
    const size = 128;
    const data = new Uint8Array(size * size * size);
    let i = 0;
    const scale = 0.05;
    const perlin = new ImprovedNoise();
    const vector = new THREE.Vector3();
    for (let z = 0; z < size; z++) {
      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const d =
            1.0 -
            vector
              .set(x, y, z)
              .subScalar(size / 2)
              .divideScalar(size)
              .length();
          data[i] =
            (128 +
              128 *
                perlin.noise((x * scale) / 1.5, y * scale, (z * scale) / 1.5)) *
            d *
            d;
          i++;
        }
      }
    }
    this.texture = new THREE.DataTexture3D(data, size, size, size);
    this.texture.format = THREE.RedFormat;
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;
    this.texture.unpackAlignment = 1;
    this.geometry = new THREE.BoxGeometry(50, 50, 50);
    this.material = new THREE.RawShaderMaterial({
      glslVersion: THREE.GLSL3,
      uniforms: {
        base: { value: new THREE.Color(0x798aa0) },
        map: { value: this.texture },
        cameraPos: { value: new THREE.Vector3() },
        threshold: { value: 0.25 },
        opacity: { value: 0.25 },
        range: { value: 0.1 },
        steps: { value: 100 },
        frame: { value: 0 },
      },
      vertexShader,
      fragmentShader,
      side: THREE.BackSide,
      transparent: true,
    });
    this.parameters = {
      threshold: 0.25,
      opacity: 0.25,
      range: 0.1,
      steps: 100,
    };
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.y = 50;
    this.mesh.scale.x = 50;
    this.mesh.scale.y = 50;
    this.mesh.scale.z = 50;
    this.mesh.rotation.x = Math.PI / 2;

    //@ts-ignore
    this.mesh.material.uniforms.threshold.value = this.parameters.threshold;
    //@ts-ignore
    this.mesh.material.uniforms.opacity.value = this.parameters.opacity;
    //@ts-ignore
    this.mesh.material.uniforms.range.value = this.parameters.range;
    //@ts-ignore
    this.mesh.material.uniforms.steps.value = this.parameters.steps;
  }

  update(cameraPosition?: THREE.Vector3) {
    //@ts-ignore
    this.mesh.material.uniforms.threshold.value = this.parameters.threshold;
    //@ts-ignore
    this.mesh.material.uniforms.opacity.value = this.parameters.opacity;
    //@ts-ignore
    this.mesh.material.uniforms.range.value = this.parameters.range;
    //@ts-ignore
    this.mesh.material.uniforms.steps.value = this.parameters.steps;

    if (cameraPosition)
      //@ts-ignore
      //   this.mesh.material.uniforms.cameraPos.value.copy(cameraPosition);
      //@ts-ignore
      this.mesh.material.uniforms.frame.value++;
    this.mesh.rotation.y = -performance.now() / 7500;
  }
}
export default CloudGeometry;

const vertexShader = /* glsl */ `
					in vec3 position;
					uniform mat4 modelMatrix;
					uniform mat4 modelViewMatrix;
					uniform mat4 projectionMatrix;
					uniform vec3 cameraPos;
					out vec3 vOrigin;
					out vec3 vDirection;
					void main() {
						vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
						vOrigin = vec3( inverse( modelMatrix ) * vec4( cameraPos, 1.0 ) ).xyz;
						vDirection = position - vOrigin;
						gl_Position = projectionMatrix * mvPosition;
					}
				`;

const fragmentShader = /* glsl */ `
					precision highp float;
					precision highp sampler3D;
					uniform mat4 modelViewMatrix;
					uniform mat4 projectionMatrix;
					in vec3 vOrigin;
					in vec3 vDirection;
					out vec4 color;
					uniform vec3 base;
					uniform sampler3D map;
					uniform float threshold;
					uniform float range;
					uniform float opacity;
					uniform float steps;
					uniform float frame;
					uint wang_hash(uint seed)
					{
							seed = (seed ^ 61u) ^ (seed >> 16u);
							seed *= 9u;
							seed = seed ^ (seed >> 4u);
							seed *= 0x27d4eb2du;
							seed = seed ^ (seed >> 15u);
							return seed;
					}
					float randomFloat(inout uint seed)
					{
							return float(wang_hash(seed)) / 4294967296.;
					}
					vec2 hitBox( vec3 orig, vec3 dir ) {
						const vec3 box_min = vec3( - 0.5 );
						const vec3 box_max = vec3( 0.5 );
						vec3 inv_dir = 1.0 / dir;
						vec3 tmin_tmp = ( box_min - orig ) * inv_dir;
						vec3 tmax_tmp = ( box_max - orig ) * inv_dir;
						vec3 tmin = min( tmin_tmp, tmax_tmp );
						vec3 tmax = max( tmin_tmp, tmax_tmp );
						float t0 = max( tmin.x, max( tmin.y, tmin.z ) );
						float t1 = min( tmax.x, min( tmax.y, tmax.z ) );
						return vec2( t0, t1 );
					}
					float sample1( vec3 p ) {
						return texture( map, p ).r;
					}
					float shading( vec3 coord ) {
						float step = 0.01;
						return sample1( coord + vec3( - step ) ) - sample1( coord + vec3( step ) );
					}
					void main(){
						vec3 rayDir = normalize( vDirection );
						vec2 bounds = hitBox( vOrigin, rayDir );
						if ( bounds.x > bounds.y ) discard;
						bounds.x = max( bounds.x, 0.0 );
						vec3 p = vOrigin + bounds.x * rayDir;
						vec3 inc = 1.0 / abs( rayDir );
						float delta = min( inc.x, min( inc.y, inc.z ) );
						delta /= steps;
						// Jitter
						// Nice little seed from
						// https://blog.demofox.org/2020/05/25/casual-shadertoy-path-tracing-1-basic-camera-diffuse-emissive/
						uint seed = uint( gl_FragCoord.x ) * uint( 1973 ) + uint( gl_FragCoord.y ) * uint( 9277 ) + uint( frame ) * uint( 26699 );
						vec3 size = vec3( textureSize( map, 0 ) );
						float randNum = randomFloat( seed ) * 2.0 - 1.0;
						p += rayDir * randNum * ( 1.0 / size );
						//
						vec4 ac = vec4( base, 0.0 );
						for ( float t = bounds.x; t < bounds.y; t += delta ) {
							float d = sample1( p + 0.5 );
							d = smoothstep( threshold - range, threshold + range, d ) * opacity;
							float col = shading( p + 0.5 ) * 3.0 + ( ( p.x + p.y ) * 0.25 ) + 0.2;
							ac.rgb += ( 1.0 - ac.a ) * d * col;
							ac.a += ( 1.0 - ac.a ) * d;
							if ( ac.a >= 0.95 ) break;
							p += rayDir * delta;
						}
						color = ac;
						if ( color.a == 0.0 ) discard;
					}
				`;
