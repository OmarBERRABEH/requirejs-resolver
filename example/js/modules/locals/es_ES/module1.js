/**
 * MODULES1.JS
 * ===========
 * module1 to print in #app element a string
 **/
(function() {
    'use strict';


    /**
     * deps
     * jQuery
     **/
    define(['plugins.jquery'],
        function($) {

        	var STRING = 'modules1 is  override and loaded in es_ES module :)';

        	// function print a string
            function initModule() {
            	$('#app').append(['<p>',STRING,'</p>']);
            }

            // public interface with other modules
            return {
                init: initModule
            }

        })
})();