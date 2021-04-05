'use strict';

const game = new Game(document.getElementById('game'));
const start_up_scene = 'Scene 1';

Loader.preloadImages([
	'resource/cell/avatar/wlt.png',
	'resource/cell/avatar/sparrow.png',
	'resource/cell/avatar/shasha.png',
	'resource/cell/avatar/ctl.png',
	'resource/cell/avatar/lbf.png',
	'resource/cell/avatar/nobody.png',
	'resource/scene-1/background.png',
	'resource/scene-1/foreground.png',
	'resource/cell/screen/moment.png',
	'resource/cell/screen/post.png',
	'resource/cell/screen/chat.png',
	'resource/cell/screen/post-green.png',
	'resource/cell/avatar/1.png',

	'resource/scene-2/sunset.png',
	'resource/scene-2/wall.png',
	'resource/scene-2/curtain-close.png',
	'resource/scene-2/character-1.png',
	'resource/scene-2/curtain-open.png',
	'resource/scene-2/out-1.png',
	'resource/scene-2/out-2.png',

	'resource/scene-3/desktop.png',
	'resource/scene-3/character.png',
	'resource/scene-3/files/0.png',
	'resource/scene-3/files/1.png',
	'resource/scene-3/files/2.png',
	'resource/scene-3/files/3.png',
	'resource/scene-3/files/4.png',
	'resource/scene-3/files/5.png',
	'resource/scene-3/files/6.png',
	'resource/scene-3/files/7.png',
	'resource/scene-3/desktop-2.png',
], () => 1, () => Loader.loadScripts([
	'scene/1.js',
	'scene/2.js',
	'scene/3.js',
	'scene/4.js',
], () => {
	game.focusOn(start_up_scene);
	game.updateViewport();
	game.activate(start_up_scene);
	setTimeout(() => game.root.style.transitionDuration = '1s', 500);
}));
