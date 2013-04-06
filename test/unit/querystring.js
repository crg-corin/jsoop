///QueryString unit tests

(function (root, undefined) {
    "use strict";
    
    module('QueryString');
    test('QueryString', 3, function () {
        var a,
            ex;
        
        ok(root.QueryString, '`QueryString` should exist');
        strictEqual(typeof root.QueryString, 'function', '`QueryString` should be a function');
        
        try {
            a = new root.QueryString();
            ok(a instanceof root.QueryString, '`a` should be an instance of `QueryString`');
        } catch (ex) {
            console.error(ex);
        }
    });
    
    test('QueryString references', 7, function () {
        var a,
            b,
            ex;
        try {
            a = new root.QueryString();
            b = new root.QueryString();
            strictEqual(a, b, '`a` should reference the same object as `b`');
        } catch (ex) {
            console.error(ex);
        }
        
        try {
            a = new root.QueryString();
            b = new root.QueryString(null);
            strictEqual(a, b, '`a` should reference the same object as `b`');
        } catch (ex) {
            console.error(ex);
        }
        
        try {
            a = new root.QueryString();
            b = new root.QueryString(undefined);
            strictEqual(a, b, '`a` should reference the same object as `b`');
        } catch (ex) {
            console.error(ex);
        }
        
        try {
            a = new root.QueryString();
            b = new root.QueryString('');
            strictEqual(a, b, '`a` should reference the same object as `b`');
        } catch (ex) {
            console.error(ex);
        }
        
        try {
            a = new root.QueryString();
            b = new root.QueryString('?');
            notStrictEqual(a, b, '`a` should not reference the same object as `b`');
        } catch (ex) {
            console.error(ex);
        }
        
        try {
            a = new root.QueryString('?');
            b = new root.QueryString('?');
            strictEqual(a, b, '`a` should reference the same object as `b`');
        } catch (ex) {
            console.error(ex);
        }
        
        try {
            a = new root.QueryString('foo=bar');
            b = new root.QueryString('?foo=bar');
            strictEqual(a, b, '`foo=bar` should reference the same object as `?foo=bar`');
        } catch (ex) {
            console.error(ex);
        }
    });
    
    test('QueryString keys', 22, function () {
        var a,
            b,
            ex;
        try {
            a = new root.QueryString('');
            deepEquals(a.keys(), [], 'the implicit null query string should have no keys');
            ok(!a.hasKey(), 'no query string should have `undefined` as a key');
            ok(!a.hasKey(null), 'no query string should have `null` as a key');
            ok(!a.hasKey(''), 'the implicit null query string should not have `""` as a key');
            ok(!a.hasKey('foo'), 'the implicit null query string should not have `"foo"` as a key');
        } catch (ex) {
            console.error(ex);
        }
        
        try {
            a = new root.QueryString('?');
            deepEquals(a.keys(), [''], 'the empty query string should have `\'\'` as a key');
            ok(!a.hasKey(), 'no query string should have `undefined` as a key');
            ok(!a.hasKey(null), 'no query string should have `null` as a key');
            ok(a.hasKey(''), 'the empty query string should have `""` as a key');
            ok(!a.hasKey('foo'), 'the empty query string should not have `"foo"` as a key');
        } catch (ex) {
            console.error(ex);
        }
        
        try {
            a = new root.QueryString('?foo=bar');
            deepEquals(a.keys(), ['foo'], '`?foo=bar` should have `"foo"` as its only key');
            ok(!a.hasKey(), 'no query string should have `undefined` as a key');
            ok(!a.hasKey(null), 'no query string should have `null` as a key');
            ok(!a.hasKey(''), '`?foo=bar` should not have `""` as a key');
            ok(a.hasKey('foo'), '`?foo=bar` should have `"foo"` as a key');
        } catch (ex) {
            console.error(ex);
        }
        
        try {
            a = new root.QueryString('?foo=bar&fizz=buzz');
            deepEquals(a.keys(), ['foo', 'fizz'], '`?foo=bar&fizz=buzz` should have `"foo"` and `"fizz"` as its only keys');
            ok(!a.hasKey(), 'no query string should have `undefined` as a key');
            ok(!a.hasKey(null), 'no query string should have `null` as a key');
            ok(!a.hasKey(''), '`?foo=bar&fizz=buzz` should not have `""` as a key');
            ok(a.hasKey('foo'), '`?foo=bar&fizz=buzz` should have `"foo"` as a key');
            ok(a.hasKey('fizz'), '?foo=bar&fizz=buzz` should have `"fizz"` as a key');
            
            b = new root.QueryString('?fizz=buzz&foo=bar');
            strictEquals(a, b, '`?foo=bar&fizz=buzaz` should reference the same object as `?fizz=buzz&foo=bar`');
        } catch (ex) {
            console.error(ex);
        }
    });
}(this));