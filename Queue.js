(function (global, Error, setTimeout, slice) {
    "use strict";
    function Q() {
        if (!(this instanceof Q)) {
            return new Q();
        }
        this.q = [];
        //flag to show that the queue is actively processing a queued function
        this.active = false;
    }
    Q.prototype = {
        queue: function (/* fn1, fn2, ... */) {
            var i,
                fn,
                args;
            if (!arguments.length) {
                throw new Error('"Queue.prototype.queue" requires at least one function');
            }
            for (i = 0; i < arguments.length; i += 1) {
                fn = arguments[i];
                if (typeof fn !== 'function') {
                    throw new Error('"Queue.prototype.queue" only accepts functions as parameters');
                }
            }
            args = slice.call(arguments);
            this.q = this.q.concat(args);
            if (!this.active) {
                this.dequeue();
            }
            return this;
        },
        dequeue: function () {
            var self;
            function next() {
                self.dequeue();
            }
            function run() {
                var fn;
                if (!self.q.length) {
                    //nothing in the queue, the queue is no longer active
                    self.active = false;
                    return;
                }
                self.active = true;
                //get the next function (first) in the queue
                fn = self.q.shift();
                
                //run the function
                fn.call(self, next);
            }
            self = this;
            //escape the program flow
            setTimeout(run, 1);
            
            return this;
        },
        clear: function () {
            //remove all the functions from the queue
            while (this.q.length) {
                this.q.pop();
            }
            return this;
        }
    };
    
    global.Queue = Q;
}(this, this.Error, this.setTimeout, Array.prototype.slice));