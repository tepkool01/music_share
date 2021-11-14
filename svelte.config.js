/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',
		files: {
			assets: 'static',
			lib: 'src/lib',
			routes: 'src/routes'
		},
		floc: false,
	}
};

export default config;
