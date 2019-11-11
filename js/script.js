var camera, pos, controls, scene, renderer, geometry, geometry1, material;

function init() {
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x000000);
	
	renderer = new THREE.WebGLRenderer();
	
	
	
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerWidth);
	
	var container = document.getElementById('main');
	container.appendChild(renderer.domElement);
	
	camera = new THREE.PerspectiveCamera(
		70,
		window.innerWidth / window.innerHeight,
		0.001, 1000
	);
	camera.position.set( 0, 0, 600 );
	
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	
	let canvas = document.createElement('canvas');
	let ctx = canvas.getContext('2d');
	document.body.appendChild(canvas);
	resize();
	
	
	geometry = new THREE.PlaneGeometry(400, 400, 12, 12)
	material = new THREE.ShaderMaterial( {
		// uniforms: {
		// 	sourceTex: { type: 't', value: obj[0].texture },
		// 	targetTex: { type: 't', value: obj[1].texture },
		// 	blend: { type: 'f', value: 0 },
		// 	size: { type: 'f', value: 2.1 },
		// 	direction: {type: 'f', value: 0},
		// 	dimensions: { type: 'v2', value: new THREE.Vector2(w,h) }
		// },
		vertexShader: document.getElementById( 'vertexShader' ).textContent,
		fragmentShader: document.getElementById( 'fragmentShader' ).textContent
	});
	
	let con = new THREE.MeshBasicMaterial({color: 0x00ff00});
	
	let points = new THREE.Mesh(geometry, material);
	scene.add(points);
}

function resize() {
	var w = window.innerWidth;
	var h = window.innerHeight;
	renderer.setSize( w, h );
	camera.aspect = w / h;
	camera.updateProjectionMatrix();
}

let time = 0;
function animate() {
	time++;
	
	requestAnimationFrame(animate);
	render();
}

function render() {
	renderer.render(scene, camera);
}

init();
animate();

window.onresize = function () {
	resize()
}