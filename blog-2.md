# Generics in TypeScript: Building Reusable, Strictly Typed Components

## Introduction

I found that every time I needed to reuse some code I had a choice between two options: 1. Make my function reusable, but lose type safety or, 2. Keep my functions strongly typed, but have to retype the same function over and over again.This is where **Generics** saved me.

---

## Generic Functions

A generic function uses a **type parameter** (written as `<T>`) which acts as a placeholder that TypeScript fills in based on what i should actually pass.

```typescript
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

const num = getFirst([1, 2, 3]);       // TypeScript infers T = number
const str = getFirst(["a", "b", "c"]); // TypeScript infers T = string

num.toUpperCase(); // Compile-time error: Property 'toUpperCase' does not exist on type 'number'
str.toUpperCase(); // Fine, TypeScript knows this is a string
```

`T` is not a special keyword.  it is simply a convention. I can use any name. What matters is that it links the input type to the output type, preserving full type information.

---

## Generic Interfaces

Generics are not limited to functions. Interfaces can be generic too, which is essential for modelling API responses, wrappers, and data containers.

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface User {
  id: number;
  name: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
}

const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "Alice" },
  status: 200,
  message: "OK",
};

const productResponse: ApiResponse<Product> = {
  data: { id: 5, title: "Laptop", price: 999 },
  status: 200,
  message: "OK",
};
```

---

## Generic Constraints with `extends`

Sometimes I need to accept any type, but still require that it has certain properties. Hrer `extends` is the type parameter.

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "John Doe", age: 21 };

getProperty(user, "name"); // "John Doe", TypeScript knows return type is string
getProperty(user, "age");  // 21, TypeScript knows return type is number
getProperty(user, "email"); // Compile-time error: "email" does not exist on type
```

`K extends keyof T` ensures that the key i'm passing actually exists on the object.

---

## Conclusion

Generics fixed something that used to genuinely frustrate me. I write the code once, TypeScript keeps it fully typed, and I never have to copy-paste logic just to handle a different data type. If you find yourself rewriting the same function twice, that's a sign Generics are what you need.