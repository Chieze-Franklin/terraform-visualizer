import React, { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";

const ROW_HEIGHT = 20;
const TOP_OFFSET = 50;

const ResourceNode = ({
  id,
  data,
}: Partial<NodeProps>) => {
  let row = -1;
  let objClasses = [`content-row-object-a`, `content-row-object-b`];

  const getContent = (data: any, key?: string, fullKey?: string) => {
    row++;

    if (typeof data === "bigint" ||
    typeof data === "boolean" ||
    typeof data === "number" ||
    typeof data === "string" ||
    typeof data === "undefined") {
      return (<React.Fragment key={key}>
        {/* <Handle
          type="target"
          id={`${id}.${key}`}
          position={Position.Left}
          isConnectable={isConnectable}
          style={{top: ...}}
        /> */}
        <div className="content-row">{key ? `${key}: ` : ""}<span className={`content-row-value-${typeof data}`}>{`${data}`}</span></div>
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
          {key ? <div className="content-row-object-title">{`${key}: `}</div> : null}
          {Array.isArray(data)
          ? data.map((value, index) => getContent(value, `${index}`, `${fullKey}.${index}`))
          : Object.keys(data).map((k) => getContent(data[k], k, `${fullKey}.${k}`))}
        </div>
      </React.Fragment>);
    }

    return <div>&lt;unknown property&gt;</div>;
  }

  return (
    <>
      <Handle
        type="target"
        id={id}
        position={Position.Top}
        isConnectable={false}
      />
      <div className="title">{data?.label}</div>
      <div className="content">
        {Object.keys(data?.data).map((key) => {
          const value = data?.data[key];
          return getContent(value, key, key);
        })}
      </div>
    </>
  );
};

ResourceNode.displayName = "ResourceNode";

export default memo(ResourceNode);
