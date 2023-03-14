import React, { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { NodeContent } from "./NodeContent";

const VariableNode = ({
  id,
  data,
}: Partial<NodeProps>) => {
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
            <path d="M42.6,17.8c2.4,0,7.2-2,7.2-8.4c0-6.4-4.6-6.8-6.1-6.8c-2.8,0-5.6,2-8.1,6.3c-2.5,4.4-5.3,9.1-5.3,9.1
            l-0.1,0c-0.6-3.1-1.1-5.6-1.3-6.7c-0.5-2.7-3.6-8.4-9.9-8.4c-6.4,0-12.2,3.7-12.2,3.7l0,0C5.8,7.3,5.1,8.5,5.1,9.9
            c0,2.1,1.7,3.9,3.9,3.9c0.6,0,1.2-0.2,1.7-0.4l0,0c0,0,4.8-2.7,5.9,0c0.3,0.8,0.6,1.7,0.9,2.7c1.2,4.2,2.4,9.1,3.3,13.5l-4.2,6
            c0,0-4.7-1.7-7.1-1.7s-7.2,2-7.2,8.4s4.6,6.8,6.1,6.8c2.8,0,5.6-2,8.1-6.3c2.5-4.4,5.3-9.1,5.3-9.1c0.8,4,1.5,7.1,1.9,8.5
            c1.6,4.5,5.3,7.2,10.1,7.2c0,0,5,0,10.9-3.3c1.4-0.6,2.4-2,2.4-3.6c0-2.1-1.7-3.9-3.9-3.9c-0.6,0-1.2,0.2-1.7,0.4l0,0
            c0,0-4.2,2.4-5.6,0.5c-1-2-1.9-4.6-2.6-7.8c-0.6-2.8-1.3-6.2-2-9.5l4.3-6.2C35.5,16.1,40.2,17.8,42.6,17.8z" fill="white" />
        </svg>
        {" "}
        {data?.label}
      </div>
      <NodeContent id={id} data={data} />
    </>
  );
};

VariableNode.displayName = "VariableNode";

export default memo(VariableNode);
