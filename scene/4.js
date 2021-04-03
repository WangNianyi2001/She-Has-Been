{
	'use strict';

	// Configurations
	const width = 960, height = 540;
	const dialogues = [
		// true - self, false - opposite
		[false, 'Hello, cnm!'],
		[true, 'Cnm, too!'],
		[false, 'You say your mother ne? I\'m your father.'],
		[true, 'How could it be? There\'s no way for a grandson to be a father.'],
		[false, 'I cnm.'],
	];

	// Declaration
	const scene = game.createStoryboard('Scene 4', [width, height], [1839, 0, 0]);
	scene.setStyle('perspective', '100px');

	// Resources
	const background = scene.createComponent([width, height], [0, 0, 0]);
	background.setStyle('backgroundImage', 'url("resource/scene-4/background.jpg")');

	// Action sequence
	scene.addAction(background.toWaitForClick());
}
