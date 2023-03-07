import { Edge } from "reactflow";
import hclParser from "hcl2-parser";
import { buildModuleEdges, buildModuleNodes } from "./module";
import { buildResourceEdges, buildResourceNodes } from "./resource";
import { buildVariableEdges, buildVariableNodes } from "./variable";
import { buildLocalsEdges, buildLocalsNode } from "./locals";

export const MARGIN = 50;
export const MAX_COLUMNS = 3;
export const WIDTH = 400;

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

    if (!entry1 
        || (!entry1.module
            && !entry1.resource
            && !entry1.variable
            && !entry1.locals)) return [];

    setNewTop(MARGIN);

    const localsNode = entry1.locals ? buildLocalsNode(entry1.locals, newTop, column) : undefined;
    setColumn(0);
    const variableNodes = entry1.variable ? buildVariableNodes(entry1.variable, newTop, column) : [];
    setColumn(0);
    const moduleNodes = entry1.module ? buildModuleNodes(entry1.module, newTop, column) : [];
    setColumn(0);
    const resourceNodes = entry1.resource ? buildResourceNodes(entry1.resource, newTop, column) : [];

    return [...(localsNode ? [ localsNode ] : []), ...variableNodes, ...moduleNodes, ...resourceNodes];
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

    if (!entry1 
        || (!entry1.module
            && !entry1.resource
            && !entry1.variable
            && !entry1.locals)) return [];

    const localsEdges = entry1.locals ? buildLocalsEdges(entry1.locals) : [];
    const moduleEdges = entry1.module ? buildModuleEdges(entry1.module) : [];
    const resourceEdges = entry1.resource ? buildResourceEdges(entry1.resource) : [];
    const variableEdges = entry1.variable ? buildVariableEdges(entry1.variable) : [];

    return [...localsEdges, ...variableEdges, ...moduleEdges, ...resourceEdges];
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
                            if (variableParts[0] === "local") {
                                edges.push({
                                    id: `${parentKey}.${index}->${variableParts[0]}.${variableParts[1]}`,
                                    source: resourceKey,
                                    sourceHandle: `${parentKey}.${index}`,
                                    target: "local",
                                    targetHandle: `local.${variableParts[1]}`,
                                    animated: true
                                });
                            } else {
                                edges.push({
                                    id: `${parentKey}.${index}->${variableParts[0]}.${variableParts[1]}`,
                                    source: resourceKey,
                                    sourceHandle: `${parentKey}.${index}`,
                                    target: `${variableParts[0]}.${variableParts[1]}`,
                                    animated: true
                                });
                            }
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
                            if (variableParts[0] === "local") {
                                edges.push({
                                    id: `${parentKey}.${key}->${variableParts[0]}.${variableParts[1]}`,
                                    source: resourceKey,
                                    sourceHandle: `${parentKey}.${key}`,
                                    target: "local",
                                    targetHandle: `local.${variableParts[1]}`,
                                    animated: true,
                                });
                            } else {
                                edges.push({
                                    id: `${parentKey}.${key}->${variableParts[0]}.${variableParts[1]}`,
                                    source: resourceKey,
                                    sourceHandle: `${parentKey}.${key}`,
                                    target: `${variableParts[0]}.${variableParts[1]}`,
                                    animated: true,
                                });
                            }
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
    const result: string[] = [];

    for (const match of value.matchAll(regex)) {
        // only consider matches not preceded by a period
        if (match && match.index && match.index > 0 && value[match.index - 1] === ".") {
            continue;
        }
        result.push(match[1]);
    }

    return result;
}
