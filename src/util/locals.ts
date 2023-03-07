import { Locals } from "../types";
import { column, getEdges, MARGIN, MAX_COLUMNS, newTop, setColumn, setNewTop, WIDTH } from ".";

export const buildLocalsNode = (locals: Locals, top: number, col: number) => {
    setNewTop(top);
    setColumn(col);

    const data = locals[0];
    const x = (column * (WIDTH + MARGIN)) + MARGIN;
    const y = top;

    // const h = calcNodeHeight(data) + MARGIN;
    // setNewTop(Math.max(newTop, top + h + MARGIN));

    setColumn(column + 1);
    if (column > MAX_COLUMNS) {
        setColumn(0);
        top = newTop;
    }

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
