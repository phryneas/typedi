"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Token_1 = require("./Token");
var ServiceNotFoundError_1 = require("./error/ServiceNotFoundError");
/**
 * Service container.
 */
var Container = /** @class */ (function () {
    function Container() {
    }
    // -------------------------------------------------------------------------
    // Public Static Methods
    // -------------------------------------------------------------------------
    /**
     * Registers a new handler.
     */
    Container.registerHandler = function (handler) {
        this.handlers.push(handler);
    };
    /**
     * Registers a new service.
     */
    Container.registerService = function (descriptor) {
        this.services.push(descriptor);
    };
    /**
     * Retrieves the service with given name or type from the service container.
     * Optionally, parameters can be passed in case if instance is initialized in the container for the first time.
     */
    Container.get = function (identifier) {
        // find if service already was registered
        var service = this.findService(identifier);
        // find if instance of this object already initialized in the container and return it if it is
        if (service && service.instance !== null && service.instance !== undefined)
            return service.instance;
        // if named service was requested and its instance was not found plus there is not type to know what to initialize,
        // this means service was not pre-registered and we throw an exception
        if ((!service || !service.type) &&
            (!service || !service.factory) &&
            (typeof identifier === "string" || identifier instanceof Token_1.Token))
            throw new ServiceNotFoundError_1.ServiceNotFoundError(identifier);
        // at this point we either have type in service registered, either identifier is a target type
        var type = service && service.type ? service.type : identifier;
        // if service was not found then create a new one and register it
        if (!service) {
            service = { type: type };
            this.services.push(service);
        }
        // setup constructor parameters for a newly initialized service
        var paramTypes = Reflect && Reflect.getMetadata ? Reflect.getMetadata("design:paramtypes", type) : undefined;
        var params = paramTypes ? this.initializeParams(type, paramTypes) : [];
        // if factory is set then use it to create service instance
        if (service.factory) {
            // filter out non-service parameters from created service constructor
            // non-service parameters can be, lets say Car(name: string, isNew: boolean, engine: Engine)
            // where name and isNew are non-service parameters and engine is a service parameter
            params = params.filter(function (param) { return param !== undefined; });
            if (service.factory instanceof Array) {
                // use special [Type, "create"] syntax to allow factory services
                // in this case Type instance will be obtained from Container and its method "create" will be called
                service.instance = (_a = this.get(service.factory[0]))[service.factory[1]].apply(_a, params);
            }
            else {
                service.instance = service.factory.apply(service, params);
            }
        }
        else {
            params.unshift(null);
            service.instance = new (type.bind.apply(type, params))();
        }
        this.applyPropertyHandlers(type);
        return service.instance;
        var _a;
    };
    Container.getAllByTag = function (tag) {
        var _this = this;
        return this.services
            .filter(function (service) { return service.tags && service.tags.find(function (availableTag) { return availableTag === tag; }); })
            .map(function (service) { return _this.get(service.type); });
    };
    /**
     * Sets a value for the given type or service name in the container.
     */
    Container.set = function (identifier, value) {
        var service = this.findService(identifier);
        if (service) {
            service.instance = value;
        }
        else {
            var service_1 = {
                instance: value
            };
            if (identifier instanceof Token_1.Token || typeof identifier === "string") {
                service_1.id = identifier;
            }
            else {
                service_1.type = identifier;
            }
            this.services.push(service_1);
        }
        return this;
    };
    /**
     * Provides a set of values to be saved in the container.
     */
    Container.provide = function (values) {
        var _this = this;
        values.forEach(function (v) { return _this.set(v.id, v.value); });
    };
    /**
     * Removes services with a given service identifiers (tokens or types).
     */
    Container.remove = function () {
        var _this = this;
        var ids = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            ids[_i] = arguments[_i];
        }
        ids.forEach(function (id) {
            var service = _this.findService(id);
            if (service)
                _this.services.splice(_this.services.indexOf(service), 1);
        });
    };
    /**
     * Completely resets the container by removing all previously registered services and handlers from it.
     */
    Container.reset = function () {
        this.handlers = [];
        this.services = [];
    };
    // -------------------------------------------------------------------------
    // Private Static Methods
    // -------------------------------------------------------------------------
    /**
     * Finds registered service in the with a given service identifier.
     */
    Container.findService = function (identifier) {
        return this.services.find(function (service) {
            if (service.id)
                return service.id === identifier;
            if (service.type && identifier instanceof Function)
                return service.type === identifier || identifier.prototype instanceof service.type;
            return false;
        });
    };
    /**
     * Initializes all parameter types for a given target service class.
     */
    Container.initializeParams = function (type, paramTypes) {
        var _this = this;
        return paramTypes.map(function (paramType, index) {
            var paramHandler = _this.handlers.find(function (handler) { return handler.object === type && handler.index === index; });
            if (paramHandler)
                return paramHandler.value();
            if (paramType && paramType.name && !_this.isTypePrimitive(paramType.name))
                return Container.get(paramType);
            return undefined;
        });
    };
    /**
     * Checks if given type is primitive (e.g. string, boolean, number, object).
     */
    Container.isTypePrimitive = function (param) {
        return ["string", "boolean", "number", "object"].indexOf(param.toLowerCase()) !== -1;
    };
    /**
     * Applies all registered handlers on a given target class.
     */
    Container.applyPropertyHandlers = function (target) {
        this.handlers.forEach(function (handler) {
            if (handler.index)
                return;
            if (handler.object.constructor !== target && !(target.prototype instanceof handler.object.constructor))
                return;
            Object.defineProperty(handler.object, handler.propertyName, {
                enumerable: true,
                writable: true,
                configurable: true,
                value: handler.value()
            });
        });
    };
    // -------------------------------------------------------------------------
    // Private Static Properties
    // -------------------------------------------------------------------------
    /**
     * All registered services.
     */
    Container.services = [];
    /**
     * All registered handlers.
     */
    Container.handlers = [];
    return Container;
}());
exports.Container = Container;
//# sourceMappingURL=Container.js.map