import * as THREE from "three";

class BubbleGeometry {
  private geometry: THREE.SphereGeometry;
  private material: THREE.MeshMatcapMaterial;
  public mesh: THREE.Mesh;

  constructor() {
    const textureLoader = new THREE.TextureLoader();
    this.material = new THREE.MeshMatcapMaterial({});

    const matcapTexture = textureLoader.load("/textures/matcaps/metal2.jpg");
    this.material.matcap = matcapTexture;

    this.geometry = new THREE.SphereGeometry(50, 32, 16);

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.y = 150;
    this.mesh.position.z = 400;
    this.mesh.position.x = 0;
    this.mesh.frustumCulled = true;
  }
  update(clock: any) {}
}

export default BubbleGeometry;
