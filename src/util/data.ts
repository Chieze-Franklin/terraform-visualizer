import { Data } from "../types";
import { calcNodeHeight, column, getEdges, MARGIN, MAX_COLUMNS, newTop, setColumn, setNewTop, WIDTH } from ".";

export const buildDataNodes = (d: Data, top: number, col: number) => {
    setNewTop(top);
    setColumn(col);

    return Object.keys(d).map((key) => {
        const innerEntry = d[key];

        const data = Object.keys(innerEntry).filter((innerKey) => {
            const array = innerEntry[innerKey];
            return Array.isArray(array) && array.length;
        }).reduce((aggregate: Record<string, Record<string, any>>, innerKey) => {
            const array = innerEntry[innerKey];
            const d = array[0];
            aggregate[innerKey] = d;
            return aggregate;
        }, {});

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
            id: `data.${key}`,
            type: 'data',
            data: { label: key, data },
            position: { x, y }
        });
    }).flat();
}

export const buildDataEdges = (d: Data) => {
    return Object.keys(d).map((key) => {
        const innerEntry = d[key];

        const data = Object.keys(innerEntry).filter((innerKey) => {
            const array = innerEntry[innerKey];
            return Array.isArray(array) && array.length;
        }).reduce((aggregate: Record<string, Record<string, any>>, innerKey) => {
            const array = innerEntry[innerKey];
            const d = array[0];
            aggregate[innerKey] = d;
            return aggregate;
        }, {});

        return getEdges(data, `data.${key}`, `data.${key}`);
    }).flat();
}
