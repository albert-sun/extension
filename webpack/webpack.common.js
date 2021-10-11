const path = require("path");
const SveltePreprocess = require("svelte-preprocess");

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

// Source files for outputting individual files
const individualFilenames = {
    "public/resources/background_main": "/source/background/main.ts",
    "public/resources/background_bestbuy": "/source/background/bestbuy.ts",
    "public/resources/content_bestbuy": "/source/content/bestbuy.ts",
    "public/resources/extension": "/source/extension/extension.ts",
}; // TODO make modular or something, skip other files

const config = {
    entry: individualFilenames,
    output: {
        path: path.join(__dirname, ".."),
        filename: "[name].js",
    },
    optimization: {
        splitChunks: {
            name: "public/resources/vendor",
            chunks: "initial",
        },
    },
    // Don't use vendor file because unsure
    module: {
        rules: [{
            test: /\.svelte$/,
            use: {
                loader: 'svelte-loader',
                options: {
                    compilerOptions: {
                        dev: !prod
                    },
                    emitCss: prod,
                    hotReload: !prod,
                    preprocess: SveltePreprocess({
                        scss: true,
                    }),
                    onwarn(warning, onwarn) {
                        if (!/A11y:/.test(warning.message)) {
                            onwarn(warning);
                        }
                    },
                },
            },
        }, {
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }, {
            // required to prevent errors from Svelte on Webpack 5+
            test: /node_modules\/svelte\/.*\.mjs$/,
            resolve: {
                fullySpecified: false
            }
        }],
    },
    resolve: {
        modules: [path.join(__dirname, '../node_modules')],
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: { 
            "svelte": path.resolve('node_modules', 'svelte'),
            "svelte/internal": require.resolve("svelte/internal"),
            "svelte/store": require.resolve("svelte/store"),
        }
    },
    experiments: {
        topLevelAwait: true,
    },
    mode,
};

module.exports = [
    config
];
