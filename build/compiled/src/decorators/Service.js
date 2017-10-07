"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Container_1 = require("../Container");
var Token_1 = require("../Token");
/**
 * Marks class as a service that can be injected using container.
 */
function Service(optionsOrServiceName) {
    return function (target) {
        var service = {
            type: target
        };
        if (typeof optionsOrServiceName === "string" || optionsOrServiceName instanceof Token_1.Token) {
            service.id = optionsOrServiceName;
        }
        else if (optionsOrServiceName) {
            service.id = optionsOrServiceName.id;
            service.factory = optionsOrServiceName.factory;
            service.tags = optionsOrServiceName.tags;
        }
        Container_1.Container.registerService(service);
    };
}
exports.Service = Service;
//# sourceMappingURL=Service.js.map