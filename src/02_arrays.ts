/**
 * EECS 498 Lab 02
 * Arrays In Depth
 *
 * BIG IDEA:
 *   Arrays are objects. Passing an array to a function passes a reference to the same array.
 *
 * KEY CONCEPTS:
 *   - "Pure" function: does not mutate its inputs, only returns new data
 *   - In-place function: intentionally mutates its input (and should be named/documented clearly)
 *
 * WHAT YOU WILL DO:
 *   1) Make appendPure truly pure
 *   2) Make removeFirstInPlace actually mutate
 *   3) Fix a subtle impurity bug in sumPure
 */

// EXERCISE 1: appendPure should return a NEW array with x appended, without mutating input.
function appendPure(xs: number[], x: number): number[] {
  // TODO: return a new array (do not call xs.push)
  // Hint: [ ...xs, x ] creates a new array
  xs.push(x); // WRONG on purpose
  return xs;
}

// EXERCISE 2: removeFirstInPlace should mutate the array by removing the first element.
function removeFirstInPlace(xs: number[]): void {
  // TODO: mutate xs to remove the first element
  // Hint: xs.shift()
  void xs; // WRONG on purpose
}

// EXERCISE 3: sumPure must be pure (must not mutate xs).
function sumPure(xs: number[]): number {
  // TODO: remove impurity
  //
  // Why is this currently impure?
  //   Sorting an array in JS mutates it in place.
  //   Even if sorting doesn't "change the sum", it changes the caller's array order.
  //
  // Fix strategy:
  //   - either iterate without sorting
  //   - or sort a COPY (e.g. const ys = [...xs].sort(...))
  xs.sort((a, b) => a - b); // WRONG on purpose: mutates input
  let total = 0;
  for (const x of xs) total += x;
  return total;
}

function main() {
  const a = [1, 2, 3];
  const b = appendPure(a, 4);

  console.log("a:", a.join(",")); // expect: 1,2,3
  console.log("b:", b.join(",")); // expect: 1,2,3,4

  const c = [10, 20, 30];
  removeFirstInPlace(c);
  console.log("c after removeFirstInPlace:", c.join(",")); // expect: 20,30

  const d = [3, 1, 2];
  const s = sumPure(d);
  console.log("sum:", s); // expect: 6
  console.log("d unchanged:", d.join(",")); // expect: 3,1,2
}

main();
