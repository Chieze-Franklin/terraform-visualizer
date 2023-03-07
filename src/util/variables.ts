import { Variable } from "../types";
import { calcNodeHeight, column, getEdges, MARGIN, MAX_COLUMNS, newTop, setColumn, setNewTop, WIDTH } from ".";

export const buildVariablesNode = (variable: Variable, top: number, col: number) => {
    setNewTop(top);
    setColumn(col);

    const data = Object.keys(variable).filter((key) => {
        const array = variable[key];
        return Array.isArray(array) && array.length;
    }).reduce((aggregate: Record<string, any>, key) => {
        const array = variable[key];
        const d = array[0];
        aggregate[key] = d;
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
    }).reduce((aggregate: Record<string, any>, key) => {
        const array = variable[key];
        const d = array[0];
        aggregate[key] = d;
        return aggregate;
    }, {});

    return getEdges(data, 'var', 'var');
}
