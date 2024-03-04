import * as THREE from "three"

console.log(THREE)

/* 
Scence 
*/

// Canvas
const canvas = document.querySelector('.webgl')

// Scene 
const scene = new THREE.Scene()
scene.background = new THREE.Color('orange')

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
)
camera.position.set(0,0,5)
scene.add(camera)
// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(window.innerWidth, window.innerHeight )
/* 
Meshes
*/ 
//testSphere
const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

const geometry = new THREE.ConeGeometry( 2, 2, 10 ); 
const material = new THREE.MeshNormalMaterial();
const cone = new THREE.Mesh(geometry, material );
/*testSphere.position.set(0,0,-5)
scene.add(testSphere) */ 

cone.position.set(0,0,-5)
scene.add(cone)

/* 
Animation loop
*/
const clock = new THREE.Clock()
// Animate 
const animation = () => {
    const elapsedTime = clock.getElapsedTime()

    //animate testSphere
    cone.position.x = Math.sin(elapsedTime)

    renderer.render(scene, camera)

    window.requestAnimationFrame(animation)
}

animation()