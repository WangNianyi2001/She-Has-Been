{
	'use strict';

	// Declaration
	const scene = game.createStoryboard('Scene 1', [960, 540], [0, 0, 0]);
	scene.setStyle('perspective', '100px');

	// Resources
	const foreground = scene.createComponent([960, 540], [0, 0, 0]);
	foreground.setStyle('background-image', 'url(../resources/front.png)');
	const background = scene.createComponent([960, 540], [0, 0, -10]);
	background.setStyle('background-image', 'url(../resources/back.png)');

	// Action sequence
	scene.actions = [
		foreground.toWaitForClick(),
	];

	// Instant actions
	game.focusOn('Scene 1');
	game.updateViewport();
	game.activate('Scene 1');
}
