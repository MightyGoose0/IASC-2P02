import * as THREE from "three"
import * as dat from "lil-gui"
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.132.2/examples/jsm/controls/OrbitControls.js';

/**********
** SETUP **
***********/
// Sizes
const sizes = {
    width: window.innerWidth / 2.5,
    height: window.innerWidth / 2.5,
    aspectRatio: 1
}

/***********
** SCENE **
***********/
// Canvas
const canvas = document.querySelector('.webgl2')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('gray')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
camera.position.set(0, 0, 20)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

// Orbit Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/***********
** LIGHTS **
************/
// Directional Light
const directionalLight = new THREE.DirectionalLight(0x404040, 800)
scene.add(directionalLight)

/***********
** MESHES **
************/
/*
// Sphere Geometry
const sphereGeometry = new THREE.SphereGeometry(0.5)

// Sphere Materials
const redMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('red')
})
const pinkMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('pink')
})
const yellowMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('yellow')
})
const greenMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('green')
})

const drawSphere = (i, material) =>
{
    const sphere = new THREE.Mesh(sphereGeometry, material)
    sphere.position.x = (Math.random() - 0.5) * 10
    sphere.position.z = (Math.random() - 0.5) * 10
    sphere.position.y = i - 10

    sphere.rotation.x = Math.random() * 2 * Math.PI
    sphere.rotation.y = Math.random() * 2 * Math.PI
    sphere.rotation.z = Math.random() * 2 * Math.PI

    sphere.randomizer = Math.random()

    scene.add(sphere)
}
*/
// Define the heart shape geometry
const heartShape = new THREE.Shape();
heartShape.moveTo(0, -0.7);
heartShape.bezierCurveTo(0, -0.7, 0.05, -2, 0.8, -0.8); // Even sharper angle at the top
heartShape.bezierCurveTo(1.2, -0.1, 0, 1.5, -0.8, -0.1);
heartShape.bezierCurveTo(-1.2, -0.8, -0.4, -2, 0, -0.7);
// Bottom-right curve with acute angle

// Extrude the shape to create a 3D geometry
const extrudeSettings = {
    steps: 2,
    depth: 0.1,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.1,
    bevelSegments: 2
};
const heartGeometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);

// Heart Material
const redMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('red')
})
const pinkMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('purple')
})
const yellowMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('pink')
})
const greenMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('yellow')
})

// Function to draw a heart
const heartObjects = [];
const drawHeart = (n, material) => {
    // Create a mesh using the heart geometry and material
    const heart = new THREE.Mesh(heartGeometry, material);
    // Set random positions within a range
    heart.position.x = n - 10 ;
    heart.position.z = (Math.random() - 0.5) * 10;
    heart.position.y = (Math.random() - 0.5) * 10; // Offset the hearts vertically using n

    // Set random rotations
    heart.rotation.x = Math.random() * 2 * Math.PI;
    heart.rotation.y = Math.random() * 2 * Math.PI;
    heart.rotation.z = Math.random() * 2 * Math.PI;

    // Add the heart to the scene
    scene.add(heart);
    heartObjects.push(heart);
};

const cubeGeometry = new THREE.BoxGeometry(0.75, 0.75, 0.75)
const drawCube = (i, material) =>
{
    const cube = new THREE.Mesh(cubeGeometry, material)
    cube.position.x = i - 10
    cube.position.z = (Math.random() - 0.5) * 10
    cube.position.y = (Math.random() - 0.5) * 10

    cube.rotation.x = Math.random() * 2 * Math.PI
    cube.rotation.y = Math.random() * 2 * Math.PI
    cube.rotation.z = Math.random() * 2 * Math.PI

    scene.add(cube)
}



/**********************
** TEXT PARSERS & UI **
***********************/
let preset = {}

const uiobj = {
    text: '',
    textArray: [],
    term1: 'rule',
    term2: 'order',
    term3: 'peace',
    term4: 'freedom',
    rotateCamera: false,
    animateHearts: false
}

// Text Parsers
// Parse Text and Terms
const parseTextandTerms = () =>
{
    // Strip periods and downcase text
    const parsedText = uiobj.text.replaceAll(".", "").toLowerCase()
    //console.log(parsedText)

    // Tokenize text
    uiobj.textArray = parsedText.split(/[^\w+d']+/)
    //console.log(uiobj.textArray)

    // Find term 1
    findTermInParsedText(uiobj.term1, redMaterial)

    // Find term 2
    findTermInParsedText(uiobj.term2, pinkMaterial)

    // Find term 3
    findTermInParsedText(uiobj.term3, yellowMaterial)

    //find term 4
    findTermInParsedText(uiobj.term4, greenMaterial)

}

const findTermInParsedText = (term, material) =>
{
    for (let i=0; i < uiobj.textArray.length; i++)
    {
        //console.log(i, uiobj.textArray[i])
        if(uiobj.textArray[i] === term)
        {
            if (term === uiobj.term1 || term === uiobj.term2) {
         //console.log(i, term)
         // convert i into n, which is a value between 0 and 20
                const n = (100 / uiobj.textArray.length) * i * 0.2
         
         // call drawsphere function 5 times using converted n value
                for(let a=0; a < 3; a++)
                {
                    drawCube(n, material)
                }
            }
            else {
                const n = (100 / uiobj.textArray.length) * i * 0.2
         
                for(let a=0; a < 3; a++)
                {
                    drawHeart(n, material)
                }
            }
        }
    }
}

// Load source text
fetch("https://raw.githubusercontent.com/pull-ups/ybigta_21winter/master/2021.%202.%204%20(%EB%AA%A9)%20wordcloud-konlpy/The%20Hunger%20Games.txt")
    .then(response => response.text())
    .then((data) =>
    {
        uiobj.text = data
        parseTextandTerms()
    }
    )

// UI
const ui = new dat.GUI({
    container: document.querySelector('#parent2')
})

// Interaction Folders
    // spheres Folder
    const spheresFolder = ui.addFolder('Filter Terms')

    spheresFolder
        .add(redMaterial, 'visible')
        .name(`${uiobj.term1}`)

    spheresFolder
        .add(pinkMaterial, 'visible')
        .name(`${uiobj.term2}`)

    spheresFolder
        .add(yellowMaterial, 'visible')
        .name(`${uiobj.term3}`)
    
    spheresFolder
        .add(greenMaterial, 'visible')
        .name(`${uiobj.term4}`)


    spheresFolder
        .add(uiobj, 'animateHearts')
        .name('Animate Hearts')

    // Camera Folder
    const cameraFolder = ui.addFolder('Camera')

    cameraFolder
        .add(uiobj, 'rotateCamera')
        .name('Rotate Camera')

/*******************
** ANIMATION LOOP **
********************/
/*
const clock = new THREE.Clock()
console.log(scene.children)

// Animate
const animation = () =>
{
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime()

    // Orbit Controls
    controls.update()

    // Camera Rotation
    if(uiobj.rotateCamera)
    {
        camera.position.x = Math.sin(elapsedTime * 0.2) * 16
        camera.position.z = Math.cos(elapsedTime * 0.2) * 16
    }

    // Animate Bubbles
    if(uiobj.animateBubbles){
        for(let i=0; i < scene.children.length; i++)
        {
            if(scene.children[i].type === "Mesh")
            {
                scene.children[i].scale.x = Math.sin(elapsedTime * scene.children[i].randomizer)
                scene.children[i].scale.y = Math.sin(elapsedTime * scene.children[i].randomizer)
                scene.children[i].scale.z = Math.sin(elapsedTime * scene.children[i].randomizer)
            }
        }
    } 


    // Renderer
    renderer.render(scene, camera)

    // Request next frame
    window.requestAnimationFrame(animation)
}

animation()
*/

// Define a rotation speed
const clock = new THREE.Clock()
console.log(scene.children)
const rotationSpeed = 0.05;

// Animation loop
const animation = () => {
    // Return elapsedTime
    const elapsedTime = clock.getElapsedTime();

    // Orbit Controls
    controls.update();

    // Camera Rotation
    if (uiobj.rotateCamera) {
        camera.position.x = Math.sin(elapsedTime * 0.2) * 16;
        camera.position.z = Math.cos(elapsedTime * 0.2) * 16;
    }

    if (uiobj.animateHearts) {
        heartObjects.forEach(heart => {
            heart.rotation.y += rotationSpeed;
        });
    }

    // Render the scene
    renderer.render(scene, camera);

    // Request next frame
    window.requestAnimationFrame(animation);
};

// Start the animation loop
animation();
