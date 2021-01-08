import React, { Component } from "react";
import * as THREE from "three";
import { MTLLoader, OBJLoader } from "three-obj-mtl-loader";
import OrbitControls from "three-orbitcontrols";

export default class Animation extends Component {
  componentDidMount() {
    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;

    this.scene = new THREE.Scene();

    //Add Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setClearColor("#263268");
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);

    //Add Camera
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 8;
    this.camera.position.y = 5;

    //Camera Controls
    const controls = new OrbitControls(this.camera, this.renderer.domElement);

    //Lights
    var lights = [];

    lights[0] = new THREE.PointLight(0x304ffe, 1, 0);
    lights[1] = new THREE.PointLight(0xffffff, 1, 0);
    lights[2] = new THREE.PointLight(0xffffff, 1, 0);
    lights[0].position.set(0, 200, 0);
    lights[1].position.set(100, 200, 100);
    lights[2].position.set(-100, -200, -100);
    this.scene.add(lights[0]);
    this.scene.add(lights[1]);
    this.scene.add(lights[2]);

    //Add 3D models here
    this.addModels();

    this.renderScene();

    //start Animation
    this.start();
  }

  addModels() {
    //Models in 3.js are called Mesh = Geometry + Material

    // const cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
    // const material = new THREE.MeshBasicMaterial({
    //   color: "#0F0",
    // });
    // this.cubeMesh = new THREE.Mesh(geometry, material);
    // this.scene.add(this.cubeMesh);

    //Buffer geometry has bette perfromance than normal geometry

    const bufferCubeGeometry = new THREE.BoxBufferGeometry(5, 5, 5);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: false,
    });
    this.cubeBufferMesh = new THREE.Mesh(bufferCubeGeometry, material);
    this.scene.add(this.cubeBufferMesh);
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  };

  stop = () => {
    cancelAnimationFrame(this.frameId);
  };

  animate = () => {
    //Animate models here
    //Rotate
    if (this.cubeBufferMesh) this.cubeBufferMesh.rotation.y += 0.01;

    //reDraw scene with and Camera and Scene object
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  };

  renderScene = () => {
    if (this.renderer) this.renderer.render(this.scene, this.camera);
  };

  render() {
    return (
      <div
        style={{ width: "800px", height: "800px" }}
        ref={(mount) => {
          this.mount = mount;
        }}
      ></div>
    );
  }
}
