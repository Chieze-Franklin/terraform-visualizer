import { Resource } from "../types";
import { calcNodeHeight, column, getEdges, MARGIN, MAX_COLUMNS, newTop, setColumn, setNewTop, WIDTH } from ".";

export const buildResourceNodes = (resource: Resource, top: number, col: number) => {
    setNewTop(top);
    setColumn(col);

    return Object.keys(resource).map((key) => {
        const innerEntry = resource[key];
        return Object.keys(innerEntry).filter((innerKey) => {
            const innerArray = innerEntry[innerKey];
            return Array.isArray(innerArray) && innerArray.length;
        }).map((innerKey) => {
            const innerArray = innerEntry[innerKey];

            const data = innerArray[0];
            const x = (column * (WIDTH + MARGIN)) + MARGIN;
            const y = top;

            const h = calcNodeHeight(data) + MARGIN;
            setNewTop(Math.max(newTop, top + h + MARGIN));

            setColumn(column + 1);
            if (column > MAX_COLUMNS) {
                setColumn(0);
                top = newTop;
            }

            return ({
                id: `${key}.${innerKey}`,
                type: 'resource',
                data: { label: `${innerKey} (${key})`, data },
                position: { x, y }
            });
        });
    }).flat();
}

export const buildResourceEdges = (resource: Resource) => {
    return Object.keys(resource).map((key) => {
        const innerEntry = resource[key];
        return Object.keys(innerEntry).filter((innerKey) => {
            const innerArray = innerEntry[innerKey];
            return Array.isArray(innerArray) && innerArray.length;
        }).map((innerKey) => {
            const innerArray = innerEntry[innerKey];

            const data = innerArray[0];

            return getEdges(data, `${key}.${innerKey}`, `${key}.${innerKey}`);
        }).flat();
    }).flat();
}
