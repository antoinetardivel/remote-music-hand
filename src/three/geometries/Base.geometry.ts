// import tiles from "../../../assets/3D/textures/tiles.jpg";
// import { GUI } from "dat.gui";
import * as THREE from "three";

class BaseGeometry {
  private geometry: THREE.CylinderGeometry;
  private material: THREE.MeshBasicMaterial;
  private texture: THREE.Texture;
  private parameters: {
    position: { x: number; z: number };
  };
  public mesh: THREE.Mesh;

  constructor(x: number, z: number) {
    this.geometry = new THREE.CylinderGeometry(100, 100, 32, 32);
    const image = new Image();
    const textureLoader = new THREE.TextureLoader();
    const wallMaterial = new THREE.MeshMatcapMaterial();
    const matcapTextureWall = textureLoader.load("/textures/matcaps/gold.jpg");
    wallMaterial.matcap = matcapTextureWall;
    this.texture = new THREE.Texture(image);
    this.texture.wrapS = THREE.RepeatWrapping;
    this.texture.wrapT = THREE.RepeatWrapping;
    this.texture.repeat.set(9, 9);
    image.addEventListener("load", () => {
      this.texture.needsUpdate = true;
    });
    image.src = "/textures/tiles/tiles4.jpg";
    this.material = new THREE.MeshBasicMaterial({ map: this.texture });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.y = 15;
    this.parameters = {
      position: {
        x: x,
        z: z,
      },
    };

    // const gui = new GUI();
    // gui.add(this.parameters.position, "x", -1000, 1000, 10);
    // gui.add(this.parameters.position, "z", -1000, 1000, 10);
    // gui.add(this.mesh.geometry, "radialSegments", 0, 100, 1);
  }
  update() {
    this.mesh.position.x = this.parameters.position.x;
    this.mesh.position.z = this.parameters.position.z;
  }
}

export default BaseGeometry;
