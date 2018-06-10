
    "build-css": "node-sass-chokidar src/ -o src/",
    "watch-css": "npm run build-css && node-sass-chokidar src/ -o src/ --watch --recursive",
    "start": "node scripts/start.js",
    "build": "node scripts/build.js",

    "test": "node scripts/test.js --env=jsdom"