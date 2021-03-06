import {Nullable, isDefined} from "./common";

/**
 * Optional type representing values that may be null.
 * Optionals are constant; they cannot be modified once created.
 */
export class Optional<T> {
    private value: Nullable<T> = null;

    private constructor(value: Nullable<T>){
        this.value = value;
    }

    /**
     * Primitive accessor that throws an exception if the value is null.
     * @throws ReferenceError If the optional is fromNothing a ReferenceError is thrown.
     * @returns The encapsulated value that is neither null nor undefined.
     */
    public getValue(): T {
        if(this.value == null)
            throw new ReferenceError("value is not defined");
        else
            return this.value;
    }

    /**
     * Returns whether this optional contains a value or not.
     */
    public isDefined(): boolean {
        return this.value != null;
    }

    /**
     * Calls the overhanded function if a value is present.
     */
    public ifDefined(func: {(value: T): void}): void {
        if(this.value != null)
            func(this.value);
    }

    /**
     * Calls the mapper function if a value is present.
     * The result from the mapping will be returned as a new Optional.
     * If no value is present an fromNothing optional will be returned.
     */
    public map<U>(mapper: (value: T) => U): Optional<U> {
        if(this.value == null)
            return Optional.fromNothing<U>();
        else
            return new Optional<U>(mapper(this.value));
    }

    /**
     * The function behaves quite similar to map, but does expect that the mapping function does already
     * return an Optional.
     */
    public flatMap<U>(mapper: (value: T) => Optional<U>): Optional<U> {
        if(this.value == null)
            return Optional.fromNothing<U>();
        else
            return mapper(this.value);
    }

    /**
     * Applies the given predicate to the value if any.
     * If this optional contains a value and the predicate results to true, the value will be returned.
     */
    public filter(predicate: (value: T) => boolean): Optional<T>{
        if(this.value == null)
            return Optional.fromNothing<T>();
        else
            return new Optional(predicate(this.value)? this.value : null);
    }

    /**
     * Creates an fromNothing optional.
     */
    public static fromNothing<T>(): Optional<T>{
        return new Optional<T>(null);
    }

    /**
     * Constructs a new Optional from a non-null value.
     * @param value Some value that is neither null or undefined.
     * @throws TypeError If the overhanded value is null or undefined, a TypeError will be thrown.
     */
    public static from<T>(value: T): Optional<T>{
        if(!isDefined(value))
            throw new TypeError("value must be defined");
        else
            return new Optional<T>(value);
    }

    /**
     * Constructs a new Optional from a null-able value.
     * @throws TypeError If the overhanded value is undefined, a TypeError will be thrown.
     */
    public static fromNullable<T>(value: Nullable<T>): Optional<T> {
        if(typeof value === "undefined")
            throw new TypeError("value cannot be undefined");

        return new Optional<T>(value);
    }

    /**
     * Constructs an optional from a value that may be defined or not.
     * If the value is undefined, it will further be treated as null.
     * Never throws an exception.
     */
    public static fromAnything<T>(value: T | null | undefined): Optional<T> {
        if(value == null || typeof value === "undefined")
            return Optional.fromNothing<T>();
        else
            return new Optional<T>(value);
    }

    /**
     * If this optional is fromNothing, the overhanded value is returned.
     */
    public orElse(other: T): T {
        if(this.value == null)
            return other;
        else
            return this.value;
    }

    /**
     * If this optional is fromNothing, the given supplier is called to provide an alternative value.
     */
    public orElseCall(supplier: () => T): T {
        if(this.value == null)
            return supplier();
        else
            return this.value;
    }

    /**
     * If this optional is fromNothing, the given error supplier is called that should provide an exception to be thrown.
     */
    public orElseThrow<X extends Error>(supplier: () => X): T {
        if(this.value == null)
            throw supplier();
        else
            return this.value;
    }

    /**
     * Returns the string representation from the contained object if any.
     * Otherwise returns 'fromNothing'.
     */
    public toString(): string {
        if(this.value == null){
            return "fromNothing";
        } else {
            return this.value.toString();
        }
    }
}

export default Optional;