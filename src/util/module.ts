import { Module } from "../types";
import { calcNodeHeight, column, getEdges, MARGIN, MAX_COLUMNS, newTop, setColumn, setNewTop } from ".";

export const buildModuleNodes = (module: Module, top: number, col: number) => {
    setNewTop(top);
    setColumn(col);

    return Object.keys(module).filter((key) => {
        const array = module[key];
        return Array.isArray(array) && array.length;
    }).map((key) => {
        const array = module[key];

        const data = array[0];
        const WIDTH = 400;
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
            id: `module.${key}`,
            type: 'module',
            data: { label: key, data },
            position: { x, y }
        });
    });
}

export const buildModuleEdges = (module: Module) => {
    return Object.keys(module).filter((key) => {
        const array = module[key];
        return Array.isArray(array) && array.length;
    }).map((key) => {
        const array = module[key];

        const data = array[0];

        return getEdges(data, `module.${key}`, `module.${key}`);
    }).flat();
}
