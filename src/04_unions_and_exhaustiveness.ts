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
  // TODO: implement area using a switch on s.kind
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
  // TODO: implement describeShape using a switch on s.kind
  void s;
  return "shape"; // WRONG on purpose
}

/**
 * EXERCISE 3: Adding a new variant and seeing exhaustiveness in action
 *
 * STEP 1: Uncomment the Triangle type and update the Shape union
 *   - Uncomment line 76: `type Triangle = { kind: "tri"; base: number; height: number };`
 *   - Uncomment line 77: `type Shape = Circle | Rect | Triangle;`
 *   - Comment out or remove the old Shape definition on line 18
 *
 * STEP 2: Observe TypeScript errors
 *   After uncommenting, you should see TypeScript errors in:
 *   - The `area` function (around line 40 in the default case)
 *   - The `describeShape` function (around line 61 in the default case)
 *
 *   Error message will be something like:
 *     "Argument of type 'Triangle' is not assignable to parameter of type 'never'."
 *     or
 *     "Type 'Triangle' is not assignable to type 'never'."
 *
 *   Where the error appears:
 *     - In `area`: on the line `return assertNever(s);` in the default case
 *     - In `describeShape`: on the line `return assertNever(s);` in the default case
 *
 *   What this means:
 *     - TypeScript knows that `s` could be a Triangle
 *     - But your switch statements only handle "circle" and "rect"
 *     - The default case calls `assertNever(s)`, which expects `never`
 *     - Since Triangle is not handled, `s` in the default case is still Triangle (not never)
 *     - This is TypeScript FORCING you to handle all cases!
 *     - The error will NOT go away until you add a case for "tri" in both functions
 *
 * STEP 3: Fix the errors by adding Triangle cases
 *   In `area` function:
 *     - Add a case for "tri"
 *
 *   In `describeShape` function:
 *     - Add a case for "tri"
 *
 * STEP 4: Verify exhaustiveness
 *   - After adding the Triangle cases, the errors should disappear
 *   - This proves that TypeScript is checking exhaustiveness!
 *   - If you miss a case, TypeScript will catch it at compile time
 *
 * The point:
 *   With assertNever, TypeScript FORCES you to update these functions when
 *   you add a new variant. This prevents bugs where you forget to handle a new case!
 */

// TODO: Uncomment these lines to start Exercise 3
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
