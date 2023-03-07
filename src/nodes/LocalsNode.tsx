import React, { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";

const ROW_HEIGHT = 20;
const TOP_OFFSET = 50;

const LocalsNode = ({
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
    typeof data === "undefined" ||
    data === null) {
      return (<React.Fragment key={key}>
        <div className="content-row">
          {key ? `${key}: ` : ""}
          <span className={`content-row-value content-row-value-${typeof data}`} title={`${data}`}>{`${data}`}</span>
        </div>
        {fullKey ? <Handle
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
          {fullKey ? <Handle
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

  return (
    <>
      <Handle
        type="target"
        id={id}
        position={Position.Top}
        isConnectable={false}
      />
      <div className="title" title={data?.label}>
        <svg width="12px" height="12px" viewBox="0 0 52 52" className="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M45,2H7C4.2,2,2,4.2,2,7V45c0,2.7,2.2,5,5,5H45c2.7,0,5-2.2,5-5V7C50,4.2,47.8,2,45,2z M42.6,41.4L42.6,41.4
	        c-0.1,0.6-0.7,1.1-1.4,1.1h-31c-0.6,0-1.1-0.6-1.1-1.3V10.6c0-0.6,0.6-1.1,1.3-1.1h31c0.6,0,1.1,0.6,1.1,1.3V41.4z" fill="white" />
            <path d="M33,22.4c1,0,3.1-0.8,3.1-3.6c0-2.8-2-2.9-2.6-2.9c-1.2,0-2.4,0.9-3.5,2.7c-1.1,1.9-2.3,3.9-2.3,3.9l0,0
            c-0.3-1.3-0.5-2.4-0.6-2.9c-0.2-1.1-1.5-3.6-4.3-3.6c-2.7,0-5.2,1.6-5.2,1.6l0,0c-0.5,0.3-0.8,0.8-0.8,1.4c0,0.9,0.7,1.7,1.7,1.7
            c0.3,0,0.5-0.1,0.7-0.2l0,0c0,0,2.1-1.2,2.5,0c0.1,0.3,0.2,0.7,0.4,1.1c0.5,1.8,1,3.9,1.4,5.8l-1.8,2.6c0,0-2-0.7-3.1-0.7
            s-3.1,0.8-3.1,3.6s2,2.9,2.6,2.9c1.2,0,2.4-0.9,3.5-2.7c1.1-1.9,2.3-3.9,2.3-3.9c0.4,1.7,0.6,3.1,0.8,3.6c0.7,1.9,2.2,3.1,4.3,3.1
            c0,0,2.1,0,4.7-1.4c0.6-0.2,1-0.8,1-1.5c0-0.9-0.7-1.7-1.7-1.7c-0.3,0-0.5,0.1-0.7,0.2l0,0c0,0-1.8,1-2.4,0.2
            c-0.4-0.8-0.8-2-1.1-3.3c-0.3-1.2-0.6-2.7-0.8-4.1l1.8-2.6C30,21.7,32,22.4,33,22.4z" fill="white" />
        </svg>
        {" "}
        {data?.label}
      </div>
      <div className="content">
        {Object.keys(data?.data).map((key) => {
          const value = data?.data[key];
          return getContent(value, key, key);
        })}
      </div>
    </>
  );
};

LocalsNode.displayName = "LocalsNode";

export default memo(LocalsNode);
