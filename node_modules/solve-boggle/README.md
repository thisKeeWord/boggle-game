# Node Boggle Solver

### Using JavaScript to generate a Boggle board and then find every English word in that board. All the words are stored in a trie for efficiency. Use as a command line tool or a NodeJS module.

```
npm install solve-boggle
```


## Boggle solver module

You can supply the letters to the board in the constructor.
```javascript
const Boggle = require('solve-boggle');

let boggle = new Boggle('adofhptogijrstjg'); // letters for 4x4 board from left-to-right then top-to-bottem
boggle.solve(words => {
  boggle.print(); // format the board nicely
  // "words" is an array of the board's words. It is now also referenced as boggle.words
  console.log(words.length + ' words');
  console.log(words.join(', '));
});
```

The board can theoretically be any NxN size. This is efficient enough to handle 200x200 boards in less than a second. They can be generated randomly from the boggle dice if N is between 4 and 6 inclusive.
```javascript
const Boggle = require('solve-boggle');

let boggle1 = new Boggle('CLEINRTSHBNFAOUIEERGTPUNE'); // 5x5 board
let boggle2 = new Boggle('sdjgneraghpareugnaeporigrpeouganerkgjarpehgaeraetusnviehtvndjfgd'); // 8x8 board

let boggle3 = new Boggle(6); // roll the dice for a 6x6 board
let boggle4 = new Boggle(5);
let boggle5 = new Boggle(); // defaults to 4
```

Check for individual words in the board.
```javascript
let boggle = new Boggle('eorgvregearjkgoe');
boggle.contains('grave', result => {
  console.log(result); // true
});
boggle.contains('randomstuff', result => {
  console.log(result); // false
});
```

## Boggle solver CLI

The argument to the command is the same as the argument you would be giving to the Boggle constructor function.
```bash
node_modules/.bin/solve-boggle erogijeratierstp
```

```
┌───┬───┬───┬───┐
│ E │ R │ O │ G │
├───┼───┼───┼───┤
│ I │ J │ E │ R │
├───┼───┼───┼───┤
│ A │ T │ I │ E │
├───┼───┼───┼───┤
│ R │ S │ T │ P │
└───┴───┴───┴───┘

103 words

AIR, ATE, ART, ERE, EGO, ERG, ETA, GET, GEE, IRE, ITS, JAR, JOG, JET, ORE, PER, PIS, PIT, PEE, PET, PIE, RAT, REP, RIP, ROE, SIP, SIR, SIT, SAT, TEE, TAR, TIP, TIE, TIT, ARTS, ERGO, GRIP, GRIT, GORE, GETS, JEEP, JEER, JETS, JARS, OGRE, PETS, PIER, PITS, PITA, PEER, RATE, RATS, RIPE, RITE, REIS, SATE, STIR, SIRE, STAR, SITE, STEP, TITS, TSAR, TARS, TIRO, TIRE, TIER, ASTER, ASTIR, EERIE, EGRET, GRIST, GRITS, GREET, GRIPE, ROGER, STEER, SITAR, STAIR, STEEP, TASTE, ATTIRE, ARTIER, ARTIST, EGRETS, GREETS, GORIER, PETITE, RASTER, REGRET, RETIRE, SATIRE, SITTER, STEREO, TASTER, ARTSIER, ARTISTE, PETTIER, REGRETS, RATTIER, TASTIER, GRITTIER, JITTERIER
```


Instead, you can install globally...
```bash
npm install -g solve-boggle
```

and invoke the command like this.
```bash
solve-boggle erogijeratierstp
```

## Documentation
<a name="Boggle"></a>
<a name="Boggle"></a>
## Boggle
Class representing a Boggle board.

**Kind**: global class  

* [Boggle](#Boggle)
    * [new Boggle([boardParam])](#new_Boggle_new)
    * _instance_
        * [.print()](#Boggle+print)
        * [.toString()](#Boggle+toString)
        * [.solve(done)](#Boggle+solve)
        * [.contains(target, done)](#Boggle+contains)
    * _inner_
        * [~solveCallback](#Boggle..solveCallback) : <code>function</code>
        * [~containsCallback](#Boggle..containsCallback) : <code>function</code>

<a name="new_Boggle_new"></a>
### new Boggle([boardParam])
Create an NxN board.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [boardParam] | <code>string</code> &#124; <code>number</code> | <code>4</code> | Either a string with the board's letters (left-to-right top-to-bottom), or a size N. |

<a name="Boggle+print"></a>
### boggle.print()
Format the board as a string and write to stdout.

**Kind**: instance method of <code>[Boggle](#Boggle)</code>  
<a name="Boggle+toString"></a>
### boggle.toString()
Convert the board to a string.

**Kind**: instance method of <code>[Boggle](#Boggle)</code>  
<a name="Boggle+solve"></a>
### boggle.solve(done)
Finds all English words in the board.

**Kind**: instance method of <code>[Boggle](#Boggle)</code>  

| Param | Type | Description |
| --- | --- | --- |
| done | <code>[solveCallback](#Boggle..solveCallback)</code> | Callback to run when done solving. |

<a name="Boggle+contains"></a>
### boggle.contains(target, done)
Finds one English word in the board.

**Kind**: instance method of <code>[Boggle](#Boggle)</code>  

| Param | Type | Description |
| --- | --- | --- |
| target | <code>string</code> | Word to search for in the board. |
| done | <code>[containsCallback](#Boggle..containsCallback)</code> | Callback to run when done verifying. |

<a name="Boggle..solveCallback"></a>
### Boggle~solveCallback : <code>function</code>
Callback to run when done solving.

**Kind**: inner typedef of <code>[Boggle](#Boggle)</code>  

| Param | Type | Description |
| --- | --- | --- |
| words | <code>array</code> | Array of the words in the board. |

<a name="Boggle..containsCallback"></a>
### Boggle~containsCallback : <code>function</code>
Callback to run when done verifying.

**Kind**: inner typedef of <code>[Boggle](#Boggle)</code>  

| Param | Type | Description |
| --- | --- | --- |
| found | <code>boolean</code> | Whether or not the word was found in the board. |

