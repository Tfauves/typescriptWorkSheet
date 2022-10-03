

// // arrays

// let numbers: number[] = [1, 2, 3];


// // Tuples are fixed-length arrays where each element has a specific type. 
// // We often use them for representing two or three related values. 

// let user: [number, string] = [1, "jasper"];

// // Enums represent a list of related constants.
// // enums a list of related consts complier can set the value based on what is provided. 
// // if sm was left undefined it would have been initaialized at 0.
// // declaring the enum as const generates less js code after compile but is not needed.

// const enum Size {Small = 1, Medium, Large};
// let mySize: Size = Size.Medium;
// console.log(mySize);

// // functions
// // functions should be properly annotated
// // In TypeScript, we set the type of our variables by annotating them
// function calculateTax(income: number, taxYear = 2022) : number {
//     if (taxYear < 2022) {
//         return income * 1.2;
//     }
//     return income * 1.3;
// }

// // to call this function you must supply the required args
// // unless a ? is add to the param to make it optional 
// // or a default value can be declared
// calculateTax(10_000, 2023);

// // objects
// let employee: {
//     readonly id: number,
//     name: string,
//     retire: (date: Date) => void
// } = {
//     id: 1,
//     name: 'Jasper',
//     retire: (date: Date) => {
//         console.log(date);
//     }
// }

// // using a type alias we can define a custom type

// type Employee = {
//     // we will define all the properties and methods an employee obj should have
//     readonly id: number,
//     name: string,
//     retire: (date: Date) => void
// }

// // Then the obj can be defined
// let newEmployee: Employee = {
//     id: 1,
//     name: 'Jasper',
//     retire: (date: Date) => {
//         console.log(date);
//     }
// }

// // classes for oop with typescript
  
//     // using the readonly keyword allows for this property to only be set in the constructor
//     // other access modifiers public, private, protected
//     // ? optional allows for this property to be assigned outside of the constructor or not at all
// class Account {
//     nickname?: string;
//     //  constructor with parameter properties
//     constructor(
//         public readonly id: number, 
//         public owner: string, 
//         private _balance: number) {}

//     deposit(amount: number): void {
//         if (amount <= 0)
//             throw new Error('invalid amt')

//         // this.balance += amount;
//     }

//     // getter method
//     get balance(): number {
//         return this._balance;
//     }

//     // setter method
//     set balance(value: number) {
//         if(value < 0) throw new Error('Invalid value');
//         this._balance = value;

//     }

// }

// // to instantiate a object
// let account = new Account(1, 'me', 0);
// account.deposit(100);
// console.log(account.balance);



// // union types
// // with union types we can give a variable or a function prama of more than 1 type

// function kgToLbs(weight: number | string) {
//     // narrowing
//     if (typeof weight === 'number') {
//         return weight * 2.2;
//     } else {
//         return parseInt(weight) * 2.2;
//     }

// }

// // function call
// kgToLbs(10);
// kgToLbs('10kg');

// // intersection types 
// // creating an obj that is comprised of two different types

// type Draggable = {
//     drag: () => void
// };

// type Resizeable = {
//     resize: () => void
// };

// type UIWidget = Draggable & Resizeable;
// let textBox: UIWidget = {
//     drag: () => {},
//     resize: () => {}
// }

// // Literal type
// // limit the values we can assign to a variable
// // annotating a Literal(exact, specific value)
// let quantity: 50 | 100 = 100;

// // create a custom type using a type alias

// // index signatures create properties dynamically
// class SeatAssignment {
//     // index signature property
//     [seatNumber: string]: string;
// }

// // create obj
// let seats = new SeatAssignment();
// // set seats with dot notation
// seats.A1 = 'jasper';
// // or with the [] notation
// seats['A1'] = 'jasper';

// static memebers 
// static properties belong to a class and not an obj so that there is only one instance of a property in memory
class Ride {
    private static _activeRides: number = 0; 

    start() { Ride._activeRides++; }
    stop() { Ride._activeRides--; }

    static get activeRides() {
        return Ride._activeRides;
    }
}

let ride1 = new Ride();
ride1.start();

let ride2 = new Ride();
ride2.start();

// console.log(Ride.activeRides);


// inheritance
class Person {
    constructor(public firstName: string, public lastName: string) {}
    
    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }

    walk() {
        console.log("walking");
    }
}
// using the extends keyword to inherate from a parent class
class Student extends Person {
    // must include the properties from the super but do not include the access modifiers
    constructor(public studentId: number, firstName: string, lastName: string) {
        super(firstName, lastName);
    }

    takeTest() {
        console.log("this test is hard");
        
    }
}

let student = new Student(1, "Jasper", "Canine");

// method overriding to change the implmentation of a method

class Teacher extends Person {
    // no constructor because not adding any properties instead we will override the get fullname method

    override get fullName() {
        return "Prof. " + super.fullName;
        
    }

}

// let teacher = new Teacher("John", "Smith");
// console.log(teacher.fullName);

// polymorphism obj takes many different forms

////// Open Closed Principle //////
// States That Classes should be open for extension and closed for modification.

class Principal extends Person {
    override get fullName(): string {
        return "Principal " + super.fullName;
    }
} 

printNames([
    new Student(1, "Jasper", "Canine"),
    new Teacher("Travis", "John"),
    new Principal("Richard", "Dasterly")
])

function printNames(people: Person[]) {
    for (let person of people)
    console.log(person.fullName);
    
}

// Abstract classes and methods
abstract class Shape {
    constructor(public color: string){}
// add abstrct keyword remove the impl {} and define a return type void
    abstract render(): void;
}

class Circle extends Shape {
    constructor(public radius: number, color: string) {
        super(color);
    }

    override render(): void {
        console.log('Rendering a Circle');
        
    }
}

// In TypeScript, interfaces and type aliases can be used interchangeably. 
// Both can be used to describe the shape of an object
// It’s more conventional to use an interface in front of the extends keyword, though. 

// abstract class Calendar {
//     constructor(public name: string) {}
    
//     abstract addEvent(): void;
//     abstract removeEvent(): void;
// }

interface Calendar {
    name: string;
    addEvent(): void;
    removeEvent(): void;
}

interface CloudCalendar extends Calendar {
    sync(): void;
}

class myCalendar implements Calendar {
    constructor(public name: string) {}

    addEvent(): void {
        throw new Error("Method not implemented.");
    }
    removeEvent(): void {
        throw new Error("Method not implemented.");
    }

}
