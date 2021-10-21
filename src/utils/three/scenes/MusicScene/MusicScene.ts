import * as THREE from "three";
import Emiter from "../../emiter";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import WaterGeometry from "../../geometries/Water.geometry";
import SkyGeometry from "../../geometries/Sky.geometry";
import CloudGeometry from "../../geometries/Cloud.geometry";
import { WEBGL } from "three/examples/jsm/WebGL";

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
  public cloud: CloudGeometry;

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

    this.water = new WaterGeometry(this.scene);
    this.scene.add(this.water.mesh);
    this.sky = new SkyGeometry(this.renderer);
    this.scene.add(this.sky.mesh);
    this.cloud = new CloudGeometry();
    this.scene.add(this.cloud.mesh);

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
    camera.position.set(30, 30, 100);
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
    controls.target.set(0, 10, 0);
    return controls;
  }

  updateCamera() {
    this.camera.updateProjectionMatrix();
  }

  onWindowResize() {
    this.updateCamera();
    this.cloud.update(this.camera.position);
    this.sky.update(this.water.mesh, this.scene);
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
    this.cloud.update(this.camera.position);
    this.controls.update();
    this.sky.update(this.water.mesh, this.scene);
    this.renderer.render(this.scene, this.camera);
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
