import { Map as ImmutableMap } from 'immutable';

export type NamedLetterMap = Readonly<{
    name: string;
    map: ImmutableMap<string, number>;
}>;
