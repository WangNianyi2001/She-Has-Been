{
	'use strict';

	class Rootlet {
		constructor(root) { this.root = root; }
		setStyle(key, val) {
			this.root.style[key] = val;
			return this;
		}
		setDimension(dimension) {
			this.setStyle('width', dimension[0] + 'px');
			this.setStyle('height', dimension[1] + 'px');
		}
		setClass(classname, toggle) { this.root.classList[toggle ? 'add' : 'remove'](classname); }
		triggerOnce(event_name, fn) { this.root.addEventListener(event_name, fn, { once: true }); }
	};

	class Game extends Rootlet {
		constructor(root) {
			super(root);
			this.camera = [0, 0];
			this.scale = 1;
			this.storyboards = new Map();
			this.active_storyboard = null;
		}
		updateViewport() {
			this.setStyle('transform', [
				`scale(${this.scale})`,
				`translate(${[0, 1].map(
					i => -this.camera[i] + 'px'
				).join(', ')})`,
			].join(' '));
		}
		createStoryboard(name, dimension, position) {
			const storyboard = new Storyboard(document.createElement('div'), dimension, position);
			this.root.appendChild(storyboard.root);
			this.storyboards.set(name, storyboard);
			return storyboard;
		}	
		focusOn(name) {
			if(!this.storyboards.has(name))
				throw new ReferenceError('No such storyboard');
			const storyboard = this.storyboards.get(name);
			this.camera[0] = storyboard.position[0] +
				storyboard.dimension[0] / 2;
			this.camera[1] = storyboard.position[1] + 
				storyboard.dimension[1] / 2;
			this.updateViewport();
		}
		activate(name) {
			if(!this.storyboards.has(name))
				throw new ReferenceError('No such storyboard');
			if(this.active_storyboard)
				this.active_storyboard.setClass('active', false);
			const storyboard = this.storyboards.get(name);
			storyboard.setClass('active', true);
			this.active_storyboard = storyboard;
			storyboard.deploy();
		}
	};

	class Storyboard extends Rootlet {
		constructor(root, dimension, position) {
			super(root);
			this.setClass('storyboard', true);
			this.dimension = dimension;
			this.setDimension(dimension);
			this.position = position;
			this.setStyle('transform', `translate(${position.map(v => v + 'px').join(', ')})`);
			this.actions = [];
		}
		createComponent(dimension, position) {
			const component = new Component(this, document.createElement('div'), dimension, position);
			this.root.appendChild(component.root);
			component.setClass('component', true);
			return component;
		}
		deploy() {
			const cb = () => this.actions.length && this.actions.shift()(cb);
			cb();
		}
	};

	class Component extends Rootlet {
		constructor(storyboard, root, dimension, position) {
			super(root);
			this.storyboard = storyboard;
			this.dimension = dimension;
			this.setDimension(dimension);
			this.position = position;
			this.updatePosition();
		}
		updatePosition() { this.setStyle('transform', `translate3d(${
			this.position.map(v => v + 'px').join(', ')
		})`); }
		toStyle(key, val) { return cb => {
			this.setStyle(key, val);
			cb();
		}; }
		toWaitForClick() { return cb => {
			this.setStyle('cursor', 'pointer');
			this.setStyle('pointer-events', 'all');
			this.triggerOnce('click', () => {
				this.setStyle('cursor', 'auto');
				this.setStyle('pointer-events', 'none');
				cb();
			});
		}; }
	}

	Game.Storyboard = Storyboard;
	Game.toDelay = second => cb => setTimeout(cb, second * 1e3);
	window.Game = Game;
}
