///QueryString.js
///QueryString is a multiton
///QueryString depends on _.has


/**
 * '' is the implied null query string
 * '?' is the empty query string
 */


(function (root, _, enc, dec, undefined) {
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
    
    //count the number of different keys in the specified hash
    function keyCount(hash) {
        var c,
            key;
        c = 0;
        for (key in hash) {
            if (_.has(hash, key)) {
                c += 1;
            }
        }
        return c;
    }
    
    //create a hashtable of values from the specified array
    //associated with the number of times each value occurs in the array
    function valueCounts(arr) {
        var hash,
            i,
            key,
            value;
        hash = {};
        for (i = 0; i < arr.length; i += 1) {
            value = arr[i];
            //null and undefined are treated as identical
            if (value === null ||
                value === undefined) {
                key = 'null';
            } else {
                //values are prefixed with `_` to differentiate
                //between a value of `null` and a value of `"null"`
                key = '_' + value;
            }
            if (_.has(hash, key)) {
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
        
        //implicit constructor when called as function
        if (!(this instanceof QueryString)) {
            return new QueryString(q);
        }
        
        //check for the querystring in the hash of existing querystrings
        if (_.has(queryStringHash, q)) {
            return queryStringHash[q];
        }
        
        hash = QueryString.parse(q);
        
        //check the querystring hash for equivalent QueryString instances
        for (i in queryStringHash) {
            if (_.has(queryStringHash, i) &&
                queryStringHash[i].equals(hash)) {
                //if an equivalent instance exists,
                //alias the query string in the hash,
                //and return the existing instance
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
            
            //shortcut function if identical object references were passed
            if (this.hash === hash) {
                return true;
            }
            
            //count how many keys each hash has
            thisCount = keyCount(this.hash);
            thatCount = keyCount(hash);
            
            //if the number of keys are different, the query strings aren't equivalent
            if (thisCount !== thatCount) {
                return false;
            }
            
            //check each key in the current hash
            for (key in this.hash) {
                if (_.has(this.hash, key)) {
                    //check if the new hash has the key
                    if (_.has(hash, key)) {
                        //get the values of each key
                        thisValue = this.hash[key];
                        thatValue = hash[key];
                        //turn values into arrays if they're not already
                        if (!(thisValue instanceof Array)) {
                            thisValue = [thisValue];
                        }
                        if (!(thatValue instanceof Array)) {
                            thatValue = [thatValue];
                        }
                        //if the number of values are different, the query strings aren't equivalent
                        if (thisValue.length !== thatValue.length) {
                            return false;
                        }
                        //get hash tables of the values and the number of times they occur in the arrays
                        thisValues = valueCounts(thisValue);
                        thatValues = valueCounts(thatValue);
                        
                        //count how many keys each hash contains
                        thisCount = keyCount(thisValues);
                        thatCount = keyCount(thatValues);
                        
                        //if there are a different number of keys, the query strings aren't equivalent
                        if (thisCount !== thatCount) {
                            return false;
                        }
                        
                        //check each value in the values hashes
                        for (value in thisValues) {
                            if (_.has(thisValues, value)) {
                                //if a value occurs in one hash but not the other,
                                //or the values occur a different number of times,
                                //the query strings aren't equivalent
                                if (!_.has(thatValues, value) ||
                                    thisValues[value] !== thatValues[value]) {
                                    return false;
                                }
                            }
                        }
                        
                    } else {
                        //new hash didn't have key, query strings aren't equivalent
                        return false;
                    }
                }
            }
            return true;
        },
        hasKey: function (key) {
            //check that the hash has the specified key
            return _.has(this.hash, key);
        },
        keys: function () {
            var key,
                keys;
            keys = [];
            
            //add each key in the the hash to the list of keys
            for (key in this.hash) {
                if (_.has(this.hash, key)) {
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
            if (_.has(hash, key)) {
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
            if (_.has(hash, key)) {
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
}(this, this._, this.encodeURIComponent, this.decodeURIComponent));
