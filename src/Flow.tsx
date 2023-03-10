import React from "react";
import { useCallback, useEffect } from "react";
import ReactFlow, {
  Node,
  addEdge,
  Background,
  MiniMap,
  Edge,
  Connection,
  Panel,
  useNodesState,
  useEdgesState,
} from "reactflow";

import DataNode from "./nodes/DataNode";
import LocalsNode from "./nodes/LocalsNode";
import ModuleNode from "./nodes/ModuleNode";
import ResourceNode from "./nodes/ResourceNode";
import VariableNode from "./nodes/VariableNode";
import VariablesNode from "./nodes/VariablesNode";
import { buildEdges, buildNodes, reset } from "./util";

import "reactflow/dist/style.css";
import { CustomControls } from "./controls/CustomControls";
import DropZoneModal from "./components/DropZoneModal";

const initialNodes: Node[] = [];

const initialEdges: Edge[] = [];

const nodeTypes = {
  data: DataNode,
  locals: LocalsNode,
  module: ModuleNode,
  resource: ResourceNode,
  variable: VariableNode,
  variables: VariablesNode
};

const nodeColor = (node: Node) => {
  switch (node.type) {
    case 'data':
      return '#f07706';
    case 'locals':
      return '#00340a';
    case 'module':
      return '#4a255f';
    case 'resource':
      return '#243690';
    case 'variable':
      return '#03881b';
    case 'variables':
      return '#03881b';
    default:
      return '#ff0072';
  }
};

type FlowProps = {
  content?: string | null;
  title?: string | null;
  integrated?: string | null
}

const BasicFlow = (props: FlowProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );
  const [terraformText, setTerraformText] = React.useState('');

  useEffect(() => {
    reset();
    setNodes([]);
    setEdges([]);
    const newNodes = buildNodes(terraformText || props.content || '');
    setNodes((curr) => [...curr, ...newNodes]);

    const newEdges = buildEdges(terraformText || props.content || '');
    setEdges((curr) => [...curr, ...newEdges]);
  }, [props.content, terraformText, setNodes, setEdges])

  const [openDZModal, setOpenDZModal] = React.useState(false);
  const handleOpenDZModal = () => setOpenDZModal(true);
  const handleCloseDZModal = () => setOpenDZModal(false);
  const handleFileUpload = (text: string) => setTerraformText(text);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView={true}
    >
      {props.title ? <Panel position="top-center">{props.title}</Panel> : null}
      <Background />
      <CustomControls
        showUploadDialog={!props.integrated}
        onUploadClick={handleOpenDZModal}
      />
      <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
      <DropZoneModal
        open={openDZModal}
        onClose={handleCloseDZModal}
        onUpload={handleFileUpload}
        />
    </ReactFlow>
  );
};

export default BasicFlow;
