{
	'use strict';

	// Declaration
	const scene = game.createStoryboard('Scene 1', [960, 540], [0, 0, 0]);
	scene.setStyle('perspective', '100px');

	// Resources
	const foreground = scene.createComponent([960, 540], [0, 0, 0]);
	foreground.setStyle('backgroundImage', 'url(resource/scene-1/foreground.png)');
	const background = scene.createComponent([960, 540], [0, 0, -10]);
	background.setStyle('backgroundImage', 'url(resource/scene-1/background.png)');
	const cell_hotarea = scene.createComponent([50, 50], [470, 235, 0]);

	const cell = new Cell(scene, [746 / 3, 1380 / 3], [960 - 746 / 3, 540 - 1380 / 3, 0], [32, 25, 42, 22]);
	cell.setStyle('visibility', 'hidden');
	const moment = cell.createScreen('moment', 'url(resource/cell/moment.png)').root;
		const title = makeDiv();
		const content = makeDiv();
	const post = cell.createScreen('post', 'url(resource/cell/post.png)').root;
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
			content.style.flex = '1';
			content.style.overflowY = 'scroll';
			content.style.display = 'flex';
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
			_moment.style.height = '50px';
			_moment.style.display = 'flex';
			_moment.style.overflow = 'hidden';
			_moment.style.alignItems = 'top';
			_moment.style.margin = '10px 10px';
			_moment.style.boxSizing = 'border-box';
		}
		const avatar = makeDiv();
		_moment.appendChild(avatar);
		{
			avatar.style.width = avatar.style.height = '40px';
			avatar.style.backgroundImage = avatar_bg;
			avatar.style.backgroundSize = 'contain';
			avatar.style.marginRight = '10px';
		}
		const text = makeDiv();
		_moment.appendChild(text);
		text.innerText = str;
	}
	const current_cell_alert = null;
	function cellAlert(str) {
		const cell_alert = makeDiv();
		console.log(cell);
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
	}
	function removeAlert() {
		if(current_cell_alert)
			moment.removeChild(current_cell_alert);
	}

	// Action sequence
	scene.addAction(cell_hotarea.toWaitForClick());
	scene.addAction(cb => {
		initMoment();
		cell.showScreen('moment');
		cell.setStyle('visibility', 'visible');
		[
			['url(resource/cell/avatar/wlt.png)', '我是 HHL'],
			['url(resource/cell/avatar/sparrow.png)', '楼下是沙壁'],
			['url(resource/cell/avatar/shasha.png)', '真的吗？我不信'],
		].forEach(_ => addMoment(..._));
		cb();
	});
	scene.addAction(cb => {
		title.style.cursor = 'pointer';
		title.addEventListener('click', () => {
			title.style.cursor = 'auto';
			cell.showScreen('post');
			cellAlert('something');
			cb();
		}, { once: true });
	});

	// Instant actions
	game.focusOn('Scene 1');
	game.updateViewport();
	game.activate('Scene 1');
}
