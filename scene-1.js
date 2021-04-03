{
	'use strict';

	// Configurations
	const width = 960, height = 540;
	const message_delay = 1;
	const moments = [
		['url(resource/cell/avatar/wlt.png)', '我是 HHL'],
		['url(resource/cell/avatar/sparrow.png)', '楼下是沙壁'],
		['url(resource/cell/avatar/shasha.png)', '真的吗？我不信'],
		['url(resource/cell/avatar/ctl.png)', '哟哟哟，这不是摇摆阳吗，几天没见这么拉了'],
		['url(resource/cell/avatar/lbf.png)', '鬼！'],
		['url(resource/cell/avatar/nobody.png)', 'I\'m just a nobody, nobody but you~'],
	];
	const post_text = 'somethingsomethingsomething';
	const dialogues = [
		// true - self, false - opposite
		[false, 'Hello, cnm!'],
		[true, 'Cnm, too!'],
		[false, 'You say your mother ne? I\'m your father.'],
		[true, 'How could it be? There\'s no way for a grandson to be a father.'],
		[false, 'I cnm.'],
	];

	// Declaration
	const scene = game.createStoryboard('Scene 1', [width, height], [0, 0, 0]);
	scene.setStyle('perspective', '100px');

	// Resources
	const background = scene.createComponent([width, height], [0, 0, -10]);
	background.setStyle('backgroundImage', 'url(resource/scene-1/background.png)');
	const foreground = scene.createComponent([width, height], [0, 0, 0]);
	foreground.setStyle('backgroundImage', 'url(resource/scene-1/foreground.png)');

	// Action sequence
	const cell_hotarea = scene.createComponent([50, 50], [470, 235, 0]);
	scene.addAction(cell_hotarea.toWaitForClick());

	const cell = new Cell(scene, [width - Cell.dimension[0], height, 0]);
	cell.setStyle('visibility', 'hidden');
	const moment = cell.createScreen(
		Cell.Moment,
		'moment',
		'url(resource/cell/screen/moment.png)',
		'朋友圈'
	);
	const post = cell.createScreen(
		Cell.Screen,
		'post',
		'url(resource/cell/screen/post.png)',
		''
	);
	const chat = cell.createScreen(
		Cell.Chat,
		'chat',
		'url(resource/cell/screen/chat.png)',
		'聊天'
	);
	scene.addInstantAction(() => {
		cell.showScreen('moment');
		cell.setStyle('visibility', 'visible');
		cell.setStyle('transform', `translate3d(${
			[width - Cell.dimension[0], height - Cell.dimension[1], 0]
				.map(_ => _ + 'px')
				.join(', ')
		})`);
		moments.forEach(_ => moment.addMoment(..._));
	});
	scene.addAction(cell.toWaitForClick());
	scene.addInstantAction(() => {
		post.content.setStyle('wordBreak', 'break-all');
		post.content.setStyle('padding', '10px');
	});
	scene.addInstantAction(() => cell.showScreen('post'));
	scene.addAction(cb => {
		let i = 0;
		function handler() {
			if((i += 3) >= post_text.length) {
				document.removeEventListener('keydown', handler);
				cell.root.style.backgroundImage = 'url(resource/cell/screen/post-green.png)'
				cb();
			}
			post.content.root.innerText = post_text.slice(0, i);
		}
		document.addEventListener('keydown', handler);
	});
	scene.addAction(cell.toWaitForClick());
	scene.addInstantAction(() => cell.showScreen('moment'));
	scene.addInstantAction(() => moment.addMoment('url(resource/cell/avatar/1.png)', post_text));
	scene.addAction(Game.toDelay(message_delay));
	const first_dialogue = dialogues.shift();
	scene.addAction(cb => {
		cell.alert(first_dialogue[1]);
		cell.current_alert.setStyle('cursor', 'pointer');
		cell.current_alert.triggerOnce('click', () => {
			cell.showScreen('chat');
			cb();
		});
	});
	scene.addInstantAction(() => chat.addDialogue(...first_dialogue));
	scene.addAction(cell.toWaitForClick());
	for(const dialogue of dialogues) {
		scene.addAction(dialogue[0] ? cell.toWaitForClick() : Game.toDelay(1));
		scene.addInstantAction(() => chat.addDialogue(...dialogue));
	}
	scene.addAction(cell.toWaitForClick());

	// End
	scene.addAction(cb => {
		game.focusOn('Scene 2');
		game.updateViewport();
		game.activate('Scene 2');
		cb();
	});
}
