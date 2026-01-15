/**
 * EECS 498 Lab 02
 * Union Types & Exhaustiveness Checking
 *
 * BIG IDEA:
 *   Union types let you say: value is ONE of several known shapes.
 *   Then "narrowing" lets you safely use the right fields.
 *
 * WHY EXHAUSTIVENESS MATTERS:
 *   If you add a new variant later, you want the compiler to force you
 *   to update every place that handles the union.
 *
 * We'll do that using `never` and an assertNever helper.
 */

type Circle = { kind: "circle"; radius: number };
type Rect = { kind: "rect"; w: number; h: number };
type Shape = Circle | Rect;

function assertNever(x: never): never {
  throw new Error("Unexpected object: " + JSON.stringify(x));
}

/**
 * EXERCISE 1: area
 *
 * Implement area using a switch on s.kind.
 * Requirements:
 *   - Handle each kind
 *   - Default case should be assertNever(s) so compiler checks exhaustiveness
 */
function area(s: Shape): number {
  // TODO
  void s;
  return 0; // WRONG on purpose
}

/**
 * EXERCISE 2: describeShape
 *
 * Return a string:
 *   circle(r=2)
 *   rect(3x4)
 *
 * Use narrowing (switch or if).
 */
function describeShape(s: Shape): string {
  // TODO
  void s;
  return "shape"; // WRONG on purpose
}

/**
 * EXERCISE 3 (optional extension):
 * Add Triangle as a third variant and update:
 *   - Shape union
 *   - area
 *   - describeShape
 *
 * The point:
 *   With assertNever, TS should FORCE you to update these functions.
 */

// type Triangle = { kind: "tri"; base: number; height: number };
// type Shape = Circle | Rect | Triangle;

function main() {
  const shapes: Shape[] = [
    { kind: "circle", radius: 2 },
    { kind: "rect", w: 3, h: 4 },
  ];

  console.log("areas:", shapes.map(area).join(",")); // expect: 12.566370614359172,12
  console.log("descs:", shapes.map(describeShape).join(" | ")); // expect: circle(r=2) | rect(3x4)
}

main();
