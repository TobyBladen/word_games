import {
    calculateScore,
    capitalizeFirstLetter,
    createNamedLetterMap,
    logWordScore,
    trimFileExtension,
} from './word-games.functions';

describe('word-games.functions', () => {
    describe('calculateScore', () => {
        const englishScrabbleMap = createNamedLetterMap('english', 'scrabble');

        it('returns 0 if the word is an empty string', () => {
            const score = calculateScore(englishScrabbleMap, '');

            expect(score).toBe(0);
        });

        it('throws if the word contains an unsupported character', () => {
            expect(() => calculateScore(englishScrabbleMap, 'één')).toThrow();
            expect(() =>
                calculateScore(englishScrabbleMap, 'こんにちは')
            ).toThrow();
        });

        it('returns the score for the word in the game', () => {
            expect(calculateScore(englishScrabbleMap, 'banana')).toBe(8);
            expect(calculateScore(englishScrabbleMap, 'cat')).toBe(5);
            expect(calculateScore(englishScrabbleMap, 'qi')).toBe(11);
            expect(calculateScore(englishScrabbleMap, 'trees')).toBe(5);
            expect(calculateScore(englishScrabbleMap, 'za')).toBe(11);
        });
    });

    describe('capitalizeFirstLetter', () => {
        it('returns an empty string if passed an empty string', () => {
            expect(capitalizeFirstLetter('')).toEqual('');
        });

        it('returns a capitalized character if passed a single character', () => {
            expect(capitalizeFirstLetter('a')).toEqual('A');
        });

        it('returns the word unchanged if the first letter is already capitalized', () => {
            expect(capitalizeFirstLetter('A')).toEqual('A');
            expect(capitalizeFirstLetter('Letter')).toEqual('Letter');
            expect(capitalizeFirstLetter('IT')).toEqual('IT');
        });

        it('capitalizes the first letter of the word', () => {
            expect(capitalizeFirstLetter('word')).toEqual('Word');
            expect(capitalizeFirstLetter('wORD')).toEqual('WORD');
        });
    });

    describe('createNamedLetterMap', () => {
        it('throws if the language is not supported', () => {
            expect(() => createNamedLetterMap('chinese', 'scrabble')).toThrow();
        });

        it('throws if the game is not supported', () => {
            expect(() =>
                createNamedLetterMap('chinese', 'backgammon')
            ).toThrow();
        });

        it('generates a letter map with the name of the game', () => {
            const englishScrabbleMap = createNamedLetterMap(
                'english',
                'scrabble'
            );

            const englishWordfeudMap = createNamedLetterMap(
                'english',
                'wordfeud'
            );

            expect(englishScrabbleMap.name).toEqual('scrabble');
            expect(englishWordfeudMap.name).toEqual('wordfeud');

            expect(englishScrabbleMap.map.get('a')).toBe(1);
            expect(englishWordfeudMap.map.get('a')).toBe(1);

            expect(englishScrabbleMap.map.get('b')).toBe(3);
            expect(englishWordfeudMap.map.get('b')).toBe(4);

            expect(englishScrabbleMap.map.get('z')).toBe(10);
            expect(englishWordfeudMap.map.get('z')).toBe(10);
        });
    });

    describe('logWordScore', () => {
        it('builds and logs a string telling the score', () => {
            spyOn(console, 'log');

            logWordScore('qi', 11, 'scrabble');

            expect(console.log).toHaveBeenCalledOnceWith(
                'The word QI is worth 11 points in Scrabble'
            );
        });
    });

    describe('trimFileExtension', () => {
        it('returns the filename unchanged if it has no file extension', () => {
            expect(trimFileExtension('readme')).toBe('readme');
        });

        it('returns the filename minus file extension', () => {
            expect(trimFileExtension('package.json')).toBe('package');
            expect(trimFileExtension('cat.jpg')).toBe('cat');
            expect(trimFileExtension('shopping-list.txt')).toBe(
                'shopping-list'
            );
        });
    });
});
