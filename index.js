'use strict';

const makeDiv = () => document.createElement('div');

const game = new Game(document.getElementById('game'));
const scene_scripts = [
	'scene-1.js',
	'scene-2.js',
	'scene-3.js',
];
const load = (href, cb) => {
	const $script = document.createElement('script');
	$script.addEventListener('load', cb);
	document.body.appendChild($script);
	$script.src = href;
};
const loader = () => scene_scripts.length && load(scene_scripts.shift(), loader);
loader();
