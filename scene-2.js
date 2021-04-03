{
	'use strict';

	// Declaration
	const scene = game.createStoryboard('Scene 2', [855, 540], [972, 0, 0]);
	scene.setStyle('perspective', '100px');

	// Resources
	const background = scene.createComponent([855, 540], [0, 0, 0]);
	background.setStyle('backgroundImage', 'url(resource/scene-2/wall.png)');
	const foreground = scene.createComponent([855, 540], [0, 0, 0]);
	foreground.setStyle('backgroundImage', 'url(resource/scene-2/curtain-close.png)');
	const sunset = scene.createComponent([855, 540], [0, 0, 0]);
	sunset.setStyle('backgroundImage', 'url(resource/scene-2/sunset.png)');
	sunset.setStyle('zIndex', '-1');

	// Action sequence
	scene.addAction(foreground.toWaitForClick());
	const td = '1s';
	scene.addAction(cb => {
		foreground.setStyle('backgroundImage', 'url(resource/scene-2/curtain-open.png)');
		foreground.setStyle('transform', 'translate3d(0px, 0px, 0px)');
		background.setStyle('transform', 'translate3d(0px, 0px, 0px)');
		foreground.setStyle('transitionDuration', td);
		background.setStyle('transitionDuration', td);
		cb();
	});
	scene.addAction(Game.toDelay(1));
	scene.addAction(cb => {
		foreground.setStyle('transform', 'translate3d(0px, 0px, 10px)');
		background.setStyle('transform', 'translate3d(0px, 0px, 10px)');
		cb();
	});
}

