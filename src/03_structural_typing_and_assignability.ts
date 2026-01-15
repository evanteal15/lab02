/**
 * EECS 498 Lab 02
 * Structural Typing + Assignability
 *
 * BIG IDEA:
 *   TypeScript is STRUCTURALLY typed:
 *     "If it has the right shape, it fits."
 *
 * That is different from nominal typing (e.g. Java/C++):
 *   - In nominal systems, the *name* of the type/class matters
 *   - In structural TS, the *properties* matter
 *
 * This file focuses on:
 *   - Passing objects based on shape
 *   - “Excess property checks” (object literal gotchas)
 *   - Type guards (narrowing unknown safely)
 *   - Generic constraints (assignability in practice)
 */

//////////////////////////////
// Part 1: Structural Typing
//////////////////////////////

type HasName = { name: string };

function greet(x: HasName): string {
  return `Hello, ${x.name}!`;
}

/**
 * EXERCISE 1:
 * Make this compile WITHOUT changing greet and WITHOUT using `as any`.
 *
 * What’s going on?
 *   TypeScript sometimes performs "excess property checks" on object literals.
 *   Even though {name, age} clearly *has* a name property, TS can complain when
 *   directly passing an object literal to a function expecting a smaller shape.
 *
 * Fix options (pick ONE):
 *   - Assign the object literal to a variable first
 *   - Use the `satisfies` operator
 *   - Give the object a type annotation that widens it
 */
function exercise1(): string {
  // TODO: remove `as any` and fix properly
  const msg = greet({ name: "Ada", age: 20 } as any); // WRONG on purpose
  return msg;
}

class Person {
  constructor(public name: string) {}
}
class Robot {
  constructor(public name: string, public serial: number) {}
}

function takesHasName(x: HasName): string {
  return x.name.toUpperCase();
}

/**
 * EXERCISE 2:
 * Remove casts and make this type-check naturally.
 *
 * Why this should work:
 *   Person has a `name: string` -> matches HasName structurally.
 *   Robot also has a `name: string` -> matches HasName structurally.
 */
function exercise2(): string {
  // TODO: remove `as any` casts
  const p = new Person("Grace");
  const r = new Robot("R2D2", 42);
  return takesHasName(p as any) + "|" + takesHasName(r as any); // WRONG on purpose
}

/**
 * EXERCISE 3:
 * Implement a SAFE type guard for HasName.
 *
 * Why do we need this?
 *   - Unknown data might come from JSON, user input, network, etc.
 *   - TS types do not exist at runtime, so you must check runtime values yourself.
 *
 * Requirements:
 *   - return true only if x is a non-null object
 *   - and it has a property `name` whose runtime type is string
 */
function isHasName(x: unknown): x is HasName {
  // TODO: implement safe runtime check
  return true; // WRONG on purpose (unsound)
}

function exercise3(): string {
  const inputs: unknown[] = [
    { name: "Linus" },
    { name: 123 },
    null,
    { nope: "hi" },
  ];

  return inputs.map((x) => (isHasName(x) ? greet(x) : "No name")).join(" / ");
}

//////////////////////////////
// Part 2: Assignability
//////////////////////////////

type HasId = { id: string };
type User = { id: string; name: string };

/**
 * EXERCISE 4: pluckId
 *
 * Make pluckId type-safe by constraining T:
 *   pluckId should accept any object with an `id: string` property.
 *
 * That is structural typing again:
 *   it doesn't need to be User; it just needs to "have id: string".
 *
 * Hint:
 *   function pluckId<T extends HasId>(x: T): string { ... }
 */
function pluckId<T>(x: T): string {
  // TODO: remove any-cast by adding a generic constraint
  return (x as any).id; // WRONG on purpose
}

/**
 * EXERCISE 5: indexUsersById
 *
 * Build a dictionary from id -> user.
 *
 * Notes:
 *   Record<string, User> is a common TS way to represent dictionaries.
 *   You may assume ids are unique for this lab.
 */
function indexUsersById(users: User[]): Record<string, User> {
  // TODO: implement
  return {}; // WRONG on purpose
}

class Session {
  constructor(public id: string, public createdAtMs: number) {}
}

function formatId(x: HasId): string {
  return `id=${x.id}`;
}

function main() {
  console.log("exercise1:", exercise1()); // expect: Hello, Ada!
  console.log("exercise2:", exercise2()); // expect: GRACE|R2D2
  console.log("exercise3:", exercise3()); // expect: Hello, Linus! / No name / No name / No name

  console.log("pluckId:", pluckId({ id: "u1", name: "Ada" })); // expect: u1

  const users: User[] = [
    { id: "u1", name: "Ada" },
    { id: "u2", name: "Grace" },
  ];
  const dict = indexUsersById(users);
  console.log("dict u2:", dict["u2"].name); // expect: Grace

  // Session is a class instance, but structurally it fits HasId because it has `id: string`
  const s = new Session("sesh-123", Date.now());
  console.log("formatId:", formatId(s)); // expect: id=sesh-123
}

main();
