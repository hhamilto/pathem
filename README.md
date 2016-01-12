# Pathem solver
*not affiliated with Pathem (r) in any way shape or form.

This is a solver for pathem puzzles. You can learn more about the puzzles here: www.Pathem.com

## Usage
This solver operates by reading in a puzzle specification. It then solves the puzzle and outputs the answer

### Input specification
Puzzles are read from standard in, but I recomend encoding the puzzle you wish to solve in a file. For an example, see puzzle1.

The puzzle is specified in two parts. 

The first part is the board, where '.'s are free, empty spaces, and '#'s are filled in black spaces where no letters may be placed. All other characters are assumed to be part of the puzzle.

The two parts are separated by a blank line.

The second part is the phrase, and is written out.

example:

    ..#
    ..h
    #..
    ...

    Three Beds, Two Baths

### Running the solver with a puzzle file

Pipe the puzzle into the solvers standard in:

    $ node solver.js < puzzle1

### Output
Upon finding the solution, the solver will print out the filled in board, followed by a blank line, followed by a listing of posistions to trace that will yeild back the phrase.

example:

    d,r,#
    e,s,h
    #,b,t
    o,w,a

    2,2
    1,2
    0,1
    1,0
    1,0
    2,1
    1,0
    0,0
    1,1
    2,2
    3,1
    3,0
    2,1
    3,2
    2,2
    1,2
    1,1
    1,1
