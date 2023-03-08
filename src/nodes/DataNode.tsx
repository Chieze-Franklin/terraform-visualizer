import React, { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";

const ROW_HEIGHT = 20;
const TOP_OFFSET = 50;

const DataNode = ({
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
        <svg width="12px" height="12px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd">
          <path d="M512 0C250.733601 0 46.039591 111.952387 46.039591 254.906974v514.053564c0 142.954587 204.69401 254.906974
          465.960409 254.906974s465.960409-111.952387 465.960409-254.906974v-514.053564C977.827921 111.952387 773.266399 0 512
          0zM125.53241 508.224091c0-20.535645 9.009186-41.07129 26.762583-61.209471 5.696985-6.359426 8.74421-14.176219
          9.671626-21.993013 84.792341 52.465261 209.066115 85.057317 350.033381 85.057317 139.642386 0 263.121232-32.062104
          347.781084-83.599949 1.589856 6.491914 4.504593 12.586363 9.274162 17.885885 19.475741 21.065597 29.279855 42.528658
          29.279856 63.991719 0 82.937508-158.720662 175.414154-386.46759 175.414155S125.53241 591.161599 125.53241
          508.224091zM512 79.492819c227.746927 0 386.46759 92.476646 386.46759 175.414155S739.746927 430.453616 512 430.453616
          125.53241 337.97697 125.53241 254.906974 284.253073 79.492819 512 79.492819z m0 865.014362C284.253073 944.507181
          125.53241 852.030534 125.53241 768.960538c0-20.535645 9.009186-41.07129 26.762583-61.209471 7.41933-8.479234
          10.599043-19.210765 9.804114-29.544831 84.792341 52.332773 209.066115 84.924829 349.900893 84.924829 139.112434 0
          262.061327-31.797128 346.72118-82.937508 0.529952 8.876698 3.842153 17.753396 10.334066 24.775262 19.475741 21.065597
          29.279855 42.528658 29.279856 63.991719 0 83.069996-158.588174 175.546643-386.335102 175.546643z" fill="white"/>
          </g>
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

DataNode.displayName = "DataNode";

export default memo(DataNode);