import { Resource } from "../types";
import { calcNodeHeight, columns, setColumns, getEdges, MARGIN, WIDTH } from ".";

export const buildResourceNodes = (resource: Resource) => {
    return Object.keys(resource).map((key) => {
        const innerEntry = resource[key];
        return Object.keys(innerEntry).filter((innerKey) => {
            const innerArray = innerEntry[innerKey];
            return Array.isArray(innerArray) && innerArray.length;
        }).map((innerKey) => {
            const innerArray = innerEntry[innerKey];

            const data = innerArray[0];

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
