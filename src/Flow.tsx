import { useCallback, useEffect } from "react";
import ReactFlow, {
  Node,
  addEdge,
  Background,
  Controls,
  Edge,
  Connection,
  useNodesState,
  useEdgesState
} from "reactflow";

import CustomNode from "./CustomNode";
import ResourceNode from "./nodes/ResourceNode";
import { buildResourceEdges, buildResourceNodes } from "./util";

import "reactflow/dist/style.css";

const initialNodes: Node[] = [
  // {
  //   id: "1",
  //   type: "input",
  //   data: { label: "Load Balancer" },
  //   position: { x: 250, y: 5 }
  // },
  // { id: "2", data: { label: "Instance 1" }, position: { x: 400, y: 100 } },
  // { id: "3", data: { label: "Instance 2" }, position: { x: 700, y: 100 } },
  // {
  //   id: "4",
  //   type: "custom",
  //   data: { label: "Node 4" },
  //   position: { x: 400, y: 200 }
  // }
];

const initialEdges: Edge[] = [
  // { id: "e1-2", source: "aws_instance.instance_1", target: "aws_security_group.instances", animated: true },
  // { id: "e1-3", source: "aws_route53_record.root", target: "aws_lb.load_balancer", animated: true },
  // { id: "e1-4", source: "aws_lb.load_balancer", target: "data.aws_subnet_ids", animated: true },
  // { id: "e1-5", source: "aws_lb.load_balancer", target: "aws_security_group.alb", animated: true }
];

const nodeTypes = {
  custom: CustomNode,
  resource: ResourceNode
};

const BasicFlow = (props: { t: string | null | undefined }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((els) => addEdge(params, els)),
    [setEdges]
  );

  useEffect(() => {
    if (props.t) {
        const newNodes = buildResourceNodes(props.t);
        setNodes((curr) => [...curr, ...newNodes]);

        const newEdges = buildResourceEdges(props.t);
        setEdges((curr) => [...curr, ...newEdges]);
    }
  }, [props.t])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
};

export default BasicFlow;
