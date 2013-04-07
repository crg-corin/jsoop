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
    
    function buildKeyValuePair(rawKey, rawValue) {
        var key,
            pair,
            value;
        
        //URL encode the `rawKey`
        key = enc(rawKey);
        
        //if `rawValue` is `null` or `undefined`...
        if (rawValue === null ||
            rawValue === undefined) {
            //there is no value part of the key-value pair
            pair = [key];
        } else {
            //otherwise, encode the `rawValue`...
            value = enc(rawValue);
            //and set the key-value pair
            pair = [key, value];
        }
        
        //join the key-value pair with `=`
        return pair.join('=');
    }
    
    function keyCount(hash) {
        var c,
            key;
        c = 0;
        for (key in hash) {
            if (Object.has(hash, key)) {
                c += 1;
            }
        }
        return c;
    }
    
    function valueCounts(arr) {
        var hash,
            i,
            key,
            value;
        hash = {};
        for (i = 0; i < arr.length; i += 1) {
            value = arr[i];
            if (value === null ||
                value === undefined) {
                key = 'null';
            } else {
                key = '_' + value;
            }
            if (Object.has(hash, key)) {
                hash[key] += 1;
            } else {
                hash[key] = 1;
            }
        }
        return hash;
    }
    
    function QueryString(q) {
        var i,
            hash;
        
        if (q === null ||
            q === undefined) {
            q = '';
        }
        
        if (!(this instanceof QueryString)) {
            return new QueryString(q);
        }
        
        if (Object.has(queryStringHash, q)) {
            return queryStringHash[q];
        }
        
        hash = QueryString.parse(q);
        
        for (i in queryStringHash) {
            if (Object.has(queryStringHash, i) &&
                queryStringHash[i].equals(hash)) {
                queryStringHash[q] = queryStringHash[i];
                return queryStringHash[q];
            }
        }
        
        queryStringHash[q] = this;
        
        this.hash = hash;
    }
    
    QueryString.prototype = {
        equals: function (hash) {
            var key,
                thatCount,
                thatValue,
                thatValues,
                thisCount,
                thisValue,
                thisValues,
                value;
            
            //alternatively:
            //if (Object.prototype.toString.call(hash) === '[object String]') {
            if (typeof hash === 'string') {
                hash = QueryString.parse(hash);
            }
            
            if (this.hash === hash) {
                return true;
            }
            
            thisCount = keyCount(this.hash);
            thatCount = keyCount(hash);
            
            if (thisCount !== thatCount) {
                return false;
            }
            
            for (key in this.hash) {
                if (Object.has(this.hash, key)) {
                    if (Object.has(hash, key)) {
                        thisValue = this.hash[key];
                        thatValue = hash[key];
                        if (!(thisValue instanceof Array)) {
                            thisValue = [thisValue];
                        }
                        if (!(thatValue instanceof Array)) {
                            thatValue = [thatValue];
                        }
                        if (thisValue.length !== thatValue.length) {
                            return false;
                        }
                        thisValues = valueCounts(thisValue);
                        thatValues = valueCounts(thatValue);
                        
                        thisCount = keyCount(thisValues);
                        thatCount = keyCount(thatValues);
                        
                        if (thisCount !== thatCount) {
                            return false;
                        }
                        
                        for (value in thisValues) {
                            if (Object.has(thisValues, value)) {
                                if (!Object.has(thatValues, value) ||
                                    thisValues[value] !== thatValues[value]) {
                                    return false;
                                }
                            }
                        }
                        
                    } else {
                        return false;
                    }
                }
            }
            return true;
        },
        hasKey: function (key) {
            return Object.has(this.hash, key);
        },
        keys: function () {
            var key,
                keys;
            keys = [];
            for (key in this.hash) {
                if (Object.has(this.hash, key)) {
                    keys.push(key);
                }
            }
            return keys;
        },
        toJSON: function () {
            throw new Error('not implemented');
        },
        toString: function () {
            return QueryString.stringify(this.hash);
        }
    };
    
    QueryString.stringify = function (hash, semi) {
        var i,
            key,
            pairs,
            q,
            separator,
            value;
        
        //if `hash` is `null` or `undefined`, there are no key-value pairs
        if (hash === null ||
            hash === undefined) {
            return '';
        }
        
        //create a new array of key-value pairs
        pairs = [];
        
        //for every key in the hash
        for (key in hash) {
            if (Object.has(hash, key)) {
                //get the value
                value = hash[key];
                
                //check whether the value is an array
                if (value instanceof Array) {
                    //if it is, iterate through the array...
                    for (i = 0; i < value.length; i += 1) {
                        //create key-vaule pairs for each item in the array
                        pairs.push(buildKeyValuePair(key, value[i]));
                    }
                } else {
                    //if it isn't, create a key-value pair for the item
                    pairs.push(buildKeyValuePair(key, value));
                }
            }
        }
        
        //if there are key-value pairs, start the query-string with `?`
        q = pairs.length ? '?' : '';
        
        //check whether the separator should be `;` or `&`
        separator = semi ? ';' : '&';
        
        //join all the pairs by the separator, and add it to the query-string
        q += pairs.join(separator);
        
        return q;
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
        
        //if `q` is `null` or `undefined`, there are no keys
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