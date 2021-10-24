// import tiles from "../../../assets/3D/textures/tiles.jpg";
// import { GUI } from "dat.gui";
import gsap from "gsap";
import * as THREE from "three";
import noise from "./BlobNoice";

class BlobGeometry {
  private geometry: THREE.IcosahedronBufferGeometry;
  private matCapMaterial: THREE.MeshMatcapMaterial;
  private uniforms: {
    uTime: { value: number };
    uSpeed: { value: number };
    uNoiseDensity: { value: number };
    uNoiseStrength: { value: number };
  };
  public parameters: {
    speed: number;
    density: number;
    strength: number;
    roughness: number;
    metalness: number;
    clearcoat: number;
    clearcoatRoughness: number;
  };
  public mesh: THREE.Mesh;

  constructor(z: number, x: number, color: "gold" | "green") {
    this.parameters = {
      speed: 0.2,
      density: 2.58,
      strength: 0.04,
      roughness: 0,
      metalness: 1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    };
    const textureLoader = new THREE.TextureLoader();
    this.matCapMaterial = new THREE.MeshMatcapMaterial({});
    this.uniforms = {
      uTime: {
        value: 0,
      },
      uSpeed: {
        value: this.parameters.speed,
      },
      uNoiseDensity: {
        value: this.parameters.density,
      },
      uNoiseStrength: {
        value: this.parameters.strength,
      },
    };
    const matcapTexture = textureLoader.load(`/textures/matcaps/${color}.jpg`);
    this.matCapMaterial.matcap = matcapTexture;
    this.matCapMaterial.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = this.uniforms.uTime;
      shader.uniforms.uSpeed = this.uniforms.uSpeed;
      shader.uniforms.uNoiseDensity = this.uniforms.uNoiseDensity;
      shader.uniforms.uNoiseStrength = this.uniforms.uNoiseStrength;
      shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        `
        #include <common>
  
        uniform float uTime;
        uniform float uSpeed;
        uniform float uNoiseDensity;
        uniform float uNoiseStrength;

        ${noise}
        `
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <displacementmap_vertex>",
        `
          #include <displacementmap_vertex>
          float t = uTime * uSpeed;
          float distortion = pnoise((normal + t) * uNoiseDensity, vec3(10.0)) * uNoiseStrength;
          vec3 pos = position + (normal * distortion);
          vNormal = normal;
        `
      );
      shader.vertexShader = shader.vertexShader.replace(
        "#include <project_vertex>",
        `
          #include <project_vertex>
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
        `
      );
    };

    this.geometry = new THREE.IcosahedronBufferGeometry(1, 64);

    this.mesh = new THREE.Mesh(this.geometry, this.matCapMaterial);
    this.mesh.scale.x = 50;
    this.mesh.scale.y = 50;
    this.mesh.scale.z = 50;
    this.mesh.position.y = 150;
    this.mesh.position.z = z;
    this.mesh.position.x = x;

    this.uniforms.uTime.value = 0;
    this.uniforms.uSpeed.value = this.parameters.speed;
    this.uniforms.uNoiseDensity.value = this.parameters.density;
    this.uniforms.uNoiseStrength.value = this.parameters.strength;
  }
  update(clock: any) {
    this.uniforms.uTime.value = clock;
    this.uniforms.uSpeed.value = this.parameters.speed;
    this.uniforms.uNoiseDensity.value = this.parameters.density;
    this.uniforms.uNoiseStrength.value = this.parameters.strength;
  }
  on() {
    if (this.parameters.strength <= 0.04) {
      gsap.fromTo(
        this.parameters,
        { strength: 0.04 },
        { strength: 0.4, duration: 0.7, ease: "easeIn" }
      );
    }
  }
  off() {
    if (this.parameters.strength >= 0.4) {
      gsap.fromTo(
        this.parameters,
        { strength: 0.4 },
        { strength: 0.04, duration: 0.7, ease: "easeOut" }
      );
    }
  }
}

export default BlobGeometry;
