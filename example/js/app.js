// APP.JS
// ======
// This is the main file to initilized the application. It perform many
// conditional initialization based on the context provide. The context
// can be the whole document or just a fragment (such as Modal Boxes).

// We special case to allow console in this file only
/*global console*/
(function() {
    'use strict';

    // TOOLS
    function error(err) {
        if (console && console.warn && console.log && err) {
            if (err.requireModules) {
                console.warn('Error within:', err.requireModules);
            }

            if (err.source) {
                console.log('Source:', err.source);
            }

            if (err.message) {
                console.log('Message:', err.message);
            }
        }
    }

    /**
     * deps
     * jQuery
     * lodash
     **/
    define(['plugins.jquery',
            'plugins.lodash'
        ],

        // APP MODULE
        function($, _) {


            // Basic initialization function for any module with an `init` method
            function initBasic(context, module) {
                module.init(context);
            }


            // MODULES LIST & LOADING CONDITIONS
            // ---------------------------------
            var MODULES = [
                ['resolver!modules.module1',
                    '#app',
                    initBasic
                ],
            ];


            // APP MODULE
            // ----------

            // This is called to init the App in a given context. The `context` object,
            // if provided, is a jQuery object defining the DOM tree to initialized
            function iniApp(context) {

                if (!(context instanceof $)) {
                    context = $(document);
                }

                // loop through the conditional modules
                _.each(MODULES, function(m) {
                    if (m !== undefined && ($(m[1], context).length > 0)) {
                        require([m[0]], _.partial(m[2], context), error);
                    }
                });
            }


            // PUBLIC MODULE
            // -------------

            // Expose the following interface:
            return {
                // `MODULE.init` (initialization method)
                init: iniApp
            };
        }, error);
})();