import { pickBy } from 'lodash';

export function extractProps<All extends object, Extracting extends {}>(
    props: All & Extracting,
    validKeyList: string[],
): Extracting {
    return pickBy(props, (_, key) => validKeyList.indexOf(key) !== -1) as Extracting;
}
