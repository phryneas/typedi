import { ServiceMetadata } from "./types/ServiceMetadata";
import { ObjectType } from "./types/ObjectType";
import { Handler } from "./types/Handler";
import { Token } from "./Token";
import { ServiceIdentifier } from "./types/ServiceIdentifier";
/**
 * Service container.
 */
export declare class Container {
    /**
     * All registered services.
     */
    private static services;
    /**
     * All registered handlers.
     */
    private static handlers;
    /**
     * Registers a new handler.
     */
    static registerHandler(handler: Handler): void;
    /**
     * Registers a new service.
     */
    static registerService<T, K extends keyof T>(descriptor: ServiceMetadata<T, K>): void;
    /**
     * Retrieves the service with given name or type from the service container.
     * Optionally, parameters can be passed in case if instance is initialized in the container for the first time.
     */
    static get<T>(type: ObjectType<T>): T;
    /**
     * Retrieves the service with given name or type from the service container.
     * Optionally, parameters can be passed in case if instance is initialized in the container for the first time.
     */
    static get<T>(id: string): T;
    /**
     * Retrieves the service with given name or type from the service container.
     * Optionally, parameters can be passed in case if instance is initialized in the container for the first time.
     */
    static get<T>(id: Token<T>): T;
    static getAllByTag<T>(tag: string | Token<T>): Array<T>;
    /**
     * Sets a value for the given type or service name in the container.
     */
    static set(type: Function, value: any): Container;
    /**
     * Sets a value for the given type or service name in the container.
     */
    static set(name: string, value: any): Container;
    /**
     * Sets a value for the given type or service name in the container.
     */
    static set(token: Token<any>, value: any): Container;
    /**
     * Provides a set of values to be saved in the container.
     */
    static provide(values: {
        id: ServiceIdentifier;
        value: any;
    }[]): void;
    /**
     * Removes services with a given service identifiers (tokens or types).
     */
    static remove(...ids: ServiceIdentifier[]): void;
    /**
     * Completely resets the container by removing all previously registered services and handlers from it.
     */
    static reset(): void;
    /**
     * Finds registered service in the with a given service identifier.
     */
    private static findService(identifier);
    /**
     * Initializes all parameter types for a given target service class.
     */
    private static initializeParams(type, paramTypes);
    /**
     * Checks if given type is primitive (e.g. string, boolean, number, object).
     */
    private static isTypePrimitive(param);
    /**
     * Applies all registered handlers on a given target class.
     */
    private static applyPropertyHandlers(target);
}
