"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("../Container");
var Token_1 = require("../Token");
/**
 * Injects a service into a class property or constructor parameter.
 */
function Inject(typeOrName) {
    return function (target, propertyName, index) {
        if (!typeOrName)
            typeOrName = function () { return Reflect.getMetadata("design:type", target, propertyName); };
        Container_1.Container.registerHandler({
            object: target,
            propertyName: propertyName,
            index: index,
            value: function () {
                var identifier;
                if (typeof typeOrName === "string") {
                    identifier = typeOrName;
                }
                else if (typeOrName instanceof Token_1.Token) {
                    identifier = typeOrName;
                }
                else {
                    identifier = typeOrName();
                }
                return Container_1.Container.get(identifier);
            }
        });
    };
}
exports.Inject = Inject;
/**
 * Injects a service into a class property or constructor parameter.
 */
function InjectTagged(tokenOrName) {
    return function (target, propertyName, index) {
        if (!tokenOrName)
            throw new Error("@InjectTagged must be called with a tag as argument");
        Container_1.Container.registerHandler({
            object: target,
            propertyName: propertyName,
            index: index,
            value: function () {
                return Container_1.Container.getAllByTag(tokenOrName) || [];
            }
        });
    };
}
exports.InjectTagged = InjectTagged;
//# sourceMappingURL=Inject.js.map