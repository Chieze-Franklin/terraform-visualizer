import React from "react";
import { Handle, Position } from "reactflow";

const ROW_HEIGHT = 20;
const TOP_OFFSET = 50;

type NodeContentProps = {
    id: string | undefined;
    data: any;
    showTargetHandles?: boolean;
};

export const NodeContent = (props: NodeContentProps) => {
    let objClasses = [`content-row-object-a`, `content-row-object-b`];
    let row = -1;
    const { id, data, showTargetHandles } = props;

    const getContent = (data: any, key?: string, fullKey?: string) => {
        row++;

        if (typeof data === "bigint" ||
        typeof data === "boolean" ||
        typeof data === "number" ||
        typeof data === "string" ||
        typeof data === "undefined" ||
        data === null) {
            return (<React.Fragment key={key}>
            <div className="content-row">
                {key ? `${key}: ` : ""}
                <span className={`content-row-value content-row-value-${typeof data}`} title={`${data}`}>{`${data}`}</span>
            </div>
            {fullKey && showTargetHandles ? <Handle
                type="target"
                id={`${id}.${fullKey}`}
                position={Position.Left}
                isConnectable={false}
                style={{ top: (ROW_HEIGHT * row) + (ROW_HEIGHT / 2) + TOP_OFFSET }}
            /> : null}
            {fullKey ? <Handle
                type="source"
                id={`${id}.${fullKey}`}
                position={Position.Right}
                isConnectable={false}
                style={{ top: (ROW_HEIGHT * row) + (ROW_HEIGHT / 2) + TOP_OFFSET }}
            /> : null}
            </React.Fragment>);
        } else if (typeof data === "object") {
            const objClass = objClasses.shift();
            objClasses.push(objClass!);
            return (<React.Fragment key={key}>
            <div className={`content-row-object ${objClass}`}>
                {key ? <div className="content-row-object-title" title={`${key}: `}>{`${key}: `}</div> : null}
                {fullKey && showTargetHandles ? <Handle
                    type="target"
                    id={`${id}.${fullKey}`}
                    position={Position.Left}
                    isConnectable={false}
                    style={{ top: (ROW_HEIGHT * row) + (ROW_HEIGHT / 2) + TOP_OFFSET }}
                /> : null}
                {Array.isArray(data)
                ? data.map((value, index) => getContent(value, `${index}`, `${fullKey}.${index}`))
                : Object.keys(data).map((k) => getContent(data[k], k, `${fullKey}.${k}`))}
            </div>
            </React.Fragment>);
        }

        return <div>&lt;&lt;unknown property&gt;&gt;</div>;
    }

    return (<div className="content">
        {Object.keys(data?.data).map((key) => {
          const value = data?.data[key];
          return getContent(value, key, key);
        })}
    </div>)
}
