import { filter, omit, some, toLower } from 'lodash';

export const fullObjectTextSearch = <T extends object>(collection: T[], text: string = '', exclude: string[] = []) => {
  text = toLower(text);
  return filter(collection, object => some(omit(object, exclude), (string: any) => toLower(string).includes(text)));
};
