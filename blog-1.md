# Why `unknown` is Safer Than `any` in TypeScript: How Type Narrowing Makes It Practical

## Introduction

One of the first things I learned about TypeScript is that it keeps code safe by catching errors before they run. But I also learned, the hard way, that one keyword quietly breaks all of that: `any`. Once I started using it, the compiler stopped checking, and bugs got me. The fix is `unknown`, and in this blog I'll share why I now consider it the smarter choice.

---

## The Problem with `any`

When I assign a variable the type `any`, I'm basically telling TypeScript: "Stop checking this. I'll handle it." The compiler steps aside entirely, and I lose all the benefits of static typing.

```typescript
function processInput(value: any) {
  console.log(value.toUpperCase()); // No error at compile time
}

processInput(42); // Runtime crash: value.toUpperCase is not a function
```

TypeScript has no idea that `42` is a number and has no `.toUpperCase()` method. The error only surfaces at runtime exactly what I was relying on TypeScript to prevent.

I now think of `any` as a **"type safety hole"** because it punches a gap in the type system. Any value that passes through `any` carries no guarantees, and the compiler won't warn me when things go wrong.

---

## The Safer Alternative: `unknown`

The `unknown` type is TypeScript's answer to truly unpredictable data. Like `any`, I can assign anything to an `unknown` variable. But unlike `any`, TypeScript **refuses to let me use it** until I prove what it actually is.

```typescript
function processInput(value: unknown) {
  console.log(value.toUpperCase()); // Compile-time error: Object is of type 'unknown'
}
```

This is actually a good thing. TypeScript is protecting me from making assumptions about data I haven't validated yet.

---

## Type Narrowing: Making `unknown` Practical

Type narrowing is how I tell TypeScript what a value actually is, by writing checks that narrow a broad type down to a specific one. Once TypeScript sees that I've verified the type, it lets me use it safely.

### Narrowing with `typeof`

```typescript
function processInput(value: unknown): string {
  if (typeof value === "string") {
    return value.toUpperCase(); // TypeScript knows value is a string here
  }
  if (typeof value === "number") {
    return value.toFixed(2); // TypeScript knows value is a number here
  }
  return "Unsupported type";
}

processInput("hello"); // "HELLO"
processInput(3.14159); // "3.14"
```

### Custom Type Guards

For complex objects, I write a **type guard function** using the `is` keyword:

```typescript
interface User {
  id: number;
  name: string;
}

function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value
  );
}

function greetUser(value: unknown): string {
  if (isUser(value)) {
    return `Hello, ${value.name}!`; // TypeScript knows value is User here
  }
  return "Hello, stranger!";
}
```

---

## Conclusion

`any` was meant to be a useful shortcut. Instead, it's been a huge pain. With `unknown` I have to think about the data I'm working with, which is exactly what I should have been doing anyway. If you're thinking of using `any`, try `unknown` first. It took me a minute to get used to it, but now I can't imagine using `any` ever again.
