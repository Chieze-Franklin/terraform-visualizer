import { Edge } from "reactflow";

export const buildResourceNodes = (t: string) => {
    const json = JSON.parse(t);

    let entry1: any = {};
    if (Array.isArray(json)) {
        entry1 = json[0];
    } else {
        entry1 = json;
    }

    if (!entry1 || !entry1.resource) return [];

    const MARGIN = 50;
    let top = MARGIN;
    let newTop = MARGIN;
    let col = 0;
    const maxCols = 3;

    return Object.keys(entry1.resource).map((key) => {
        const innerEntry = entry1.resource[key];
        return Object.keys(innerEntry).filter((innerKey) => {
            const innerArray = innerEntry[innerKey];
            return Array.isArray(innerArray) && innerArray.length;
        }).map((innerKey) => {
            const innerArray = innerEntry[innerKey];

            const data = innerArray[0];
            const WIDTH = 400;
            const x = (col * (WIDTH + MARGIN)) + MARGIN;
            const y = top;

            const h = calcHeight(data) + MARGIN;
            newTop = Math.max(newTop, top + h + MARGIN);

            col++;
            if (col > maxCols) {
                col = 0;
                top = newTop;
            }

            return ({
                id: `${key}.${innerKey}`,
                type: 'resource',
                data: { label: `${innerKey} (${key})`, data },
                position: { x, y }
            });
        });
    }).flat();
}

const calcHeight = (data: any) => {
    let h = 0;

    if (
        typeof data === "bigint" ||
        typeof data === "boolean" ||
        typeof data === "number" ||
        typeof data === "string" ||
        typeof data === "undefined") {
        h += 20;
    } else if (typeof data === "object") {
        h += 20; // for the object title
        if (Array.isArray(data)) {
            data.forEach((value) => {
                h += calcHeight(value);
            });
        } else {
            Object.keys(data).forEach((key) => {
                const value = data[key];
                h += calcHeight(value);
            });
        }
    }

    return h;
}

export const buildResourceEdges = (t: string) => {
    const json = JSON.parse(t);

    let entry1: any = {};
    if (Array.isArray(json)) {
        entry1 = json[0];
    } else {
        entry1 = json;
    }

    if (!entry1 || !entry1.resource) return [];

    return Object.keys(entry1.resource).map((key) => {
        const innerEntry = entry1.resource[key];
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

const getEdges = (data: any, resourceKey: string, parentKey: string) => {
    let edges: Edge[] = [];

    if (Array.isArray(data)) {
        data.forEach((value, index) => {
            if (typeof value === "string") {
                if (value.startsWith('${') && value.endsWith('}')) {
                    const innerVal = value.substring(2, value.length - 1);
                    const innerValParts = innerVal.split('.');
                    if (innerValParts.length >= 2) {
                        edges.push({
                            id: `${parentKey}.${index}->${innerValParts[0]}.${innerValParts[1]}`,
                            source: resourceKey,
                            sourceHandle: `${parentKey}.${index}`,
                            target: `${innerValParts[0]}.${innerValParts[1]}`,
                            animated: true
                        });
                    }
                }
            } else if (typeof value === "object") {
                edges = edges.concat(getEdges(value, resourceKey, `${parentKey}.${index}`));
            }
        });
    } else {
        Object.keys(data).forEach((key) => {
            const value = data[key];

            if (typeof value === "string") {
                if (value.startsWith('${') && value.endsWith('}')) {
                    const innerVal = value.substring(2, value.length - 1);
                    const innerValParts = innerVal.split('.');
                    if (innerValParts.length >= 2) {
                        edges.push({
                            id: `${parentKey}.${key}->${innerValParts[0]}.${innerValParts[1]}`,
                            source: resourceKey,
                            sourceHandle: `${parentKey}.${key}`,
                            target: `${innerValParts[0]}.${innerValParts[1]}`,
                            animated: true
                        });
                    }
                }
            } else if (typeof value === "object") {
                edges = edges.concat(getEdges(value, resourceKey, `${parentKey}.${key}`));
            }
        });
    }

    return edges;
}
