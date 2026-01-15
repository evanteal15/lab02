# lab01

## Setup

Clone this repository. For example:

```console
cd ~/eecs498apsd/labs # or wherever you want to put labs
git clone git@github.com:eecs498-software-design/lab02.git # different url if you want to use https instead
```

Then, open the cloned repo in VS Code or another IDE.

From a terminal, run `npm install`.

IMPORTANT: Make sure to disable AI features for this lab, as Copilot will just try to fill out the exercises
without giving you a chance to think through them yourself!

Go to `File > Preferences > Settings` on Windows or `Code > Preferences > Settings` on macOS, then search
for "Disable AI". Check the box.

## Exercises

Closely read through each file in the `src/` folder in order.

The comments introduce TypeScript fundamentals alongside code examples.

In each file, you'll find some `// EXERCISE` comments. Follow the instructions
to complete each exercise.

## Checking Your Work

To check your work, run the following:

```console
npm run test
```

This will run each of the exercise files, storing your output in individual files in the `output/` directory.

Then, it diffs against sample solutions in `solution/`. Once you've finished the exercises, the diff should
complete with no differences found. If you're missing something, take a look at the output, or compare
individual files (e.g. `output/01_variables_and_types.txt` vs. `solution/01_variables_and_types.txt`) using
the integrated VS Code diff tool (select both files, then right-click and choose "Compare Selected").
