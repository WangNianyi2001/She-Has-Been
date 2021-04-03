{
	'use strict';

	// Declaration
	const scene = game.createStoryboard('Scene 3', [960, 540], [972, 0, 0]);
	scene.setStyle('perspective', '100px');

	// Resources
	const foreground = scene.createComponent([960, 1080/2], [20, 30, 10]);
	foreground.setStyle('backgroundImage', 'url("resource/scene-3/character.png")');
	const background = scene.createComponent([960, 1080/2], [0, 0, 0]);
	background.setStyle('backgroundImage', 'url("resource/scene-3/desktop.png")');
	background.setStyle('backgroundSize', 'cover');
	background.setStyle('backgroundPosition', 'center center');
	// const mail = scene.createComponent([67,59],[0,0,0]);
	// mail.setStyle('backgroundImage','url(resource/mail.jpg)');

	function move(component, x, y) {
	    component.setStyle('transform', `translate3d(${x}px, ${y}px, 0px)`);
	}
	
	const R = 1500;
	function createMail() { 
		const angle = (1 + Math.random()) * Math.PI;
		const mail = scene.createComponent([50, 50], [Math.cos(angle) * R, Math.sin(angle) * R, 0]);
		mail.setStyle('backgroundColor', `rgb(${[0,0,0].map(_ => Math.random() * 256).join(', ')})`);
		mail.setStyle('transitionDuration', '1s');
		return mail;
	}
	const progress = scene.createComponent([350, 50], [0, 0, 0]);
	// progress.setStyle('backgroundPosition','center 0');
	progress.root.setAttribute('style', `
		left: 10px;
		top: 10px;
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
	const mails = [0, 0, 0, 0, 0].map(createMail);
	for(let i = 0; i < 5; ++i) {
		const mail = mails[i];
		scene.addAction(cb => {
			move(mail, 480, 270);
			cb();
		});
		scene.addAction(mail.toWaitForClick());
		scene.addAction(cb => {
			line = line + 1;
			cb();
		});
		scene.addAction(cb => {
			bar.style.flex = line / 5;
			cb();
		});
		scene.addAction(cb => {
			move(mail, 280, 200);
			cb();
		});
		
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
}
