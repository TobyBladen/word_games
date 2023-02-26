import { existsSync, readFileSync } from 'fs';
import { Map as ImmutableMap } from 'immutable';
import { createInterface, Interface, ReadLineOptions } from 'readline';

import { NamedLetterMap } from './named-letter-map.types';

export const calculateScore = (
    letterMap: NamedLetterMap,
    word: string
): number => {
    if (!word) {
        return 0;
    }

    return [...word].reduce((a, b) => {
        const letterPointValue = letterMap.map.get(b);

        if (!letterPointValue) {
            throw new TypeError(
                `Character '${b}' is not supported in game '${letterMap.name}'`
            );
        }

        return a + letterPointValue;
    }, 0);
};

export const capitalizeFirstLetter = (text: string): string => {
    return `${text.charAt(0).toUpperCase()}${text.slice(1)}`;
};

export const createReadlineInterface = (): Interface => {
    const interfaceOptions: ReadLineOptions = {
        input: process.stdin,
        output: process.stdout,
    };

    return createInterface(interfaceOptions);
};

export const createNamedLetterMap = (
    language: string,
    game: string
): NamedLetterMap => {
    const path = `languages/${language}/${game}.json`;

    if (!existsSync(path)) {
        throw new TypeError(`Path '${path}' does not exist`);
    }

    const rawJson = readFileSync(path).toString();
    const mapObject: Record<string, number> = JSON.parse(rawJson);

    if (!mapObject) {
        throw new TypeError(`File at path '${path}' is invalid`);
    }

    return { name: game, map: ImmutableMap(mapObject) };
};

export const logWordScore = (
    word: string,
    score: number,
    game: string
): void => {
    const upperCaseWord = word.toUpperCase();
    const capitalizedGame = capitalizeFirstLetter(game);

    console.log(
        `The word ${upperCaseWord} is worth ${score} points in ${capitalizedGame}`
    );
};

export const read = (
    readlineInterface: Interface,
    question: string
): Promise<string> => {
    return new Promise<string>((resolve) => {
        readlineInterface.question(question, resolve);
    });
};

export const trimFileExtension = (file: string): string =>
    file.split('.')[0] as string;
