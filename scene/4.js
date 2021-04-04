{
	'use strict';

	// Configurations
	const width = 960, height = 540;
	const dialogues = [
		// true - self, false - opposite
		[true, '还带装备来的啊啊'],
		[false, '帮你解决解决问题 处理一下烂人人'],
        [true, '呦呦呦，几天没见，这么浪了了'],
		[false, '呵~~'],
		[true, '装备借我看看看'],
	];

	// Declaration
	const scene = game.createStoryboard('Scene 4', [width, height], [2811, 0, 0]);
	scene.setStyle('perspective', '100px');

	// Resources
	const background = scene.createComponent([width, height], [0, 0, 0]);
	background.setStyle('backgroundImage', 'url("resource/scene-4/background.jpg")');
	background.root.innerHTML += `
		<div style="
			position: absolute;
			display: flex;
			flex-direction: row-reverse;
			left: 0px;
			top: 150px;
			width: 250px;
			height: fit-content;
		">
			<div class="dialogue self" style="
				visibility: hidden;
				transform-origin: right center;
				max-width: 200px;
			">
				<div class="before"></div>
				<div class="body"></div>
				<div class="after"></div>
			</div>
		</div>
		<div style="
			position: absolute;
			display: flex;
			flex-direction: row;
			left: 750px;
			top: 150px;
			width: 200px;
			height: fit-content;
		">
			<div class="dialogue opposite" style="
				visibility: hidden;
				transform-origin: right center;
				max-width: 200px;
			">
				<div class="before"></div>
				<div class="body"></div>
				<div class="after"></div>
			</div>
		</div>
	`;
	const self = background.root.querySelector('.self');
	const opposite = background.root.querySelector('.opposite');

	// Action sequence
	function showDialogue(cb, is_self, str) {
		const component = is_self ? self : opposite;
		component.style.visibility = 'visible';
		let i = 0;
		const t = setInterval(() => {
			if(++i == str.length) {
				clearInterval(t);
				return cb();
			}
			component.querySelector('.body').innerText = str.slice(0, i);
		}, 50);
	}
	for(const dialogue of dialogues) {
		scene.addAction(background.toWaitForClick());
		scene.addAction(cb => showDialogue(cb, ...dialogue));
	}
	scene.addAction(background.toWaitForClick());
	scene.addInstantAction(() => {
		self.style.visibility = 'hidden';
		opposite.style.visibility = 'hidden';
	});
}
