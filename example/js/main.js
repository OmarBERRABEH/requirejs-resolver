(function() {
    'use strict';

    function error(err) {

        if (console && console.warn && console.log) {
            console.warn('Error within:', err.requireModules);
            console.log('Source:', err.source);
            console.log('Message:', err.message);
        }
    }

    // Setup de la configuration
    require.config({

        // baseUrl: './',

        paths: {
            // Plugins require
            'resolver': 'requirejs/resolver',

            // entry point
            'app': 'app',

            //application plugins
            'plugins.lodash': 'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.4/lodash',
            'plugins.jquery': 'https://code.jquery.com/jquery-2.2.4.min',

            // application modules

            // this module will be  overrided in es_Es locl
            'modules.module1': 'modules/module1'
        },

        shim: {
            'plugins.jquery': {
                exports: 'jQuery'
            },
            'plugins.lodash': {
                exports: '_'
            },
        },
        config: {
            resolver: {

                resolve: function(name, path) {
                    var local = window.local || 'fr_FR';
                    var newPath = path;
                    var overridePathByLocal = {
                        'es_ES': [
                            'modules.module1'
                        ]
                    };

                    if (overridePathByLocal[local] && overridePathByLocal[local].indexOf(name) !== -1) {
                        newPath = newPath.replace(/modules\//, ['modules/locals/', local, '/'].join(''));
                    }

                    return newPath;
                }
            }
        },

        //urlArgs: "bust=" + (new Date()).getTime(),
        waitSeconds: 0
    });
    // call the app module to be init
    require(['app'],
        function(App) {
            // Initialize the application
            App.init();
        }, error);
})();