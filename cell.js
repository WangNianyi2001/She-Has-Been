{
	'use strict';

	const makeDiv = () => document.createElement('div');

	class Cell extends Game.Component {
		constructor(storyboard, dimension, position, margins) {
			super(storyboard, makeDiv(), dimension, position);
			storyboard.root.appendChild(this.root);
			this.setClass('component', true);
			this.setStyle('boxSizing', 'border-box');
			this.setStyle('display', 'flex');
			this.setStyle('flex-direction', 'column');
			this.setStyle('font-family', 'sans-serif');
			this.setStyle('justify-content', 'stretch');
			this.margins = margins;
			this.screens = new Map();
			this.current_screen = null;
		}
		createScreen(name, background) {
			const screen = new Screen(this, background);
			this.screens.set(name, screen);
			screen.hide();
			this.root.appendChild(screen.root);
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
		show() { this.root.style.display = 'flex'; }
		hide() { this.root.style.display = 'none'; }
	}

	window.Cell = Cell;
}

