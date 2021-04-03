{
	'use strict';

	// Configurations
	const width = 855, height = 540;
	const zooming_duration = 1;
	const delay_interval = .5;
	const dialogues = [
		// true - self, false - opposite
		[false, 'Hello, cnm!'],
		[true, 'Cnm, too!'],
		[false, 'You say your mother ne? I\'m your father.'],
		[true, 'How could it be? There\'s no way for a grandson to be a father.'],
		[false, 'I cnm.'],
	];

	// Declaration
	const scene = game.createStoryboard('Scene 2', [width, height], [972, 0, 0]);
	scene.setStyle('perspective', '100px');

	// Resources
	const sunset = scene.createComponent([width, height], [0, 0, 0]);
	sunset.setStyle('backgroundImage', 'url(resource/scene-2/sunset.png)');
	const background = scene.createComponent([width, height], [0, 0, 0]);
	background.setStyle('backgroundImage', 'url(resource/scene-2/wall.png)');
	const foreground = scene.createComponent([width, height], [0, 0, 0]);
	foreground.setStyle('backgroundImage', 'url(resource/scene-2/curtain-close.png)');
	const character = Game.makeRootlet();
	foreground.append(character);
	character.setStyle('opacity', '0');
	character.setStyle('transitionDuration', '1s');
	character.setStyle('width', '284px');
	character.setStyle('height', '355px');
	character.setStyle('transform', 'translate3d(100px, 185px, 0px)');
	character.setStyle('backgroundImage', 'url(resource/scene-2/character-1.png)');

	// Action sequence
	scene.addAction(Game.toDelay(1));
	scene.addAction(character.toStyle('opacity', '1'));
	scene.addAction(Game.toDelay(0.1));
	scene.addAction(character.toStyle('transitionDuration', '0s'));
	scene.addAction(foreground.toWaitForClick());
	scene.addInstantAction(() => {
		foreground.setStyle('backgroundImage', 'url(resource/scene-2/curtain-open.png)');
		foreground.setStyle('transitionDuration', `${zooming_duration}s`);
		background.setStyle('transitionDuration', `${zooming_duration}s`);
	});
	scene.addAction(Game.toDelay(delay_interval));
	scene.addInstantAction(() => {
		foreground.setStyle('transform', 'translate3d(50px, 50px, 30px)');
		background.setStyle('transform', 'translate3d(50px, 50px, 30px)');
	});
	scene.addAction(Game.toDelay(1));
	scene.addAction(foreground.toWaitForClick());
	scene.addInstantAction(() => {
		sunset.setStyle('backgroundImage', 'url(resource/scene-2/out-1.png)');
		sunset.setStyle('transitionDuration', `1s`);
		foreground.setStyle('opacity', `0`);
		background.setStyle('opacity', `0`);
	});
	scene.addAction(Game.toDelay(1));
	scene.addInstantAction(() => {
		foreground.setStyle('transitionDuration', `0s`);
		background.setStyle('transitionDuration', `0s`);
		foreground.setStyle('visibility', `hidden`);
		background.setStyle('visibility', `hidden`);
	});
	scene.addAction(sunset.toWaitForClick());
	scene.addAction(sunset.toStyle('backgroundImage', 'url(resource/scene-2/out-2.png)'));
	scene.addAction(Game.toDelay(1));
	scene.addAction(sunset.toWaitForClick());
	
	const cell = new Cell(scene, [width - Cell.dimension[0], height, 0]);
	cell.setStyle('visibility', 'hidden');
	const chat = cell.createScreen(
		Cell.Chat,
		'chat',
		'url(resource/cell/screen/chat.png)',
		'聊天'
	);
	scene.addInstantAction(() => {
		cell.showScreen('chat');
		cell.setStyle('visibility', 'visible');
		cell.setStyle('transform', `translate3d(${
			[width - Cell.dimension[0], height - Cell.dimension[1], 0]
				.map(_ => _ + 'px')
				.join(', ')
		})`);
	});
	for(const dialogue of dialogues) {
		scene.addAction(dialogue[0] ? cell.toWaitForClick() : Game.toDelay(1));
		scene.addInstantAction(() => chat.addDialogue(...dialogue));
	}
	scene.addAction(cell.toWaitForClick());

	// End
	scene.addAction(cb => {
		game.focusOn('Scene 3');
		game.updateViewport();
		game.activate('Scene 3');
		cb();
	});
}
