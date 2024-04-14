//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import * as PIXI from "https://cdn.skypack.dev/pixi.js@5.x";
import { KawaseBlurFilter } from "https://cdn.skypack.dev/@pixi/filter-kawase-blur@3.2.0";
import SimplexNoise from "https://cdn.skypack.dev/simplex-noise@3.0.0";
import hsl from "https://cdn.skypack.dev/hsl-to-hex";
import debounce from "https://cdn.skypack.dev/debounce";
//Create a Three.JS Scene
const scene = new THREE.Scene();
//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 5, 1000 );

//Keep track of the mouse position, so we can make the cpm move
let mouseX = window.innerWidth;
let mouseY = window.innerHeight ;

//Keep the 3D object on a global variable so we can access it later
let object;

//OrbitControls allow the camera to move around the scene
let controls;

//Set which object to render
let objToRender = 'cpm';

//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

//Load the file
loader.load(
  `models/${objToRender}/desktop_pc.gltf`,
  function (gltf) {
    //If the file is loaded, add it to the scene
    object = gltf.scene;
    scene.add(object);
  },
  function (xhr) {
    //While it is loading, log the progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    //If there is an error, log it
    console.error(error);
  }
);

//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

//Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
camera.position.z = objToRender === "cpm" ? 25 : 100;

//Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
topLight.position.set(1, 10, 500) //top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "cpm" ? 5 : 1);
scene.add(ambientLight);

//This adds controls to the camera, so we can rotate / zoom it with the mouse

//Render the scene
function animate() {
  requestAnimationFrame(animate);
  //Here we could add some code to update the scene, adding some automatic movement

  //Make the cpm move
  if (object && objToRender === "cpm") {
    //I've played with the constants here until it looked good 
    object.rotation.y = 11 - mouseX / window.innerWidth / -2;
    object.rotation.x = -.001 + mouseY * 1  / window.innerHeight;
  }
  
  renderer.render(scene, camera);
}

//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//add mouse position listener, so we can make the cpm move
document.onmousemove = (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

//Start the 3D 
animate();





function random(min, max) {
  return Math.random() * (max - min) + min;
}


function map(n, start1, end1, start2, end2) {
  return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}


const simplex = new SimplexNoise();


class ColorPalette {
  constructor() {
    this.setColors();
    this.setCustomProperties();
  }

  setColors() {
    
    this.hue = ~~random(221, 321);
    this.complimentaryHue1 = this.hue + 30;
    this.complimentaryHue2 = this.hue + 70;
   
    this.saturation = 95;
    this.lightness = 50;


    this.baseColor = hsl(this.hue, this.saturation, this.lightness);
   
    this.complimentaryColor1 = hsl(
      this.complimentaryHue1,
      this.saturation,
      this.lightness
    );
    
    this.complimentaryColor2 = hsl(
      this.complimentaryHue2,
      this.saturation,
      this.lightness
    );

  
    this.colorChoices = [
      this.baseColor,
      this.complimentaryColor1,
      this.complimentaryColor2
    ];
  }

  randomColor() {

    return this.colorChoices[~~random(1, this.colorChoices.length)].replace(
      '#',
      "0x"
    );
  }

  setCustomProperties() {
    document.documentElement.style.setProperty("--hue", this.hue);
    document.documentElement.style.setProperty(
      "--hue-complimentary1",
      this.complimentaryHue1
    );
    document.documentElement.style.setProperty(
      "--hue-complimentary2",
      this.complimentaryHue2
    );
  }
}

class Orb {
  constructor(fill = 0x000000) {
    this.bounds = this.setBounds();

    this.x = random(this.bounds["x"].min, this.bounds["x"].max);
    this.y = random(this.bounds["y"].min, this.bounds["y"].max);

    this.scale = 3;

    this.fill = fill;

    this.radius = random(window.innerHeight * .8, window.innerHeight * .5);


    this.xOff = random(0, 100);
    this.yOff = random(0, 100);

    this.inc = 0.005;


    this.graphics = new PIXI.Graphics();
    this.graphics.alpha = 0.825;


    window.addEventListener(
      "resize",
      debounce(() => {
        this.bounds = this.setBounds();
      }, 10)
    );
  }

  setBounds() {
    const maxDist =
      window.innerWidth < 100 ? window.innerWidth / 3 : window.innerWidth / 5;
    const originX = window.innerWidth / 2.25;
    const originY =
      window.innerWidth < 500
        ? window.innerHeight
        : window.innerHeight / 1.5;

    return {
      x: {
        min: originX - maxDist,
        max: originX + maxDist
      },
      y: {
        min: originY - maxDist,
        max: originY + maxDist
      }
    };
  }

  update() {
    const xNoise = simplex.noise2D(this.xOff, this.xOff);
    const yNoise = simplex.noise2D(this.yOff, this.yOff);
    const scaleNoise = simplex.noise2D(this.xOff, this.yOff);

    this.x = map(xNoise, -1, 1, this.bounds["x"].min, this.bounds["x"].max);
    this.y = map(yNoise, -1, 1, this.bounds["y"].min, this.bounds["y"].max);

    this.scale = map(scaleNoise, -1, 1, 0.5, 1);

    this.xOff += this.inc;
    this.yOff += this.inc;
  }

  render() {
    this.graphics.x = this.x;
    this.graphics.y = this.y;
    this.graphics.scale.set(this.scale);

    this.graphics.clear();

    this.graphics.beginFill(this.fill);
    this.graphics.drawCircle(0, 0, this.radius);

    this.graphics.endFill();
  }
}

const app = new PIXI.Application({
  view: document.querySelector(".orb-canvas"),
 
  resizeTo: window,

  transparent: true
});

app.stage.filters = [new KawaseBlurFilter(30, 10, true)];


const colorPalette = new ColorPalette();


const orbs = [];

for (let i = 0; i < 10; i++) {
  const orb = new Orb(colorPalette.randomColor());

  app.stage.addChild(orb.graphics);

  orbs.push(orb);
}

// Animowanie
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  app.ticker.add(() => {
    orbs.forEach((orb) => {
      orb.update();
      orb.render();
    });
  });
} else {
  orbs.forEach((orb) => {
    orb.update();
    orb.render();
  });
}

document


//projekty 

