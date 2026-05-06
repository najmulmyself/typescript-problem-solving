function filterEvenNumbers(arr: number[]): number[] {
  return arr.filter((num) => num % 2 === 0);
}

function reverseString(str: string): string {
  let output = "";
  for (let i = str.length - 1; i >= 0; i--) {
    output += str[i];
  }
  return output;
}

type StringOrNumber = string | number;

function checkType(inp: StringOrNumber): StringOrNumber {
  if (typeof inp === "string") {
    return "String";
  } else {
    return "Number";
  }
}

function getProperty<T>(obj: T, key: keyof T): unknown {
  return obj[key];
}

interface Book {
  title: string;
  author: string;
  publishedYear: number;
}

function toggleReadStatus<T extends Book>(obj: T) {
  return {
    ...obj,
    isRead: true,
  };
}

class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

class Student extends Person {
  grade: string;

  constructor(name: string, age: number, grade: string) {
    super(name, age);
    this.grade = grade;
  }

  getDetails(): string {
    return `"Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}"`;
  }
}

function getIntersection(arr1: number[], arr2: number[]): number[] {
  return arr1.filter((value) => arr2.includes(value));
}
