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

import ModuleNode from "./nodes/ModuleNode";
import ResourceNode from "./nodes/ResourceNode";
import VariableNode from "./nodes/VariableNode";
import { buildEdges, buildNodes } from "./util";

import "reactflow/dist/style.css";

const initialNodes: Node[] = [];

const initialEdges: Edge[] = [];

const nodeTypes = {
  module: ModuleNode,
  resource: ResourceNode,
  variable: VariableNode
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
        const newNodes = buildNodes(props.content);
        setNodes((curr) => [...curr, ...newNodes]);

        const newEdges = buildEdges(props.content);
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
