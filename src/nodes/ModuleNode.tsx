import React, { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";

const ROW_HEIGHT = 20;
const TOP_OFFSET = 50;

const ModuleNode = ({
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
        <div className="content-row">
          {key ? `${key}: ` : ""}
          <span className={`content-row-value content-row-value-${typeof data}`} title={`${data}`}>{`${data}`}</span>
        </div>
        {fullKey ? <Handle
          type="source"
          id={`${id}.${fullKey}`}
          position={Position.Left}
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
        {/* <svg width="12px" height="12px" viewBox="0 0 1024 1024" className="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg">
            <path d="M896 32h-256a96 96 0 0 0-96 96v256a96 96 0 0 0 96 96h256a96 96 0 0 0 96-96V128a96 96 0 0 0-96-96z m32 352a32
            32 0 0 1-32 32h-256a32 32 0 0 1-32-32V128a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32zM64 224a32 32 0 0 0 12.16-2.56
            37.12 37.12 0 0 0 10.56-6.72 32 32 0 0 0 6.72-34.88 32 32 0 0 0-6.72-10.56A32 32 0 0 0 57.6 160a20.8 20.8 0 0 0-5.76
            1.92 23.68 23.68 0 0 0-5.76 2.88l-4.8 3.84a32 32 0 0 0-6.72 10.56A32 32 0 0 0 32 192a32 32 0 0 0 32 32zM149.76 128a32
            32 0 0 0 17.6-5.44 160 160 0 0 1 115.2-24.32 32 32 0 1 0 10.56-64 225.92 225.92 0 0 0-160 34.24A32 32 0 0 0 149.76
            128zM377.92 104a32 32 0 0 0-2.56 45.12A160 160 0 0 1 416 256v128a32 32 0 0 1-32 32H256a160 160 0 0 1-150.72-106.56 32
            32 0 0 0-60.16 21.44A224 224 0 0 0 256 480h128a96 96 0 0 0 96-96V256a224 224 0 0 0-56.96-149.44 32 32 0 0
            0-45.12-2.56zM896 544h-256a96 96 0 0 0-96 96v256a96 96 0 0 0 96 96h256a96 96 0 0 0 96-96v-256a96 96 0 0 0-96-96z m32
            352a32 32 0 0 1-32 32h-256a32 32 0 0 1-32-32v-256a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32zM384 544H128a96 96 0 0 0-96
            96v256a96 96 0 0 0 96 96h256a96 96 0 0 0 96-96v-256a96 96 0 0 0-96-96z m32 352a32 32 0 0 1-32 32H128a32 32 0 0
            1-32-32v-256a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32z" fill="white" />
        </svg> */}
        <svg fill="white" width="12px" height="12px" viewBox="-1 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="m20.952 18.5-9.714 5.5v-4.286l6.048-3.334zm.666-.595v-11.52l-3.548 2.071v7.381l3.548 2.048zm-20.952.595 9.714
            5.5v-4.286l-6.048-3.334zm-.666-.595v-11.52l3.548 2.071v7.381zm.405-12.262 9.976-5.643v4.143l-6.429 3.548zm20.809
            0-9.976-5.643v4.143l6.428 3.548zm-10.833 13.095-5.972-3.287v-6.524l5.976 3.452zm.857 0 5.976-3.286v-6.524l-5.976
            3.452zm-6.429-10.548 6-3.31 6 3.31-6 3.453z"/>
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

ModuleNode.displayName = "ModuleNode";

export default memo(ModuleNode);
