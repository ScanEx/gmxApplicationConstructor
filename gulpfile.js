var gulp = require('gulp');
var path = require('path');

var jquery = {
    bowerComponent: 'jquery',
    distFiles: ['dist/jquery.js']
};

var handlebars = {
    bowerComponent: 'handlebars',
    distFiles: ['handlebars.js']
};

var aceEditor = {
    id: 'ace-builds',
    bowerComponent: 'git@github.com:ajaxorg/ace-builds.git',
    distFiles: [
        './src/ace.js',
        './src/worker-json.js',
        './src/mode-json.js',
        './src/theme-chrome.js'
    ]
};

var leaflet = {
    bowerComponent: 'leaflet',
    distFiles: [
        'dist/leaflet-src.js',
        'dist/leaflet.css',
        'dist/images/layers.png',
        'dist/images/layers-2x.png',
        'dist/images/marker-icon.png',
        'dist/images/marker-icon-2x.png',
        'dist/images/marker-shadow.png'
    ]
};

var leafletGeomixer = {
    id: 'Leaflet-GeoMixer',
    srcDir: './external/Leaflet-GeoMixer',
    distFiles: ['./dist/leaflet-geomixer-src.js'],
    build: true,
    watch: false
};

var tileLayerMercator = {
    id: 'Leaflet.TileLayer.Mercator',
    srcDir: './external/Leaflet.TileLayer.Mercator',
    distFiles: ['./src/TileLayer.Mercator.js'],
    build: false,
    watch: false
};

var gmxBaseLayersManager = {
    id: 'Leaflet.gmxBaseLayersManager',
    srcDir: './external/Leaflet.gmxBaseLayersManager',
    distFiles: [
        './src/gmxBaseLayersManager.js',
        './src/initBaseLayerManager.js'
    ],
    build: false,
    watch: false
};

var gmxControls = {
    id: 'gmxControls',
    srcDir: './external/gmxControls',
    distFiles: [
        './dist/gmxControls-src.js',
        './dist/css/gmxControls.css',
        './dist/css/img/band.png',
        './dist/css/img/coords.png',
        './dist/css/img/gmxSprite.png',
        './dist/css/img/logo_footer.png',
        './dist/css/img/logo_footer_color.png'
    ],
    build: true,
    watch: false
};

var baseLayersControl = {
    id: 'BaseLayersControl',
    srcDir: './external/GMXCommonComponents/BaseLayersControl',
    distDir: 'build',
    build: true
};

var componentsManager = {
    id: 'ComponentsManager',
    srcDir: './external/GMXCommonComponents/ComponentsManager'
};

var applicationConstructor = {
    id: 'ApplicationConstructor',
    srcDir: './external/GMXCommonComponents/ApplicationConstructor'
};

var commonStyles = {
    id: 'CommonStyles',
    srcDir: './external/GMXCommonComponents/CommonStyles',
    distDir: './build',
    build: true
};

var dropdownMenuWidget = {
    id: 'DropdownMenuWidget',
    srcDir: './external/GMXCommonComponents/DropdownMenuWidget',
    distDir: './build',
    build: true
};

var applicationConstrucorComponents = [
    leaflet,
    leafletGeomixer,
    tileLayerMercator,
    gmxBaseLayersManager,
    gmxControls,
    baseLayersControl,
    componentsManager,
    applicationConstructor
];

require('./external/GMXBuilder')(gulp, {
    tempDir: './temp',
    distDir: './dist',
    watchExtensions: ['.js', '.css', '.html', '.less', '.svg']
}, [{
    id: 'gmxApplicationConstructor',
    components: applicationConstrucorComponents
}, {
    id: 'viewer',
    components: applicationConstrucorComponents.concat([{
        id: 'viewer',
        srcDir: './viewer'
    }])
}, {
    id: 'editor',
    components: applicationConstrucorComponents.concat([
        jquery,
        handlebars,
        aceEditor,
        commonStyles,
        dropdownMenuWidget, {
            id: 'editor',
            srcDir: './editor'
        }
    ])
}]);