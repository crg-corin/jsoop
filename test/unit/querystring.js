///QueryString unit tests

(function (root) {
    "use strict";
    
    module('QueryString');
    test('QueryString', function () {
        var a;
        ok(root.QueryString, '`QueryString` should exist');
        
        strictEqual(typeof root.QueryString, 'function', '`QueryString` should be a function');
        
        try {
            a = new root.QueryString();
            ok(a instanceof root.QueryString, '`a` should be an instance of `QueryString`');
        } catch (ex) {
            ok(false, '`a` should be an instance of `QueryString`');
        }
    });
    
}(this));