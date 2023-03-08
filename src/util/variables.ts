import { Variable } from "../types";
import { calcNodeHeight, columns, setColumns, getEdges, MARGIN, WIDTH } from ".";

export const buildVariablesNode = (variable: Variable) => {
    const data = Object.keys(variable).filter((key) => {
        const array = variable[key];
        return Array.isArray(array) && array.length;
    }).reduce((aggregate: Record<string, Record<string, any>>, key) => {
        const array = variable[key];
        const d = array[0];
        aggregate[key] = d;
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
        id: 'var',
        type: 'variables',
        data: { label: 'variables', data },
        position: { x, y }
    });
}

export const buildVariablesEdges = (variable: Variable) => {
    const data = Object.keys(variable).filter((key) => {
        const array = variable[key];
        return Array.isArray(array) && array.length;
    }).reduce((aggregate: Record<string, Record<string, any>>, key) => {
        const array = variable[key];
        const d = array[0];
        aggregate[key] = d;
        return aggregate;
    }, {});

    return getEdges(data, 'var', 'var');
}
