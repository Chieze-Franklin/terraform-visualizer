import { Edge } from "reactflow";
import hclParser from "hcl2-parser";
import { buildModuleEdges, buildModuleNodes } from "./module";
import { buildResourceEdges, buildResourceNodes } from "./resource";

export const MARGIN = 50;
export const MAX_COLUMNS = 3;

export let newTop = 0;
export const setNewTop = (top: number) => newTop = top;

export let column = 0;
export const setColumn = (col: number) => column = col;

export const buildNodes = (content: string) => {
    const json = hclParser.parseToObject(content);
    console.log(json);

    let entry1: any = {};
    if (Array.isArray(json)) {
        entry1 = json[0];
    } else {
        entry1 = json;
    }

    if (!entry1 || (!entry1.module && !entry1.resource)) return [];

    setNewTop(MARGIN);

    const moduleNodes = entry1.module ? buildModuleNodes(entry1.module, newTop, column) : [];
    setColumn(0);
    const resourceNodes = entry1.resource ? buildResourceNodes(entry1.resource, newTop, column) : [];

    return moduleNodes.concat(resourceNodes);
}

export const calcNodeHeight = (data: any) => {
    let h = 0;

    if (
        typeof data === "bigint" ||
        typeof data === "boolean" ||
        typeof data === "number" ||
        typeof data === "string" ||
        typeof data === "undefined" ||
        data === null) {
        h += 20;
    } else if (typeof data === "object") {
        h += 20; // for the object/array title
        if (Array.isArray(data)) {
            data.forEach((value) => {
                h += calcNodeHeight(value);
            });
        } else {
            Object.keys(data).forEach((key) => {
                const value = data[key];
                h += calcNodeHeight(value);
            });
        }
    }

    return h;
}

export const buildEdges = (content: string) => {
    const json = hclParser.parseToObject(content);

    let entry1: any = {};
    if (Array.isArray(json)) {
        entry1 = json[0];
    } else {
        entry1 = json;
    }

    if (!entry1 || (!entry1.resource && !entry1.module)) return [];

    const moduleEdges = entry1.module ? buildModuleEdges(entry1.module) : [];
    const resourceEdges = entry1.resource ? buildResourceEdges(entry1.resource) : [];

    return moduleEdges.concat(resourceEdges);
}

export const getEdges = (data: any, resourceKey: string, parentKey: string) => {
    let edges: Edge[] = [];

    if (Array.isArray(data)) {
        data.forEach((value, index) => {
            if (typeof value === "string") {
                if (value.includes('${') && value.includes('}')) {
                    const variables = getVariableRefs(value);
                    variables.forEach((variable) => {
                        const variableParts = variable.split('.');
                        if (variableParts.length >= 2) {
                            edges.push({
                                id: `${parentKey}.${index}->${variableParts[0]}.${variableParts[1]}`,
                                source: resourceKey,
                                sourceHandle: `${parentKey}.${index}`,
                                target: `${variableParts[0]}.${variableParts[1]}`,
                                animated: true
                            });
                        }
                    });
                }
            } else if (typeof value === "object") {
                edges = edges.concat(getEdges(value, resourceKey, `${parentKey}.${index}`));
            }
        });
    } else if (typeof data === "object" && data !== null) {
        Object.keys(data).forEach((key) => {
            const value = data[key];

            if (typeof value === "string") {
                if (value.includes('${') && value.includes('}')) {
                    const variables = getVariableRefs(value);
                    variables.forEach((variable) => {
                        const variableParts = variable.split('.');
                        if (variableParts.length >= 2) {
                            edges.push({
                                id: `${parentKey}.${key}->${variableParts[0]}.${variableParts[1]}`,
                                source: resourceKey,
                                sourceHandle: `${parentKey}.${key}`,
                                target: `${variableParts[0]}.${variableParts[1]}`,
                                animated: true,
                            });
                        }
                    });
                }
            } else if (typeof value === "object") {
                edges = edges.concat(getEdges(value, resourceKey, `${parentKey}.${key}`));
            }
        });
    }

    return edges;
}

const getVariableRefs = (value: string) => {
    const regex = new RegExp(/([\w-]+[.][\w-]+)/g);
    const result = [];

    for (const match of value.matchAll(regex)) {
        // only consider matches not preceded by a period
        if (match && match.index && match.index > 0 && value[match.index - 1] === ".") {
            continue;
        }
        result.push(match[1]);
    }

    return result;
}
