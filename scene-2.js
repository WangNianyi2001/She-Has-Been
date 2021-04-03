{
	'use strict';

	// Declaration
	const scene = game.createStoryboard('Scene 2', [855, 540], [972, 0, 0]);
	scene.setStyle('perspective', '100px');

	// Resources
	const sunset = scene.createComponent([855, 540], [0, 0, 0]);
	sunset.setStyle('backgroundImage', 'url(resource/scene-2/sunset.png)');
	const background = scene.createComponent([855, 540], [0, 0, 0]);
	background.setStyle('backgroundImage', 'url(resource/scene-2/wall.png)');
	const foreground = scene.createComponent([855, 540], [0, 0, 0]);
	foreground.setStyle('backgroundImage', 'url(resource/scene-2/curtain-close.png)');
	const character = Game.makeRootlet();
	foreground.append(character);
	character.setStyle('width', '284px');
	character.setStyle('height', '355px');
	character.setStyle('transform', 'translate3d(100px, 185px, 0px)');
	character.setStyle('backgroundImage', 'url(resource/scene-2/character-1.png)');

	// Action sequence
	scene.addAction(foreground.toWaitForClick());
	const td = '1s';
	scene.addInstantAction(() => {
		foreground.setStyle('backgroundImage', 'url(resource/scene-2/curtain-open.png)');
		foreground.setStyle('transform', 'translate3d(0px, 0px, 0px)');
		background.setStyle('transform', 'translate3d(0px, 0px, 0px)');
		foreground.setStyle('transitionDuration', td);
		background.setStyle('transitionDuration', td);
	});
	scene.addAction(Game.toDelay(1));
	scene.addInstantAction(() => {
		foreground.setStyle('transform', 'translate3d(50px, 50px, 30px)');
		background.setStyle('transform', 'translate3d(50px, 50px, 30px)');
	});
	scene.addAction(foreground.toWaitForClick());

	// End
	scene.addAction(cb => {
		game.focusOn('Scene 3');
		game.updateViewport();
		game.activate('Scene 3');
		cb();
	});
}
