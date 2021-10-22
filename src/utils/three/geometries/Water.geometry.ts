import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water";
import waternormals from "../../../assets/3D/textures/waternormals.jpg";

class WaterGeometry {
  public scene: THREE.Scene;
  public geometry: THREE.PlaneGeometry;
  public mesh: Water;

  constructor(scene: THREE.Scene) {
    this.scene = scene;
    this.geometry = new THREE.PlaneGeometry(10000, 10000);
    this.mesh = new Water(this.geometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load(
        waternormals,
        function (texture) {
          texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        }
      ),
      alpha: 1.0,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x006769,
      distortionScale: 3.7,
      fog: this.scene.fog !== undefined,
    });
    this.mesh.rotation.x = -Math.PI / 2;
  }
}

export default WaterGeometry;
