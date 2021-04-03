{
	'use strict';

	// Declaration
	const scene = game.createStoryboard('Scene 3', [960, 540], [1839, 0, 0]);
	scene.setStyle('perspective', '100px');

	// Resources
	const background = scene.createComponent([960, 1080/2], [0, 0, 0]);
	background.setStyle('backgroundImage', 'url("resource/scene-3/desktop.png")');
	background.setStyle('backgroundSize', 'cover');
	background.setStyle('backgroundPosition', 'center center');
	const foreground = scene.createComponent([960, 1080/2], [20, 30, 10]);
	foreground.setStyle('backgroundImage', 'url("resource/scene-3/character.png")');
	foreground.setStyle('pointerEvents', 'none');

	function move(component, x, y, angle = 0) {
	    component.setStyle('transform', `translate3d(${x}px, ${y}px, 0px) rotate(${angle}rad)`);
	}
	
	
	const R = 1500;
	function createMail(url) { 
		const angle = (1 + Math.random()) * Math.PI;
		const mail = scene.createComponent([200, 200], [Math.cos(angle) * R, Math.sin(angle) * R, 0]);
		mail.setStyle('backgroundImage', `url(${url})`);
		mail.setStyle('transitionDuration', '1s');
		mail.setStyle('transformOrigin', 'center center');
		return mail;
	}
	const progress = scene.createComponent([350, 50], [0, 0, 0]);
	progress.root.setAttribute('style', `
		left: 600px;
		top: 500px;
		display: flex;
		padding: 2px;
		width: 350px;
		height: 20px;
		overflow: hidden;
		border-radius: 5px;
		box-sizing: border-box;
		border: 2px solid black;
		background-color: white;
		pointer-events: all;
	`);
	progress.root.innerHTML = `<div id="progress-bar" style="
		flex: 0;
		height: 100%;
		background-color: gray;
		border-radius: 5px;
	"></div><div></div>`;
	const bar = document.getElementById('progress-bar');

	// Action sequence
	// scene.addAction(mail.toWaitForClick());
	let line = 0;
	scene.addAction(Game.toDelay(1));
	const mails = Array(3).fill(0).map((_, i) => createMail(`resource/scene-3/files/${i}.png`));
	for(const mail of mails) {
		scene.addInstantAction(() => move(mail, 480, 140));
		scene.addAction(mail.toWaitForClick());
		scene.addInstantAction(() => line = ++line);
		scene.addInstantAction(() => bar.style.flex = line / mails.length);
		scene.addInstantAction(() => move(mail,
			750 + (Math.random() - .5) * 50,
			100 + (Math.random() - .5) * 50,
			Math.random() - .5
		));
	}
	scene.addAction(cb => {
		cb();
		let i = 0;
		const t = setInterval(() => {
			if(i >= 6) {
				progress.setStyle("visibility", "hidden");
				clearInterval(t);
			}
			progress.setStyle("opacity", ['.5', '1'][i & 1]);
			++i;
		}, 500);
	});
	const cell = new Cell(scene, [746 / 3, 1380 / 3], [960 - 746 / 3, 540 - 1380 / 3, 0], [32, 25, 42, 22]);
	cell.setStyle('visibility', 'hidden');
	const chat = cell.createScreen(
		Cell.Screen,
		'chat',
		'url(resource/cell/screen/chat.png)',
		'聊天'
	);
	const hot_area = scene.createComponent([70, 100], [20, 180, 0]);
	scene.addAction(hot_area.toWaitForClick());
	scene.addInstantAction(() => {
		cell.showScreen('chat');
		cell.setStyle('visibility', 'visible');
	});
}
