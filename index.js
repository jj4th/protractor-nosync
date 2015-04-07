var wrap = function (browser, method) {
    return function () {
        browser.ignoreSynchronization = true;
        method.apply(method, arguments);
        browser.ignoreSynchronization = false;
    };
}

module.exports = exports = {
    initialize: function (browser, obj) {
        // create the default wrapper
        var noSync = function(method) {
            wrap(browser, method)();
        }

        // Create the chained functions
        for (var key in obj) {
            noSync[key] = wrap(browser, obj[key]);
        }

        return noSync;
    }
};
