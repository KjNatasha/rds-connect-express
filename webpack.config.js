module.exports = {
	entry:  __dirname + "/app/App.js",
	output: {
		path: __dirname + "/public",
		filename: "bundle.js"
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel',
			query:{
				cacheDirectory: true,
				presets: ['react','es2015']
			}
		}]
	}
};