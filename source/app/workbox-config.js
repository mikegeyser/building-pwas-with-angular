module.exports = {
  "globDirectory": "dist/",
  "globPatterns": [
    "**/*.{ico,html,js,css}"
  ],
  "swSrc": "src/sw.js",
  "swDest": "dist/sw.js",
  "injectionPointRegexp": /(const precacheManifest = )\[\](;)/
};