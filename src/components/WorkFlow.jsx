import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Sidebar from './SideBar';
import '../styles/index.css';

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = ({ data }) => {
    // console.log(data)
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(
        [
            {
                id: '1',
                type: 'input',
                data: { label: '=>  Input', },
                style: {},
                position: { x: 50, y: 5 },
            },
        ]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const onConnect = useCallback((params) => {
        // console.log(params.target)
        const newNodes = [...nodes].map(node => {
            // console.log(node)
            if (node.id == params.target) {
                node.style = {}
            }
            return node;
        })
        setNodes(newNodes)
        setEdges((eds) => addEdge(params, eds)), []
    });

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const module = event.dataTransfer.getData('application/reactflow');
            const inputType = module[0];
            const name = module.substring(1);

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            const newNode = {
                id: getId(),
                type: 'default',
                style: { border: '1px solid red' },
                position,
                data: { label: `${inputType} || ${name} || ${name[1]}` },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance]
    );

    return (
        <div className="dndflow">
            <Sidebar />
            <ReactFlowProvider>
                <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onInit={setReactFlowInstance}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        fitView
                    >
                        <Controls />
                    </ReactFlow>
                </div>
            </ReactFlowProvider>
        </div>
    );
};

export default DnDFlow;
