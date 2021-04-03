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

	const cell = new Cell(scene, [746 / 3, 1380 / 3], [960 - 746 / 3, 540 - 1380 / 3, 0], [32, 25, 42, 22]);
	cell.setStyle('visibility', 'hidden');
	const moment = cell.createScreen('moment', 'url(resource/cell/moment.png)').root;
		const title = makeDiv();
		const content = makeDiv();
	const post = cell.createScreen('post', 'url(resource/cell/post.png)').root;
		const input = makeDiv();
	const chat = cell.createScreen('chat', 'url(resource/cell/chat.png)').root;

	function initMoment() {
		{
			moment.style.flex = '1';
			moment.style.display = 'flex';
			moment.style.flexDirection = 'column';
			moment.style.position = 'relative';
			moment.style.overflow = 'hidden';
		}
		moment.appendChild(title);
		{
			title.style.height = '35px';
			title.style.lineHeight = '27px';
			title.style.textAlign = 'center';
		}
		title.innerText = '朋友圈';
		moment.appendChild(content);
		{
			content.style.flex = '1 0 0px';
			content.style.display = 'flex';
			content.style.maxHeight = '351px';
			content.style.overflowY = 'scroll';
			content.style.flexDirection = 'column-reverse';
			content.style.justifyContent = 'flex-end';
		}
	}
	function addMoment(avatar_bg, str) {
		const _moment = makeDiv();
		content.appendChild(_moment);
		{
			_moment.style.borderBottom = '1px solid black';
			_moment.style.paddingBottom = '10px';
			_moment.style.height = 'max-content';
			_moment.style.display = 'flex';
			_moment.style.alignItems = 'top';
			_moment.style.margin = '10px 10px 0';
		}
		const avatar = makeDiv();
		_moment.appendChild(avatar);
		{
			avatar.style.width = avatar.style.minWidth = avatar.style.height = '40px';
			avatar.style.backgroundImage = avatar_bg;
			avatar.style.backgroundSize = 'contain';
			avatar.style.marginRight = '10px';
		}
		const text = makeDiv();
		_moment.appendChild(text);
		text.style.height = 'max-content';
		text.style.wordBreak = 'break-all';
		text.innerText = str;
	}
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
			moment.removeChild(current_cell_alert);
	}
	function initPost() {
		post.style.flex = '1';
		post.appendChild(input);
		{
			input.style.width = '100%';
			input.style.height = '100%';
			input.style.boxSizing = 'border-box';
			input.style.wordBreak = 'break-all';
			input.style.padding = '42px 25px 42px 22px';
		}
	}

	// Action sequence
	scene.addAction(cell_hotarea.toWaitForClick());
	scene.addAction(cb => {
		initMoment();
		cell.showScreen('moment');
		cell.setStyle('visibility', 'visible');
		moments.forEach(_ => addMoment(..._));
		cb();
	});
	scene.addAction(cell.toWaitForClick());
	scene.addAction(cb => {
		initPost();
		cell.showScreen('post');
		cb();
	});
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
	scene.addAction(cb => {
		cell.showScreen('moment');
		addMoment('url(resource/cell/avatar/1.png)', post_text);
		cb();
	});
	scene.addAction(cb => {
		cellAlert(alert_text);
		current_cell_alert.style.cursor = 'pointer';
		current_cell_alert.addEventListener('click', () => {
			removeAlert();
			cell.showScreen('chat');
			cb();
		}, { once: true });
	});

	// Instant actions
	game.focusOn('Scene 1');
	game.updateViewport();
	game.activate('Scene 1');
}
