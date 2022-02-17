import { filter, omit, some, toLower } from 'lodash';

export const objectStringSearch = <T extends object>(collection: T[], text: string = '', exclude: string[] = []) =>
  filter(collection, object => some(omit(object, exclude), (string: any) => toLower(string).includes(toLower(text))));
