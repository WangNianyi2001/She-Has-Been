{
	'use strict';

	const Loader = {
		preloadImage(src, success, fail = null) {
			const image = document.createElement('img');
			image.addEventListener('load', success);
			image.addEventListener('error', fail);
			image.src = src;
		},
		preloadImages(srcs, progress, success, fail = null) {
			if(!srcs.length)
				return success();
			const length = srcs.length;
			let i = 0;
			const callback = () => {
				progress(++i / length);
				if(i === length)
					success();
			}
			for(const src of srcs)
				Loader.preloadImage(src, callback, fail);
		},
		loadScript(href, success, fail = null) {
			const script = document.createElement('script');
			script.addEventListener('load', success);
			script.addEventListener('error', fail);
			document.body.appendChild(script);
			script.src = href;
		},
		loadScripts(hrefs, success, fail = null) {
			if(hrefs.length)
				Loader.loadScript(hrefs.shift(), Loader.loadScripts.bind(
					null, hrefs, success, fail
				), fail);
			else
				success();
		},
	};

	window.Loader = Loader;
}
