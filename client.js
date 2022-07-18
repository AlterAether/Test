import * as THREE from '/build/three.module.js';
import { OrbitControls } from '/jsm/controls/OrbitControls.js';
import Stats from '/jsm/libs/stats.module.js';

//THREEnity
let scene;
let camera;
let renderer;

const canvas = document.querySelector('.webgl')

// A. Scene
scene = new THREE.Scene();

// B1. camera value
const fov = 60; // in degrees
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1; 
const far = 1000;
// B2. Pass camera value
camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
scene.add(camera);

// C. Renderer WebGL
renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
// C2. Renderer Size
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.autoClear = false;
renderer.setClearColor(0x000000, 0.0);


// D. Earth Geometry [in segments]
const earthGeometry = new THREE.SphereGeometry(0.6, 32, 32);// D, W, H
// D2. Earh Material [textures]
const earthMaterial = new THREE.MeshPhongMaterial({
    roughness: 1,
    metalness: 0,
    map : THREE.ImageUtils.loadTexture('texture/Earth_Col_6K.png'),
    bumpMap : THREE.ImageUtils.loadTexture('texture/earthbump.jpg'),
    bumpScale: 0.3
});
// D3. Earth Mesh [geometry+ material]
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earthMesh);

// H. Clouds
const cloudGeometry = new THREE.SphereGeometry(0.63, 32, 32);
const cloudMaterial = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture('texture/earthCloud.png'),
    transparent: true
});
const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);
scene.add(cloudMesh);

// I. Background Environment
const starGeometry = new THREE.SphereGeometry(80, 64, 64); //big sphere
const starMaterial = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('texture/8k_stars_milky_way.jpeg'), // image texture
    side: THREE.BackSide // bake the inside sphere
});
const starMesh = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starMesh);


// E. Light Sources
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 3, 5);
scene.add(ambientLight, pointLight); 

// F. Animate Function [earth rot]
const animate = () =>{
    requestAnimationFrame(animate);
    cloudMesh.rotation.y -=0.001;
    earthMesh.rotation.y -= 0.0015;
    starMesh.rotation.y -=0.002;
    controls.update();
    render();
}

// G. Camera Controls
const controls = new OrbitControls(camera, renderer.domElement);

// Z. Render Function
const render = () =>{
    renderer.render(scene, camera);
}

animate();