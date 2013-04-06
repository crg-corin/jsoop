///QueryString.js
///QueryString is a multiton
///QueryString depends on Object.has


/**
 * '' is the implied null query string
 * '?' is the empty query string
 */


(function (root, enc, dec, undefined) {
    "use strict";
    
    if (root.QueryString) {
        return;
    }
    
    var queryStringHash;
    
    function QueryString(q) {
        var i;
        
        if (!(this instanceof QueryString)) {
            return new QueryString(q);
        }
        
        if (Object.has(queryStringHash, q)) {
            return queryStringHash[q];
        }
        
        for (i in queryStringHash) {
            if (Object.has(queryStringHash, i) &&
                queryStringHash[i].equals(q)) {
                queryStringHash[q] = queryStringHash[i];
                return queryStringHash[q];
            }
        }
        
        this.hash = QueryString.parse(q);
    }
    
    QueryString.prototype = {
        equals: function (q) {
            return false;
        },
        keys: function () {
            return [];
        },
        toJSON: function () {
            throw new Error('not implemented');
        },
        toString: function () {
            return QueryString.stringify(this.hash);
        }
    };
    
    QueryString.stringify = function (hash, semi) {
        
    };
    
    QueryString.parse = function (q) {
        var data,
            hash,
            i,
            index,
            key,
            rawKey,
            rawValue,
            value;
        
        hash = {};
        
        //if `q` is `undefined` or `null`, there are no keys
        if (q === null ||
            q === undefined) {
            return hash;
        }
        
        //cast q to string
        q = '' + q;
        
        //if the string is empty, there are no keys
        if (q === '') {
            return hash;
        }
        
        //if the string starts with a `?` character, strip it off
        if (/^\?/.test(q)) {
            q = q.substr(1);
        }
        
        //split the string on key-value pair separators
        //`&` and `;` are used to separate key-value pairs
        q = q.split(/[&;]/g);
        
        //iterate through each key-value pair
        for (i = 0; i < q.length; i += 1) {
            data = q[i];
            
            //split the key-value pair on the first key-value separator
            //`=` is used to separate keys from values
            index = data.indexOf('=');
            if (index < 0) {
                //if no `=` is present
                // - the entire key-value pair is used as the key
                // - the value is null
                key = dec(data);
                value = null;
            } else {
                //if `=` is present
                // - rawKey is the part of the string before the `=`
                // - rawValue is the part of the string after the `=`
                rawKey = data.slice(0, index);
                rawValue = data.slice(index + 1);
                key = dec(rawKey);
                value = dec(rawValue);
            }
            
            //check if the key is present in the hash
            if (Object.has(hash, key)) {
                //if it is, add the new value to the collection of values
                hash[key].push(value);
            } else {
                //if it isn't, create a new collection of values
                hash[key] = [value];
            }
        }
        
        return hash;
    };
    
    queryStringHash = {};
    
    root.QueryString = QueryString;
}(this, this.encodeURIComponent, this.decodeURIComponent));