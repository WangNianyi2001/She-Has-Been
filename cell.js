{
	'use strict';

	const makeDiv = () => document.createElement('div');

	class Cell extends Game.Component {
		constructor(storyboard, dimension, position, margins) {
			super(storyboard, makeDiv(), dimension, position);
			storyboard.root.appendChild(this.root);
			this.setClass('component', true);
			this.setStyle('boxSizing', 'border-box');
			this.setStyle('font-family', 'sans-serif');
			this.margins = margins;
			this.screens = new Map();
			this.current_screen = null;
		}
		createScreen(name, background) {
			const screen = new Screen(this, background);
			screen.root.style.position = 'absolute';
			screen.root.style.left = '0';
			screen.root.style.top = '0';
			this.screens.set(name, screen);
			screen.hide();
			this.root.appendChild(screen.root);
			return screen;
		}
		createScreenWithTitle(name, background, str) {
			const screen = this.createScreen(name, background);
			screen.root.style.flex = '1';
			screen.root.style.display = 'flex';
			screen.root.style.flexDirection = 'column';
			screen.root.style.position = 'absolute';
			screen.root.style.overflow = 'hidden';
			const title = screen.title = makeDiv();
			title.innerText = str;
			title.style.height = '35px';
			title.style.lineHeight = '27px';
			title.style.textAlign = 'center';
			screen.root.appendChild(title);
			const content = screen.content = makeDiv();
			content.style.flex = '1 1';
			content.style.display = 'flex';
			content.style.maxHeight = '351px';
			content.style.overflowY = 'auto';
			screen.root.appendChild(content);
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
			this.root.style.backgroundImage = screen.background;
		}
	}
	class Screen {
		constructor(cell, background) {
			this.cell = cell;
			this.background = background;
			const root = this.root = makeDiv();
			root.style.position = 'relative';
			root.style.margin = cell.margins.map(_ => _ + 'px').join(' ');
		}
		show() { this.root.style.visibility = 'visible'; }
		hide() { this.root.style.visibility = 'hidden'; }
	}

	window.Cell = Cell;
}

