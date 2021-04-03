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
	cell_hotarea.setStyle('backgroundColor', 'rgba(255, 0, 0, .5)');

	const cell = scene.createComponent([746 / 3, 1380 / 3], [960 - 746 / 3, 540 - 1380 / 3, 0]);
	cell.setStyle('backgroundImage', 'url(resource/cell/moment.png)');
	cell.setStyle('boxSizing', 'border-box');
	cell.setStyle('padding', '32px 25px 42px 22px');
	cell.setStyle('pointer-events', 'all');
	cell.setStyle('display', 'flex');
	cell.setStyle('flex-direction', 'column');
	cell.setStyle('font-family', 'sans-serif');
	const title = document.createElement('div');
	cell.root.appendChild(title);
	title.style.height = title.style.lineHeight = '30px';
	title.style.textAlign = 'center';
	title.innerText = '朋友圈';
	const content = document.createElement('div');
	cell.root.appendChild(content);
	content.style.flex = '1';
	// content.style.display = 'flex';
	// content.style.flexDirection = 'column';
	content.style.overflowY = 'scroll';
	function addMoment(avatar_bg, str) {
		const moment = document.createElement('div');
		content.appendChild(moment);
		moment.style.borderBottom = '1px solid black';
		moment.style.paddingBottom = '10px';
		moment.style.height = '50px';
		moment.style.display = 'flex';
		moment.style.alignItems = 'top';
		moment.style.margin = '10px 10px';
		moment.style.boxSizing = 'border-box';
		const avatar = document.createElement('div');
		moment.appendChild(avatar);
		avatar.style.width = avatar.style.height = '40px';
		avatar.style.backgroundImage = avatar_bg;
		avatar.style.backgroundSize = 'contain';
		avatar.style.marginRight = '10px';
		const text = document.createElement('div');
		moment.appendChild(text);
		text.innerText = str;
	}
	addMoment('url(resource/cell/avatar/wlt.png)', '我是 HHL');
	addMoment('url(resource/cell/avatar/sparrow.png)', '楼上是沙壁');
	addMoment('url(resource/cell/avatar/shasha.png)', '真的吗？我不信');
	// cell.setStyle('display', 'none');
	function showCell() {
		cell.setStyle('display', 'block');
	}

	// Action sequence
	scene.addAction(cell_hotarea.toWaitForClick());
	scene.addAction(cb => {
		// showCell();
		cell.setStyle('backgroundImage', 'url(resource/cell/chat.png)');
		cb();
	});

	// Instant actions
	game.focusOn('Scene 1');
	game.updateViewport();
	game.activate('Scene 1');
}
