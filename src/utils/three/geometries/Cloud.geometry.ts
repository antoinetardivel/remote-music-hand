import * as THREE from "three";
import { ImprovedNoise } from "three/examples/jsm/math/ImprovedNoise";
import { WEBGL } from "three/examples/jsm/WebGL.js";
import vertexShader from "../shaders/cloud/vertex.glsl";
import fragmentShader from "../shaders/cloud/fragments.glsl";
import { GUI } from "dat.gui";

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
    this.geometry = new THREE.BoxGeometry(1, 1, 1);
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

    const gui = new GUI();
    gui.add(this.parameters, "threshold", 0, 1, 0.01).onChange(this.update);
    gui.add(this.parameters, "opacity", 0, 1, 0.01).onChange(this.update);
    gui.add(this.parameters, "range", 0, 1, 0.01).onChange(this.update);
    gui.add(this.parameters, "steps", 0, 200, 1).onChange(this.update);
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
      this.mesh.material.uniforms.cameraPos.value.copy(cameraPosition);
    //@ts-ignore
    this.mesh.material.uniforms.frame.value++;
    this.mesh.rotation.y = -performance.now() / 7500;
  }
}
export default CloudGeometry;
