{
	'use strict';

	// Configurations
	const width = 960, height = 540;
	const file_count = 8;
	const file_anchor = [280, 140];
	const dialogues = [
		// true - self, false - opposite
		[false, 'Hello, cnm!'],
		[true, 'Cnm, too!'],
		[false, 'You say your mother ne? I\'m your father.'],
		[true, 'How could it be? There\'s no way for a grandson to be a father.'],
		[false, 'I cnm.'],
	];

	// Declaration
	const scene = game.createStoryboard('Scene 3', [width, height], [1839, 0, 0]);
	scene.setStyle('perspective', '100px');

	// Resources
	const background = scene.createComponent([width, height], [0, 0, 0]);
	background.setStyle('backgroundImage', 'url(resource/scene-3/desktop.png)');
	background.setStyle('backgroundSize', 'cover');
	const foreground = scene.createComponent([width, height], [20, 30, 10]);
	foreground.setStyle('backgroundImage', 'url(resource/scene-3/character.png)');
	foreground.setStyle('pointerEvents', 'none');
	foreground.setStyle('zIndex', '100');
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
		border-radius: 2px;
	"></div>`;
	const bar = document.getElementById('progress-bar');

	const move = (component, x, y, angle = 0) =>
	    component.setStyle('transform', `translate3d(${x}px, ${y}px, 0px) rotate(${angle}rad)`);

	const radius = 1500;
	function createMail(url) { 
		const angle = (1 + Math.random()) * Math.PI;
		const mail = scene.createComponent([200, 200], [
			Math.cos(angle) * radius,
			Math.sin(angle) * radius,
			0
		]);
		mail.setStyle('backgroundImage', url);
		mail.setStyle('transitionDuration', '1s');
		mail.setStyle('transformOrigin', 'center center');
		return mail;
	}

	// Action sequence
	scene.addAction(Game.toDelay(1));
	const mails = Array(file_count).fill(0).map((_, i) => createMail(`url(resource/scene-3/files/${i}.png)`));
	let i = 0;
	for(const mail of mails) {
		scene.addInstantAction(() => move(mail, ...file_anchor));
		scene.addAction(mail.toWaitForClick());
		scene.addInstantAction(() => i = ++i);
		scene.addInstantAction(() => bar.style.flex = i / mails.length);
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
			if(i >= 4) {
				progress.setStyle("visibility", "hidden");
				clearInterval(t);
			}
			progress.setStyle("opacity", ['.5', '1'][i & 1]);
			++i;
		}, 500);
	});

	const hot_area = scene.createComponent([70, 100], [20, 180, 0]);	// hot area for the cell phone
	scene.addAction(Game.toDelay(3));
	const cover = Game.makeRootlet();
	cover.setStyle('width', width + 'px');
	cover.setStyle('height', height + 'px');
	cover.setStyle('opacity', '0');
	cover.setStyle('backgroundImage', 'url(resource/scene-3/desktop-2.png)');
	cover.setStyle('backgroundSize', 'cover');
	cover.setStyle('transitionDuration', '1s');
	background.append(cover);
	scene.addAction(cover.toStyle('opacity', '1'));
	scene.addAction(hot_area.toWaitForClick());
	const cell = new Cell(scene, [width - Cell.dimension[0], height, 0]);
	const chat = cell.createScreen(
		Cell.Chat,
		'chat',
		'url(resource/cell/screen/chat.png)',
		'聊天'
	);
	scene.addInstantAction(() => {
		cell.showScreen('chat');
		cell.setStyle('transform', `translate3d(${
			[width - Cell.dimension[0], height - Cell.dimension[1], 0]
				.map(_ => _ + 'px')
				.join(', ')
		})`);
	});
	const first_dialogue = dialogues.shift();
	scene.addInstantAction(() => chat.addDialogue(...first_dialogue));
	for(const dialogue of dialogues) {
		scene.addAction(dialogue[0] ? cell.toWaitForClick() : Game.toDelay(1));
		scene.addInstantAction(() => chat.addDialogue(...dialogue));
	}
	scene.addAction(cell.toWaitForClick());

	// End
	scene.addAction(cb => {
		game.focusOn('Scene 4');
		game.updateViewport();
		game.activate('Scene 4');
		cb();
	});
}
