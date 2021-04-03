{
	'use strict';

	const moments = [
		['url(resource/cell/avatar/wlt.png)', '我是 HHL'],
		['url(resource/cell/avatar/sparrow.png)', '楼下是沙壁'],
		['url(resource/cell/avatar/shasha.png)', '真的吗？我不信'],
		['url(resource/cell/avatar/ctl.png)', '哟哟哟，这不是摇摆阳吗，几天没见这么拉了'],
		['url(resource/cell/avatar/lbf.png)', '鬼！'],
		['url(resource/cell/avatar/nobody.png)', 'I\m just a nobody, nobody but you~'],
	];
	const post_text = 'somethingsomethingsomething';
	const alert_text = '②：卧槽尼玛';

	// Declaration
	const scene = game.createStoryboard('Scene 1', [960, 540], [0, 0, 0]);
	scene.setStyle('perspective', '100px');

	// Resources
	const background = scene.createComponent([960, 540], [0, 0, -10]);
	background.setStyle('backgroundImage', 'url(resource/scene-1/background.png)');
	const foreground = scene.createComponent([960, 540], [0, 0, 0]);
	foreground.setStyle('backgroundImage', 'url(resource/scene-1/foreground.png)');
	const cell_hotarea = scene.createComponent([50, 50], [470, 235, 0]);

	const cell = new Cell(scene, [746 / 3, 1380 / 3], [960 - 746 / 3, 540 - 1380 / 3, 0]);
	cell.setStyle('visibility', 'hidden');
	const moment = cell.createScreen(
		Cell.Moment,
		'moment',
		'url(resource/cell/moment.png)',
		'朋友圈'
	);
	const post = cell.createScreen(
		Cell.Screen,
		'post',
		'url(resource/cell/post.png)',
		''
	).root;
		const input = makeDiv();
	const chat = cell.createScreen(
		Cell.Screen,
		'chat',
		'url(resource/cell/chat.png)',
		'聊天'
	);

	let current_cell_alert = null;
	function cellAlert(str) {
		const cell_alert = makeDiv();
		current_cell_alert = cell_alert;
		cell.current_screen.root.appendChild(cell_alert);
		cell_alert.style.position = 'absolute';
		cell_alert.style.top = cell_alert.style.left = '0';
		cell_alert.style.height = cell_alert.style.lineHeight = '60px';
		cell_alert.style.width = '100%';
		cell_alert.style.padding = '0px 16px';
		cell_alert.style.boxShadow = '0px 4px 5px rgba(0,0,0,.5)';
		cell_alert.style.boxSizing = 'border-box';
		cell_alert.style.borderRadius = '8px';
		cell_alert.style.backgroundColor = 'lightgray';
		cell_alert.innerText = str;
		return cell_alert;
	}
	function removeAlert() {
		if(current_cell_alert)
			current_cell_alert.parentNode.removeChild(current_cell_alert);
	}
	function initPost() {
		post.style.flex = '1';
		input.style.width = '100%';
		input.style.height = '100%';
		input.style.boxSizing = 'border-box';
		input.style.wordBreak = 'break-all';
		input.style.padding = '10px';
		post.appendChild(input);
	}

	// Action sequence
	scene.addAction(cell_hotarea.toWaitForClick());
	scene.addInstantAction(() => {
		cell.showScreen('moment');
		cell.setStyle('visibility', 'visible');
		moments.forEach(_ => moment.addMoment(..._));
	});
	scene.addAction(cell.toWaitForClick());
	scene.addInstantAction(initPost);
	scene.addInstantAction(() => cell.showScreen('post'));
	scene.addAction(cb => {
		let i = 0;
		function handler() {
			if((i += 3) >= post_text.length) {
				document.removeEventListener('keydown', handler);
				cell.root.style.backgroundImage = 'url(resource/cell/post-green.png)'
				cb();
			}
			input.innerText = post_text.slice(0, i);
		}
		document.addEventListener('keydown', handler);
	});
	scene.addAction(cell.toWaitForClick());
	scene.addInstantAction(() => cell.showScreen('moment'));
	scene.addInstantAction(() => moment.addMoment('url(resource/cell/avatar/1.png)', post_text));
	scene.addAction(cb => {
		cellAlert(alert_text);
		current_cell_alert.style.cursor = 'pointer';
		current_cell_alert.addEventListener('click', () => {
			removeAlert();
			cell.showScreen('chat');
			cb();
		}, { once: true });
	});
	const dialogues = [
		// true - self, false - opposite
		[true, 'Hello, cnm!'],
		[false, 'Cnm, too!'],
		[true, 'You say your mother ne? I\'m your father.'],
		[false, 'How could it be? There\'s no way for a grandson to be a father.'],
		[true, 'I cnm.'],
	];
	function addDialogue(self, str) {
		const dialogue = makeDiv();
		dialogue.innerText = str;
		dialogue.style.textAlign = self ? 'left' : 'right';
		chat.content.append(dialogue);
	}
	scene.addInstantAction(() => chat.content.setStyle('flexDirection', 'column'));
	for(const dialogue of dialogues) {
		scene.addAction(cell.toWaitForClick());
		scene.addInstantAction(() => addDialogue(...dialogue));
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
