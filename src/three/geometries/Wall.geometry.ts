import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

class WallGeometry {
  private gltfLoader: GLTFLoader;
  public mesh: THREE.Group;
  public material: THREE.MeshMatcapMaterial;
  public texture: THREE.Texture;

  constructor(gltfLoader: GLTFLoader, textureLoader: THREE.TextureLoader) {
    this.gltfLoader = gltfLoader;
    this.material = new THREE.MeshMatcapMaterial();
    this.texture = textureLoader.load("/textures/matcaps/wall.jpg");
    this.material.matcap = this.texture;
    this.mesh = new THREE.Group();
    this.gltfLoader.load(
      "/models/wall.gltf",
      (gltf) => {
        while (gltf.scene.children.length) {
          //@ts-ignore
          let geometry: THREE.Mesh = gltf.scene.children[0];
          geometry.traverse((vertice) => {
            if (geometry.isMesh) {
              //@ts-ignore
              vertice.material = this.material;
            }
          });
          this.mesh.add(geometry);
        }
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );
    this.mesh.scale.x = 50;
    this.mesh.scale.y = 50;
    this.mesh.scale.z = 50;
    this.mesh.frustumCulled = true;
  }
  update() {}
}

export default WallGeometry;
