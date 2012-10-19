(function () {
    //noConflict({map}); //call noConflict(base, map); using window
    //noConflict({base}, {map}); //call noConflict(base, 'prop', obj); for every key->value in {map}
    //noConflict('prop', {obj}); //call noConflict(base, 'prop', obj); using window
    //noConflict({base}, 'prop', {obj});
    //noConflict([bases], [props], {obj});
    if (!window.noConflict) {
        window.noConflict = function (base, prop, obj) {
            var deleteProp,
                backup;
            if (arguments.length === 2) {
                obj = prop;
                prop = base;
                base = window;
            }
            if (base == null /* or undefined */) {
                throw new Error('"base" must be an object.');
            }
            //prop must be a string
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
                delete obj.noConflict;
                return this;
            };
        };
    }
}());