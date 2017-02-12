/** @license
 * A requirejs plugin to resolve a dynamic url
 * Author: omar BERRABEH (omar.berrabeh@gmail.com)
 * Version: 0.0.1 (2017/01/31)
 * Released under the MIT license
 */
define(function() {

    /** helpers **/
    function _isFunction(fn) {
        return typeof fn === "function"
    }


    return {
        load: function(name, req, onLoad, config) {

            // get the function  resolver in config require
            var configResolver = config && config.config && config.config.resolver;
            var pathModule = name && config && config.paths && config.paths[name]
                // the false to  indicate if the url will be chaange or remaind aafter the operation will be termine
            var savePathChange = false;

            //check if the resolver function is present in requirejs config
            if (pathModule && configResolver && _isFunction(configResolver.resolve)) {
                // get the value of the save
                // if undefined then  false is the value 
                savePathChange = !!configResolver.save;

                // exec the resolve function  
                // get the value returned  by the function
                // if the resolve function will return nothing (undefined) then   get the original path of the module
                newPath = configResolver.resolve(name, pathModule) || pathModule;
                // change the paath in the config before the require will be executed
                config.paths[name] = newPath;
            }

            require([name], function(moduleContent) {
                if (savePathChange !== true) {
                    config.paths[name] = pathModule;
                }
                onLoad(moduleContent);
            })

        }
    };
});