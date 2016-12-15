/**
 * Type that can be null, but cannot be undefined.
 */
export type Nullable<T> = T | null;

/**
 * Returns true if the given value is neither null nor undefined.
 */
export function isDefined(value: any): boolean {
    return typeof value !== "undefined" && value != null;
}