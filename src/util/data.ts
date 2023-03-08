import { Data } from "../types";
import { calcNodeHeight, columns, setColumns, getEdges, MARGIN, WIDTH } from ".";

export const buildDataNodes = (d: Data) => {
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

        const column = columns.reduce((acc, col) => {
            if (col.top <= acc.top) {
                return col;
            }
            return acc;
        }, columns[0]);
        const x = (column.col * (WIDTH + MARGIN)) + MARGIN;
        const y = column.top;

        const h = calcNodeHeight(data) + MARGIN;
        setColumns({ col: column.col, top: column.top + h + MARGIN });

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
