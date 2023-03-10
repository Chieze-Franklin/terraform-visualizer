import React, { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { NodeContent } from "./NodeContent";

const ResourceNode = ({
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
        <svg width="12px" height="12px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd">
          <path d="m0 0h32v32h-32z"/>
          <path d="m20.5358984 2.14359354c2.1435935 0 4.1243556 1.14359354 5.1961524 3l4.5358984 7.85640646c1.0717968 1.8564065
            1.0717968 4.1435935 0 6l-4.5358984 7.8564065c-1.0717968 1.8564064-3.0525589 3-5.1961524 3h-9.0717968c-2.14359352
            0-4.12435564-1.1435936-5.19615241-3l-4.53589838-7.8564065c-1.07179677-1.8564065-1.07179677-4.1435935
            0-6l4.53589838-7.85640646c1.07179677-1.85640646 3.05255889-3 5.19615241-3zm-4.5358984 7.85640646c-3.3137085
            0-6 2.6862915-6 6s2.6862915 6 6 6 6-2.6862915 6-6-2.6862915-6-6-6zm0 2c2.209139 0 4 1.790861 4 4s-1.790861
            4-4 4-4-1.790861-4-4 1.790861-4 4-4z" fill="white"/>
          </g>
        </svg>
          {" "}
          {data?.label}
      </div>
      <NodeContent id={id} data={data} />
    </>
  );
};

ResourceNode.displayName = "ResourceNode";

export default memo(ResourceNode);
