///QueryString.js
///QueryString is a multiton


/**
 * '' is the implied null query string
 * '?' is the empty query string
 */


(function (root, undefined) {
    "use strict";
    
    if (!root.QueryString) {
        root.QueryString = function () {
            
        };
    }
}(this));