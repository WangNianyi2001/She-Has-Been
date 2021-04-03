{
	'use strict';

	const Rootlet = Game.Rootlet;
	const makeDiv = () => document.createElement('div');
	const makeRootlet = () => new Rootlet(makeDiv());

	class Cell extends Game.Component {
		constructor(storyboard, dimension, position) {
			super(storyboard, makeDiv(), dimension, position);
			storyboard.append(this);
			this.setClass('cell');
			this.screens = new Map();
			this.current_screen = null;
			this.current_alert = null;
		}
		createScreen(prototype, name, background, str) {
			const screen = new prototype(this, background);
			this.screens.set(name, screen);
			screen.hide();
			this.append(screen);
			const title = screen.title = makeRootlet();
			title.root.innerText = str;
			title.setClass('title');
			screen.append(title);
			const content = screen.content = makeRootlet();
			content.setClass('content');
			screen.append(content);
			return screen;
		}
		showScreen(name) {
			if(!this.screens.has(name))
				return;
			const screen = this.screens.get(name);
			if(this.current_screen === screen)
				return;
			if(this.current_screen)
				this.current_screen.hide();
			this.removeAlert();
			this.current_screen = screen;
			screen.show();
			this.setStyle('backgroundImage', screen.background);
		}
		alert(str) {
			if(this.current_alert)
				this.removeAlert();
			const alert = makeRootlet();
			this.current_alert = alert;
			alert.root.innerText = str;
			alert.setClass('alert');
			this.current_screen.append(alert);
		}
		removeAlert() {
			if(!this.current_alert)
				return;
			const root = this.current_alert.root;
			root.parentNode.removeChild(root);
			this.current_alert = null;
		}
	}
	class Screen extends Rootlet {
		constructor(cell, background) {
			super(makeDiv());
			this.cell = cell;
			this.background = background;
			this.setClass('screen');
		}
		show() { this.root.classList.add('visible'); }
		hide() { this.root.classList.remove('visible'); }
	}

	class Moment extends Screen {
		constructor(cell, background) {
			super(cell, background);
			this.setClass('moment');
		}
		addMoment(avatar_bg, str) {
			const entry = makeRootlet();
			this.content.append(entry);
			entry.setClass('entry');
			const avatar = makeRootlet();
			entry.append(avatar);
			avatar.setClass('avatar');
			avatar.setStyle('backgroundImage', avatar_bg);
			const text = makeRootlet();
			text.setClass('text');
			entry.append(text);
			text.root.innerText = str;
		}
	}

	class Chat extends Screen {
		constructor(cell, background) {
			super(cell, background);
			this.setClass('chat');
		}
		addDialogue(self, str) {
			const chat = makeRootlet();
			chat.root.innerHTML = [
				'<div class="before"></div>',
				`<div class="body">${str}</div>`,
				'<div class="after"></div>',
			].join('');
			chat.setClass('dialogue');
			chat.setClass(self ? 'self' : 'opposite');
			this.content.append(chat);
		}
	}

	Cell.Screen = Screen;
	Cell.Moment = Moment;
	Cell.Chat = Chat;
	window.Cell = Cell;
}

