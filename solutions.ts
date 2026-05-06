function filterEvenNumbers(numbersArray: number[]): number[] {
  return numbersArray.filter((num) => num % 2 === 0);
}

function reverseString(str: string): string {
  let output = "";
  for (let i = str.length - 1; i >= 0; i--) {
    output += str[i];
  }
  return output;
}

type StringOrNumber = string | number;

function checkType(input: StringOrNumber): StringOrNumber {
  if (typeof input === "string") {
    return "String";
  } else {
    return "Number";
  }
}

function getProperty<T>(object: T, key: keyof T): unknown {
  return object[key];
}

interface Book {
  title: string;
  author: string;
  publishedYear: number;
}

function toggleReadStatus<T extends Book>(book: T) {
  return {
    ...book,
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

function getIntersection(
  firstArray: number[],
  secondArray: number[],
): number[] {
  return firstArray.filter((value) => secondArray.includes(value));
}
