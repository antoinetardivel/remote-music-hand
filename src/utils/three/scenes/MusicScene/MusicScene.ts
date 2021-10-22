import * as THREE from "three";
import Emiter from "../../emiter";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import WaterGeometry from "../../geometries/Water.geometry";
import SkyGeometry from "../../geometries/Sky.geometry";
// import CloudGeometry from "../../geometries/Cloud.geometry";
import { WEBGL } from "three/examples/jsm/WebGL";
import BaseGeometry from "../../geometries/Base.geometry";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import BlobGeometry from "../../geometries/Blob/Blob.geometry";

export type TCanva = HTMLCanvasElement | THREE.OffscreenCanvas | undefined;

export default class MusicScene {
  public scene: THREE.Scene;
  public renderer;
  public clock;
  public camera: THREE.PerspectiveCamera;
  public container: TCanva;
  public emiter;
  public controls: OrbitControls;
  public elapsedTime: number;
  public sun: THREE.Vector3;
  public water: WaterGeometry;
  public sky: SkyGeometry;
  public base1: BaseGeometry;
  public base2: BaseGeometry;
  public base3: BaseGeometry;
  public base4: BaseGeometry;
  public base5: BaseGeometry;
  public blob1: BlobGeometry;
  public blob2: BlobGeometry;
  public blob3: BlobGeometry;
  public blob4: BlobGeometry;
  public blob5: BlobGeometry;

  constructor() {
    /**
     * Events
     */
    this.emiter = new Emiter();

    /**
     * Scene
     */
    this.scene = new THREE.Scene();
    // this.scene.background = new THREE.Color(0xff0000);
    this.container = document.getElementById("scene") as TCanva;
    if (this.container === null) {
      this.container = undefined;
    }

    /**
     * Renderer
     */
    if (WEBGL.isWebGL2Available() === false) {
      document.body.appendChild(WEBGL.getWebGL2ErrorMessage());
    }
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.container,
      antialias: true,
      alpha: false,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;

    /**
     * Clock
     */
    this.clock = new THREE.Clock();
    this.elapsedTime = this.clock.getElapsedTime();

    /**
     * Inits
     */
    this.sun = new THREE.Vector3();

    const ambientLight = new THREE.AmbientLight(0xffffff, 100);
    this.scene.add(ambientLight);

    this.water = new WaterGeometry(this.scene);
    this.scene.add(this.water.mesh);

    this.sky = new SkyGeometry(this.renderer);
    this.scene.add(this.sky.mesh);

    this.base1 = new BaseGeometry(0, 200);
    this.scene.add(this.base1.mesh);
    this.base2 = new BaseGeometry(-440, 200);
    this.scene.add(this.base2.mesh);
    this.base3 = new BaseGeometry(440, 200);
    this.scene.add(this.base3.mesh);
    this.base4 = new BaseGeometry(105, 440);
    this.scene.add(this.base4.mesh);
    this.base5 = new BaseGeometry(-265, 440);
    this.scene.add(this.base5.mesh);

    this.blob1 = new BlobGeometry(200, 0, "green");
    this.scene.add(this.blob1.mesh);
    this.blob2 = new BlobGeometry(200, -440, "green");
    this.scene.add(this.blob2.mesh);
    this.blob3 = new BlobGeometry(200, 440, "green");
    this.scene.add(this.blob3.mesh);
    this.blob4 = new BlobGeometry(440, 105, "gold");
    this.scene.add(this.blob4.mesh);
    this.blob5 = new BlobGeometry(440, -265, "gold");
    this.scene.add(this.blob5.mesh);

    // this.scene.add(bubble.mesh);

    const gltfLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();
    const wall = new THREE.Group();

    const wallMaterial = new THREE.MeshMatcapMaterial();
    const matcapTextureWall = textureLoader.load("/textures/matcaps/wall.jpg");
    wallMaterial.matcap = matcapTextureWall;

    gltfLoader.load(
      "/models/wall.gltf",
      (gltf) => {
        while (gltf.scene.children.length) {
          //@ts-ignore
          let mesh: THREE.Mesh = gltf.scene.children[0];
          mesh.traverse((vertice) => {
            if (mesh.isMesh) {
              //@ts-ignore
              vertice.material = wallMaterial;
            }
          });
          wall.add(mesh);
        }
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );
    wall.scale.x = 50;
    wall.scale.y = 50;
    wall.scale.z = 50;
    this.scene.add(wall);

    this.camera = this.initCamera();
    this.controls = this.initControls();
    this.update();
    this.bindEvents();
  }

  on(event: any, callback: any) {
    this.emiter.on(event, callback);
  }

  initCamera() {
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      1,
      20000
    );
    camera.position.set(-274, 164, 1046);
    return camera;
  }
  initControls() {
    const controls = new OrbitControls(
      this.camera,
      this.container as HTMLElement
    );
    // controls.maxPolarAngle = Math.PI * 0.495;
    // controls.minDistance = 40.0;
    // controls.maxDistance = 200.0;
    controls.enableDamping = true;
    controls.target.set(-73, 54, 75);
    //controls.enabled = false;
    return controls;
  }

  updateCamera() {
    this.camera.updateProjectionMatrix();
    this.camera.aspect = window.innerWidth / window.innerHeight;
  }

  onWindowResize() {
    this.updateCamera();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  onMouseMove(event: any) {
    // console.log(event);
  }

  update() {
    requestAnimationFrame(this.update.bind(this));

    this.elapsedTime = this.clock.getElapsedTime();
    this.water.mesh.material.uniforms["time"].value += 1.0 / 80.0;

    this.base1.update();
    this.base2.update();
    this.base3.update();
    this.base4.update();
    this.base5.update();

    this.blob1.update(this.clock.getElapsedTime());
    this.blob2.update(this.clock.getElapsedTime());
    this.blob3.update(this.clock.getElapsedTime());
    this.blob4.update(this.clock.getElapsedTime());
    this.blob5.update(this.clock.getElapsedTime());

    this.controls.update();
    this.sky.update(this.water.mesh, this.scene);
    this.renderer.render(this.scene, this.camera);
  }
  play(blob: number) {
    switch (blob) {
      case 1:
        this.blob1.on();
        this.blob2.off();
        this.blob3.off();
        this.blob4.off();
        this.blob5.off();
        break;
      case 2:
        this.blob1.off();
        this.blob2.on();
        this.blob3.off();
        this.blob4.off();
        this.blob5.off();
        break;
      case 3:
        this.blob1.off();
        this.blob2.off();
        this.blob3.on();
        this.blob4.off();
        this.blob5.off();
        break;
      case 4:
        this.blob1.off();
        this.blob2.off();
        this.blob3.off();
        this.blob4.on();
        this.blob5.off();
        break;
      case 5:
        this.blob1.off();
        this.blob2.off();
        this.blob3.off();
        this.blob4.off();
        this.blob5.on();
        break;
      default:
        this.blob1.off();
        this.blob2.off();
        this.blob3.off();
        this.blob4.off();
        this.blob5.off();
    }
  }

  bindEvents() {
    if ("ontouchstart" in window) {
      document.addEventListener("touchmove", (ev) => this.onMouseMove(ev));
    } else {
      window.addEventListener("resize", () => this.onWindowResize());
      document.addEventListener("mousemove", (ev) => this.onMouseMove(ev));
    }
  }

  loadScene() {}
}
