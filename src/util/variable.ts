import { Variable } from "../types";
import { calcNodeHeight, column, getEdges, MARGIN, MAX_COLUMNS, newTop, setColumn, setNewTop, WIDTH } from ".";

export const buildVariableNodes = (variable: Variable, top: number, col: number) => {
    setNewTop(top);
    setColumn(col);

    return Object.keys(variable).filter((key) => {
        const array = variable[key];
        return Array.isArray(array) && array.length;
    }).map((key) => {
        const array = variable[key];

        const data = array[0];
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

        return getEdges(data, `module.${key}`, `module.${key}`);
    }).flat();
}
