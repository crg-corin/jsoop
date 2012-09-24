(function () {
    "use strict";
    if (!Math.rand) {
        Math.rand = function (min, max, step) {
            var swap,
                delta,
                rand;
            switch (arguments.length) {
            case 0:
                return !Math.round(Math.random());
            case 1:
                max = 0;
                step = 1;
                break;
            case 2:
                step = 1;
                break;
            }
            
            min = +min;
            max = +max;
            step = +step;
            
            if (!isFinite(min)) {
                throw new Error('"min" must be finite.');
            }
            if (!isFinite(max)) {
                throw new Error('"max" must be finite.');
            }
            if (!isFinite(step)) {
                throw new Error('"step" must be finite.');
            }
            if (step <= 0) {
                throw new Error('"step" must be positive');
            }
            
            if (min > max) {
                swap = min;
                min = max;
                max = swap;
            }
            
            delta = max - min;
            //expand random value to be in the range [0, delta)
            rand = Math.random() * delta;
            //drop rand to nearest step
            rand -= (rand % step);
            //add min so that rand is in the range [min, max)
            rand += min;
            return rand;
        };
    }
}());