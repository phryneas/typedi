/**
 * Makes a "require" npm package with the given name and injects its value.
 *
 * @param name The name of the package to require
 * @experimental
 */
export declare function Require(name: string): (target: Object, propertyName: string, index?: number) => void;
