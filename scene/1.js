{
	'use strict';

	// Configurations
	const width = 960, height = 540;
	const message_delay = 1;
	const moments = [
		['url(resource/cell/avatar/wlt.png)', '连肝三十二个小时'],
		['url(resource/cell/avatar/sparrow.png)', 'happy birthday to you.'],
		['url(resource/cell/avatar/shasha.png)', 'win32 写完了嘛？'],
		['url(resource/cell/avatar/ctl.png)', '今天天气真好'],
		['url(resource/cell/avatar/lbf.png)', '清明时节雨纷纷'],
		['url(resource/cell/avatar/nobody.png)', '游创肝完了嘛？'],
	];
	const post_text = '为什么大学生活如此艰难[哭]';
	const dialogues = [
		// true - self, false - opposite
		[false, '最近又遇到啥烦心事了'],
		[true, '哈哈，最近只是有点忙'],
		[false, '不像只是忙吧'],
		[true, '的确没想到大学生活这么……'],
		[false, '又遇到什么差劲的人了么'],
		[true, '是啊，到了大学大家就开始复杂起来了'],
		[false, '最近决定要继续读书了，可能我们很快会再见面'],
		[true, '也在北京？'],
		[false, '也在北京。'],
	];

	// Declaration
	const scene = game.createStoryboard('Scene 1', [width, height], [0, 0, 0]);
	scene.setStyle('perspective', '100px');

	// Resources
	const background = scene.createComponent([width, height], [0, 0, 0]);
	background.setStyle('backgroundImage', 'url(resource/scene-1/background.png)');
	background.setStyle('transitionDuration', '.5s');
	const foreground = scene.createComponent([width, height], [0, 0, 3]);
	foreground.setStyle('backgroundImage', 'url(resource/scene-1/foreground.png)');
	foreground.setStyle('transitionDuration', '.5s');

	function wiggle() {
		foreground.setStyle('transform', `translate3d(${
			[10, 5].map(v => v * (Math.random() - .5) + 'px').join(', ')
		}, 3px)`);
		background.setStyle('transform', `translate3d(${
			[5, 2].map(v => v * (Math.random() - .5) + 'px').join(', ')
		}, 0px)`);
		setTimeout(wiggle, Math.random() * 500);
	}
	wiggle();

	// Action sequence
	const cell_hotarea = scene.createComponent([50, 50], [470, 235, 0]);
	scene.addAction(cell_hotarea.toWaitForClick());

	const cell = new Cell(scene, [width - Cell.dimension[0], height, 0]);
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
