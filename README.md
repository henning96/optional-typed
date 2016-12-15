# Optional

Optional type written in Typescript with strictNullChecks enabled.
Pretty well tested (about 100% coverage).

There is a small difference as JavaScript does also have an undefined type.
This library strictly warns you, if you are trying to use it with an undefined type.
In Addition to that, there is an optional method named *fromAnything* that accepts
undefined values as input. They will be treated as if they were null.

## Getting Started

There is no public constructor.
Use the provided static methods for creating new instances.

### From a value that is never null or undefined

```typescript
import {Optional} from "optional-typed";

const opt = Optional.of("content");

console.log(opt.isPresent());               //prints 'true'
opt.ifPresent(value => console.log(value)); //prints 'content'
Optional.of(null);                          //throws TypeError
Optional.of(undefined);                     //throws TypeError
```

### From a value that may be null, but cannot be undefined

```typescript
import {Optional} from "optional-typed";

const opt = Optional.ofNullable<string>(null);

console.log(opt.isPresent());               //prints 'false'
opt.ifPresent(value => console.log(value)); //prints nothing
console.log(opt.orElse("other"));           //prints 'other'
console.log(opt.orElse(2));                 //does not compile
Optional.ofNullable(undefined);             //throws TypeError
```

### From a value that may be null or undefined

```typescript
import {Optional} from "optional-typed";

const opt = Optional.ofAnything<string>(undefined);

console.log(opt.isPresent());               //prints 'false'
opt.ifPresent(value => console.log(value)); //prints nothing
console.log(opt.orElseThrow(() =>
    new ReferenceError("value is not defined")
));                                         //throws ReferenceError
```



