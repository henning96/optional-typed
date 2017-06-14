# Optional

Optional type written in Typescript with strictNullChecks enabled.
Pretty well tested (about 100% coverage).

There is a small difference to other implementations as JavaScript does also have an undefined type.
This library strictly warns you, if you are trying to use it with an undefined type.
In Addition to that, there is an optional method named *fromAnything* that accepts
undefined values as input. They will be treated as if they were null.

## Getting Started

There is no public constructor.
Use the provided static methods for creating new instances.

### From a value that is never null or undefined

```typescript
import {Optional} from "optional-typed";

const opt = Optional.from("content");

console.log(opt.isDefined());                   //prints 'true'
opt.ifDefined(value => console.log(value));     //prints 'content'
Optional.from(null);                            //throws TypeError
Optional.from(undefined);                       //throws TypeError
```

### From a value that may be null, but cannot be undefined

```typescript
import {Optional} from "optional-typed";

const opt = Optional.fromNullable<string>(null);

console.log(opt.isDefined());                   //prints 'false'
opt.ifDefined(value => console.log(value));     //prints nothing
console.log(opt.orElse("other"));               //prints 'other'
console.log(opt.orElse(2));                     //does not compile
Optional.fromNullable(undefined);               //throws TypeError
```

### From a value that may be null or undefined

```typescript
import {Optional} from "optional-typed";

const opt = Optional.fromAnything<string>(undefined);

console.log(opt.isDefined());                   //prints 'false'
opt.ifDefined(value => console.log(value));     //prints nothing
console.log(opt.orElseThrow(() =>
    new ReferenceError("value is not defined")
));                                             //throws ReferenceError
```



