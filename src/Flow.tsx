import { useCallback, useEffect } from "react";
import ReactFlow, {
  Node,
  addEdge,
  Background,
  Controls,
  Edge,
  Connection,
  Panel,
  useNodesState,
  useEdgesState
} from "reactflow";

import ResourceNode from "./nodes/ResourceNode";
import { buildResourceEdges, buildResourceNodes } from "./util";

import "reactflow/dist/style.css";

const initialNodes: Node[] = [];

const initialEdges: Edge[] = [];

const nodeTypes = {
  resource: ResourceNode
};

const BasicFlow = (props: { content?: string | null, title?: string | null }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  useEffect(() => {
    if (props.content) {
        const newNodes = buildResourceNodes(props.content);
        setNodes((curr) => [...curr, ...newNodes]);

        const newEdges = buildResourceEdges(props.content);
        setEdges((curr) => [...curr, ...newEdges]);
    }
  }, [props.content, setNodes, setEdges])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
    >
      {props.title ? <Panel position="top-center">{props.title}</Panel> : null}
      <Background />
      <Controls />
    </ReactFlow>
  );
};

export default BasicFlow;
