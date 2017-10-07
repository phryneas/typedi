"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("../Container");
/**
 * Makes a "require" npm package with the given name and injects its value.
 *
 * @param name The name of the package to require
 * @experimental
 */
function Require(name) {
    return function (target, propertyName, index) {
        Container_1.Container.registerHandler({
            object: target,
            propertyName: propertyName,
            index: index,
            value: function () { return require(name); }
        });
    };
}
exports.Require = Require;
//# sourceMappingURL=Require.js.map