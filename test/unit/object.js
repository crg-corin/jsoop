///Object unit tests

(function (root, undefined) {
    "use strict";
    
    module('Object');
    test('Object.has', 14, function () {
        var a,
            ex;
        
        try {
            ok(!Object.has(null, null), 'null should not have any attributes');
            ok(!Object.has(undefined, null), 'undefined should not have any attributes');
        } catch (ex) {
            console.error(ex);
        }
        
        try {
            a = {};
            ok(!Object.has(a, null), 'an empty object literal should not have any attributes');
            ok(!Object.has(a, '__proto__'), 'an empty object literal should not have any attributes');
            ok(!Object.has(a, 'hasOwnProperty'), 'an empty object literal should not have any attributes');
        } catch (ex) {
            console.error(ex);
        }
        
        try {
            a = {
                'foo': 'bar'
            };
            ok(!Object.has(a, null), '`{"foo":"bar"}` should not have `null` as a key');
            ok(!Object.has(a, undefined), '`{"foo":"bar"}` should not have `undefined` as a key');
            ok(!Object.has(a, ''), '`{"foo":"bar"}` should not have an empty string key');
            ok(Object.has(a, 'foo'), '`{"foo":"bar"}` should have the `"foo"` key');
        } catch (ex) {
            console.error(ex);
        }
        
        try {
            a = {
                '': '',
                'null': '',
                'undefined': ''
            };
            ok(Object.has(a, ''), '`{"":"","null":"","undefined":""}` should have `""` as a key');
            ok(Object.has(a, null), '`{"":"","null":"","undefined":""}` should have `null` as a key');
            ok(Object.has(a, 'null'), '`{"":"","null":"","undefined":""}` should have `"null"` as a key');
            ok(Object.has(a, undefined), '`{"":"","null":"","undefined":""}` should have `undefined` as a key');
            ok(Object.has(a, 'undefined'), '`{"":"","null":"","undefined":""}` should have `"undefined"` as a key');
        } catch (ex) {
            console.error(ex);
        }
    });
}(this));