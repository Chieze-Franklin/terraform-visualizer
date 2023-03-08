import { Locals } from "../types";
import { calcNodeHeight, columns, getEdges, MARGIN, setColumns, WIDTH } from ".";

export const buildLocalsNode = (locals: Locals) => {
    const data = locals[0];

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
        id: 'local',
        type: 'locals',
        data: { label: 'locals', data },
        position: { x, y }
    });
}

export const buildLocalsEdges = (locals: Locals) => {
    const data = locals[0];

    return getEdges(data, 'local', 'local');
}
