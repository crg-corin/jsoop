(function () {
    "use strict";
    //usage 'foo <%=bar%> <%="fizz"%>'.tmpl({bar: 'baz'})
    //returns 'foo baz fizz'
    if (!String.prototype.tmpl) {
        String.prototype.tmpl = function (o) {
            return this.replace(/<%=(?:"([^"]*)"|(.*?))%>/g, function (item, qparam, param) {
                return qparam || o[param];
            });
        };
    }
}());