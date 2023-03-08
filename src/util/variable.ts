import { Variable } from "../types";
import { calcNodeHeight, columns, setColumns, getEdges, MARGIN, WIDTH } from ".";

export const buildVariableNodes = (variable: Variable) => {
    return Object.keys(variable).filter((key) => {
        const array = variable[key];
        return Array.isArray(array) && array.length;
    }).map((key) => {
        const array = variable[key];

        const data = array[0];

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
            id: `var.${key}`,
            type: 'variable',
            data: { label: key, data },
            position: { x, y }
        });
    });
}

export const buildVariableEdges = (variable: Variable) => {
    return Object.keys(variable).filter((key) => {
        const array = variable[key];
        return Array.isArray(array) && array.length;
    }).map((key) => {
        const array = variable[key];

        const data = array[0];

        return getEdges(data, `var.${key}`, `var.${key}`);
    }).flat();
}
