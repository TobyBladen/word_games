# Word games

## Motivation and Purpose

_Scrabble_ and _Wordfeud_ are two highly similar, popular word games.
They involve combining letters with different point values to make a valid word.
Both games are available in English and Dutch, and I enjoy playing them in both languages.
However, the scoring is slightly different based on which game you are playing and
in which language. This can be confusing. To make it easier to see
how many points a word is worth based on the game/language combination, I made this simple tool.
It was mainly intended for my own convenience, but I decided to share it on GitHub
in case someone else finds it useful.

## Language

The tool is a simple node console app using the TypeScript language.

## Usage

First, install dependencies:

`npm i`

Compile the TypeScript files:

`npm run build`

You can then run the compiled app:

`npm run score`

You will be prompted to enter a language and your word.
The tool will then tell you how many points your word is worth in _Scrabble_ and _Wordfeud_.

If you like, you can also lint the files:

`npm run lint`

or run unit tests:

`npm run test`

## Sample Output

    npm run score

    > score
    > node dist/word-games.main.js

    Please enter a language: english
    Please enter your word: code
    The word CODE is worth 7 points in Scrabble
    The word CODE is worth 8 points in Wordfeud

## Limitations

The tool does not attempt to validate if the word you input really exists.
The user themselves is responsible for checking if their word is present
in the _Scrabble_ / _Wordfeud_ dictionaries.

Additionally, the tool at present only supports the English and Dutch languages,
even though the games are available in more. This is because I developed the tool
for my own personal use and I only like to play in English and Dutch. It would be
trivially easy to add further languages, so I am open to the idea of doing this in future.

## About me

I am a software developer living in Leiden, the Netherlands.
I have over 3 years full-time, professional experience working with TypeScript.

## Copyright

Copyright Toby Bladen, 2023.
