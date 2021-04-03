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
	cell.setStyle('pointer-events', 'all');
	cell.setStyle('display', 'flex');
	cell.setStyle('flex-direction', 'column');
	cell.setStyle('font-family', 'sans-serif');
	cell.setStyle('justify-content', 'stretch');
	const screen_area = makeDiv();
	cell.root.appendChild(screen_area);
	screen_area.style.margin = '32px 25px 42px 22px';
	screen_area.style.flex = '1';
	screen_area.style.display = 'flex';
	screen_area.style.flexDirection = 'column';
	const title = makeDiv();
	screen_area.appendChild(title);
	title.style.height = '35px';
	title.style.lineHeight = '27px';
	title.style.textAlign = 'center';
	title.innerText = '朋友圈';
	const content = makeDiv();
	screen_area.appendChild(content);
	screen_area.style.position = 'relative';
	screen_area.style.overflow = 'hidden';
	content.style.flex = '1';
	content.style.overflowY = 'scroll';
	function addMoment(avatar_bg, str) {
		const moment = makeDiv();
		content.appendChild(moment);
		moment.style.borderBottom = '1px solid black';
		moment.style.paddingBottom = '10px';
		moment.style.height = '50px';
		moment.style.display = 'flex';
		moment.style.overflow = 'hidden';
		moment.style.alignItems = 'top';
		moment.style.margin = '10px 10px';
		moment.style.boxSizing = 'border-box';
		const avatar = makeDiv();
		moment.appendChild(avatar);
		avatar.style.width = avatar.style.height = '40px';
		avatar.style.backgroundImage = avatar_bg;
		avatar.style.backgroundSize = 'contain';
		avatar.style.marginRight = '10px';
		const text = makeDiv();
		moment.appendChild(text);
		text.innerText = str;
	}
	addMoment('url(resource/cell/avatar/wlt.png)', '我是 HHL');
	addMoment('url(resource/cell/avatar/sparrow.png)', '楼上是沙壁');
	addMoment('url(resource/cell/avatar/shasha.png)', '真的吗？我不信');
	cell.setStyle('visibility', 'hidden');
	function showCell() {
		cell.setStyle('visibility', 'visible');
	}
	const current_cell_alert = null;
	function cellAlert(str) {
		if(current_cell_alert)
			screen_area.removeChild(current_cell_alert);
		const cell_alert = makeDiv();
		screen_area.appendChild(cell_alert);
		cell_alert.style.position = 'absolute';
		cell_alert.style.top = cell_alert.style.left = '0';
		cell_alert.style.height = cell_alert.style.lineHeight = '60px';
		cell_alert.style.width = '100%';
		cell_alert.style.padding = '0px 16px';
		cell_alert.style.boxShadow = '0px 4px 5px rgba(0,0,0,.5)';
		cell_alert.style.boxSizing = 'border-box';
		cell_alert.style.backgroundColor = 'lightgray';
		cell_alert.innerText = str;
	}

	// Action sequence
	scene.addAction(cell_hotarea.toWaitForClick());
	scene.addAction(cb => {
		cell.setStyle('backgroundImage', 'url(resource/cell/moment.png)');
		showCell();
		cb();
	});
	scene.addAction(Game.toDelay(1));
	scene.addAction(cb => {
		cellAlert('alert test');
		cb();
	});

	// Instant actions
	game.focusOn('Scene 1');
	game.updateViewport();
	game.activate('Scene 1');
}
