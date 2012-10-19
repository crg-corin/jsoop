(function () {
    //noConflict({map}); //call noConflict(base, map); using window
    //noConflict({base}, {map}); //call noConflict(base, 'prop', obj); for every key->value in {map}
    //noConflict('prop', {obj}); //call noConflict(base, 'prop', obj); using window
    //noConflict({base}, 'prop', {obj});
    //noConflict([bases], [props], {obj});
    
    function noConflict(base, prop, obj) {
        var deleteProp,
            backup,
            i;
        switch (arguments.length) {
        case 0: //noConflict();
            throw new Error('At least one parameter must be provided');
        case 1: //noConflict({map});
            return noConflict(window, base);
        case 2: //noConflict('prop', {obj});
                //noConflict({base}, {map});
            if (typeof base === 'string') {
                return noConflict(window, base, prop);
            }
            if (prop == null /* or undefined */) {
                throw new Error('"map" must be an object.');
            }
            for (i in prop) {
                if (prop.hasOwnProperty(i)) {
                    noConflict(base, i, prop[i]);
                }
            }
            return;
        }
        if (base == null /* or undefined */) {
            throw new Error('"base" must be an object.');
        }
        prop = '' + prop;
        if (obj == null /* or undefined */) {
            throw new Error('"obj" must be an object.');
        }
        
        if (base.hasOwnProperty(prop)) {
            deleteProp = false;
            backup = base[prop];
        } else {
            deleteProp = true;
        }
        
        base[prop] = obj;
        
        obj.noConflict = function () {
            if (deleteProp) {
                delete base[prop];
            } else {
                base[prop] = backup;
            }
            delete obj.noConflict();
            return this;
        };
    }
    
    if (!window.noConflict) {
        window.noConflict = noConflict;
    }
}());