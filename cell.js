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
			if(this.current_screen)
				this.current_screen.hide();
			const screen = this.screens.get(name);
			this.current_screen = screen;
			screen.show();
			this.setStyle('backgroundImage', screen.background);
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
			chat.root.innerText = str;
			chat.setClass('dialogue');
			chat.setClass(self ? 'self' : 'oppose');
			this.content.append(chat);
		}
	}

	Cell.Screen = Screen;
	Cell.Moment = Moment;
	Cell.Chat = Chat;
	window.Cell = Cell;
}

