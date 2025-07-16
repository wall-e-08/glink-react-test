import React, {useEffect, useMemo, useRef, useState} from "react";
import { Network, DataSet } from "vis-network/standalone";
import "vis-network/styles/vis-network.css";
import {idMaker, idParser} from "@/lib/utils";
import img1 from '@/assets/doc1.jpg';
import img2 from '@/assets/doc2.jpg';
import img3 from '@/assets/doc3.jpg';
import imgBook from '@/assets/book.svg';
import imgLibrary from '@/assets/library.svg';
import type {EdgeType, NodeType} from "@/workers/dataLoad.worker";


// todo: dummy image
// todo: use LRU cache to load images on demand for all images
const IMAGES = [img1, img2, img3];

type NetworkVisualizationProps = {
  doctorId: string;
  category: string;
  dataLoadWorker: Worker;
};

type PositionType = {x: Number, y: Number}

const NetworkVisualization: React.FC<NetworkVisualizationProps> = ({
  doctorId,
  category,
  dataLoadWorker
}) => {
  const networkRef = useRef<HTMLElement | null>(null);
  const [hoverNode, setHoverNode] = useState<NodeType>(null);
  const [clickNode, setClickNode] = useState<NodeType>(null);
  const [hoverPosition, setHoverPosition] = useState<PositionType>({ x: 0, y: 0 });
  const [clickPosition, setClickPosition] = useState<PositionType>({ x: 0, y: 0 });

  /*useEffect(() => {
    const staticNodes = new DataSet([
      {
        id: "1",
        label: "User",
        image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        shape: "image"
      },
      {
        id: "2",
        label: "Server",
        image: "https://cdn-icons-png.flaticon.com/512/2885/2885253.png",
        shape: "image"
      },
      {
        id: "3",
        label: "Database",
        image: "https://cdn-icons-png.flaticon.com/512/4299/4299956.png",
        shape: "image"
      }
    ]);

    const staticEdges = new DataSet([
      { id: "1", from: "1", to: "2" },
      { id: "2", from: "2", to: "3" }
    ]);

    nodesRef.current = staticNodes;
    edgesRef.current = staticEdges;

    const container = networkRef.current;
    const data = {
      nodes: staticNodes,
      edges: staticEdges
    };

    const options = {
      clickToUse: true,
      interaction: { hover: true }
    };

    const network = new Network(container, data, options);

    network.on("click", (event) => {
      if (event.nodes.length > 0) {
        const nodeId = event.nodes[0];
        const node = staticNodes.get(nodeId);
        const pos = network.getPositions([nodeId])[nodeId];
        const domPos = network.canvasToDOM(pos);

        setClickNode(node);
        setClickPosition({ x: domPos.x, y: domPos.y });
      } else {
        setClickNode(null); // click on empty space
      }
    });

    network.on("hoverNode", (event) => {
      const nodeId = event.node;
      const node = staticNodes.get(nodeId);
      const pos = network.getPositions([nodeId])[nodeId];
      const domPos = network.canvasToDOM(pos);

      setHoverNode(node);
      setHoverPosition({ x: domPos.x, y: domPos.y });
    });

    network.on("blurNode", () => {
      setHoverNode(null);
    });

    return () => {
      network.destroy();
    };
  }, []);*/

  const centerId = useMemo(() => {
    return idMaker(category, doctorId);
  }, [doctorId, category]);

  useEffect(() => {
    dataLoadWorker.onmessage = e => {
      const { success, data, error, dataType } = e.data;

      if (dataType !== "PARSED_DATA") return;

      if (success && data) {
        const nodes = new DataSet(
          data.nodes.map((node: NodeType) => {
            let img;
            switch (node.data['#text']) {
              case 'BookPublication':
              case 'OtherPublication':
                img = imgBook;
                break;
              case 'Publisher':
                img = imgLibrary;
                break;
              default:
                img = IMAGES[Math.floor(Math.random() * IMAGES.length)];
            }
            return {
              id: node.id,
              label: node.data['#text'],
              shape: "image",
              image: img
            }
          })
        );
        const edges = new DataSet(
          data.edges.map((edge: EdgeType, index: number) => ({
            id: `${index}`,
            from: edge.source,
            to: edge.target,
            // label: edge.data['#text'],
          }))
        );

        const network = new Network(
          networkRef.current,
          { nodes, edges },
          {
            interaction: { hover: true },}
        );

        network.on("click", e => {
          if (e.nodes.length > 0) {
            const nodeId = e.nodes[0];
            const node = nodes.get(nodeId);
            const pos = network.getPositions([nodeId])[nodeId];
            const domPos = network.canvasToDOM(pos);
            setClickNode(node);
            setClickPosition({
              x: domPos.x,
              y: domPos.y
            });
          } else {
            setClickNode(null);
          }
        });

        network.on("hoverNode", e => {
          const nodeId = e.node;
          const node = nodes.get(nodeId);
          const pos = network.getPositions([nodeId])[nodeId];
          const domPos = network.canvasToDOM(pos);
          setHoverNode(node);
          setHoverPosition({
            x: domPos.x,
            y: domPos.y
          });
        });

        network.on("blurNode", () => {
          setHoverNode(null);
        });
      } else {
        console.error("Error loading graph data from dataLoadWorker:", error);
      }
    };

    dataLoadWorker.postMessage({
      dataType: "PARSED_DATA",
      centerId
    });
  }, [centerId]);

  return (
    <div className="relative">
      {/* main graph */}
      <div
        ref={networkRef}
        className="relative w-full h-[500px] border border-gray-300"
      />

      {hoverNode && (
        <div
          className="absolute bg-white px-2 py-1 border border-gray-200 rounded text-xs shadow-md"
          style={{
            top: hoverPosition.y + 10,
            left: hoverPosition.x + 10
          }}
        >
          {idParser(hoverNode.id)['doctorId']}
        </div>
      )}

      {clickNode && (
        <div
          className="absolute bg-gray-50 p-3 border border-gray-400 rounded-lg z-10 shadow-lg text-sm"
          style={{
            top: clickPosition.y + 20,
            left: clickPosition.x + 20
          }}
        >
          <p>{(() => {
            const parsedData = idParser(clickNode.id);
            return `${parsedData.category}: ${parsedData.doctorId}`;
          })()}</p>
          <button
            onClick={() => setClickNode(null)}
            className="mt-2 text-blue-600 hover:underline"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default NetworkVisualization;