import { Sky } from "three/examples/jsm/objects/Sky";
import { Water } from "three/examples/jsm/objects/Water";
import * as THREE from "three";

class SkyGeometry {
  public mesh: Sky;
  public uniforms;
  public parameters: {
    elevation: number;
    azimuth: number;
  };

  public pmremGenerator: THREE.PMREMGenerator;
  public sun: THREE.Vector3;
  public renderer: THREE.WebGLRenderer;
  public phi: number;
  public theta: number;
  constructor(renderer: THREE.WebGLRenderer) {
    this.renderer = renderer;
    this.mesh = new Sky();
    this.mesh.scale.setScalar(10000);
    this.uniforms = this.mesh.material.uniforms;
    this.uniforms["turbidity"].value = 7;
    this.uniforms["rayleigh"].value = 2;
    this.uniforms["mieCoefficient"].value = 0.005;
    this.uniforms["mieDirectionalG"].value = 0.8;
    this.parameters = {
      elevation: 2.5,
      azimuth: 170,
    };
    this.sun = new THREE.Vector3();
    this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.phi = THREE.MathUtils.degToRad(90 - this.parameters.elevation);
    this.theta = THREE.MathUtils.degToRad(this.parameters.azimuth);
    this.sun.setFromSphericalCoords(1, this.phi, this.theta);
    this.mesh.material.uniforms["sunPosition"].value.copy(this.sun);
    this.mesh.frustumCulled = true;
  }

  update(water: Water, scene: THREE.Scene) {
    this.phi = THREE.MathUtils.degToRad(90 - this.parameters.elevation);
    this.theta = THREE.MathUtils.degToRad(this.parameters.azimuth);
    this.sun.setFromSphericalCoords(1, this.phi, this.theta);
    this.mesh.material.uniforms["sunPosition"].value.copy(this.sun);
    water.material.uniforms["sunDirection"].value.copy(this.sun).normalize();
    scene.environment = this.pmremGenerator.fromScene(this.mesh as any).texture;
  }
}

export default SkyGeometry;
