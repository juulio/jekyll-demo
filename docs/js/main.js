/**
 * Julio Del Valle - Costa Rica 2021
 */
 const sceneArray = [ scene00, scene01, scene02, scene03, scene04, scene05, scene06, scene07, scene08, scene09];
 let clock, shaderStuff;
 const shaderMaterials = [];

 /**
 * Set uniforms for shader Materials
 */
let uniforms = {
    u_time: { type: "f", value: 1.0 },
    u_resolution: { type: "v2", value: new THREE.Vector2() },
    u_mouse: { type: "v2", value: new THREE.Vector2() }
};

 /**
 * Init Uniforms for shaderMaerial
 * TODO: create a shaderMaterial array to use several shaders on several materials
 */
const setupShaderMaterials = () => {
    let vertexShaderEl = document.getElementById( 'vertexShader' ).textContent;

    uniforms.u_resolution.value.x = window.innerWidth;
    uniforms.u_resolution.value.y = window.innerHeight;

    shaderMaterials.push(
        new THREE.ShaderMaterial( {
            name: "Voronoi",
            uniforms: uniforms,
            vertexShader: vertexShaderEl,
            fragmentShader: document.getElementById( 'voronoiFragmentShader' ).textContent
        })
    );

    shaderMaterials.push(
        new THREE.ShaderMaterial( {
            name: "Jaguar Texture",
            uniforms: uniforms,
            vertexShader: vertexShaderEl,
            fragmentShader: document.getElementById( 'jaguarFragmentShader' ).textContent
        })
    );

    shaderMaterials.push(
        new THREE.ShaderMaterial( {
            name: "Red Pulse",
            uniforms: uniforms,
            vertexShader: vertexShaderEl,
            fragmentShader: document.getElementById( 'redPulseFragmentShader' ).textContent
        })
    );

    shaderMaterials.push(
        new THREE.ShaderMaterial( {
            name: "Black & White Matrix",
            uniforms: uniforms,
            vertexShader: vertexShaderEl,
            fragmentShader: document.getElementById( 'bwMatrixFragmentShader' ).textContent
        })
    );

    shaderMaterials.push(
        new THREE.ShaderMaterial( {
            name: "Rotated Tiles",
            uniforms: uniforms,
            vertexShader: vertexShaderEl,
            fragmentShader: document.getElementById( 'rotatedTilesFragmentShader' ).textContent
        })
    );

    shaderMaterials.push(
        new THREE.ShaderMaterial( {
            name: "Noise",
            uniforms: uniforms,
            vertexShader: document.getElementById( 'vertexShader' ).textContent,
            fragmentShader: document.getElementById( 'noiseFragmentShader' ).textContent
        })
    );

    shaderMaterials.push(
        new THREE.ShaderMaterial( {
            name: "Simplex Grid",
            uniforms: uniforms,
            vertexShader: document.getElementById( 'vertexShader' ).textContent,
            fragmentShader: document.getElementById( 'simplexGridFragmentShader' ).textContent
        })
    );

    shaderMaterials.push(
        new THREE.ShaderMaterial( {
            name: "Displacement",
            uniforms: uniforms,
            vertexShader: document.getElementById( 'vertexShader' ).textContent,
            fragmentShader: document.getElementById( 'displacementFragmentShader' ).textContent
        })
    );
}

setupShaderMaterials();
 // console.log(sceneArray);

import scene00 from "./scenes/scene00.js";
import scene01 from "./scenes/scene01.js";
import scene02 from "./scenes/scene02.js";
import scene03 from "./scenes/scene03.js";
import scene04 from "./scenes/scene04.js";
import scene05 from "./scenes/scene05.js";
import scene06 from "./scenes/scene06.js";
import scene07 from "./scenes/scene07.js";
import scene08 from "./scenes/scene08.js";
import scene09 from "./scenes/scene09.js";


/**
 * Set basic THREEjs scene stuff
 */
let scene;
const rendererWidth = window.innerWidth;
const rendererHeight = window.innerHeight;
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( rendererWidth, rendererHeight );
renderer.setClearColor ( "#ffffff");

document.body.appendChild( renderer.domElement );
camera.position.z = 5;

clock = new THREE.Clock();
scene = scene00;
 
/**
 * Set all Click Event listeners
 */
const navLinks = document.getElementsByClassName('navLink');
Array.from(navLinks).forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        scene = sceneArray[index];
    });    
});

 
/**
 * Handles onWindowResize event and updates Projection Matrix
 */
const onWindowResize = () => {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = rendererWidth / rendererHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( rendererWidth, rendererHeight );
}

/**
 * Init the animate loop to render the Scene
 */
const animate = () => {
	requestAnimationFrame( animate );

    let delta = clock.getDelta();
    // sceneObject.uniforms.u_time.value += delta * 2;
    uniforms.u_time.value += delta * 2;

	renderer.render( scene, camera );
}

animate();

// export default uniforms;
export default shaderMaterials;