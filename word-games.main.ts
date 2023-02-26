import { existsSync, promises } from 'fs';

import { NamedLetterMap } from './named-letter-map.types';
import {
    calculateScore,
    createNamedLetterMap,
    createReadlineInterface,
    logWordScore,
    read,
    trimFileExtension,
} from './word-games.functions';

const main = async (): Promise<void> => {
    const readlineInterface = createReadlineInterface();
    const answer = await read(readlineInterface, 'Please enter a language: ');
    const selectedLanguage = answer.toLowerCase();

    if (!existsSync(`languages/${selectedLanguage}`)) {
        console.error(`Language '${answer}' is not supported`);
        readlineInterface.close();
        return;
    }

    const word = await read(readlineInterface, 'Please enter your word: ');

    if (!word) {
        console.error('Invalid word');
        readlineInterface.close();
        return;
    }

    const files = await promises.readdir(`languages/${selectedLanguage}`);
    const filenames = files.map(trimFileExtension);

    const letterMaps: readonly NamedLetterMap[] = filenames.map((filename) =>
        createNamedLetterMap(selectedLanguage, filename)
    );

    letterMaps.forEach((letterMap) => {
        try {
            const score = calculateScore(letterMap, word);
            logWordScore(word, score, letterMap.name);
        } catch (e: unknown) {
            console.error(`ERROR: ${(e as TypeError).message}`);
        }
    });

    readlineInterface.close();
};

main();
