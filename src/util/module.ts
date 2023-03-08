import { Module } from "../types";
import { calcNodeHeight, columns, setColumns, getEdges, MARGIN, WIDTH } from ".";

export const buildModuleNodes = (module: Module) => {
    return Object.keys(module).filter((key) => {
        const array = module[key];
        return Array.isArray(array) && array.length;
    }).map((key) => {
        const array = module[key];

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
