import React, {useEffect, useState, useMemo, useCallback, useRef} from 'react';
import ForceGraph2D from "react-force-graph-2d";
import {idMaker} from "@/lib/utils";

import img1 from '@/assets/doc1.jpg';
import img2 from '@/assets/doc2.jpg';
import img3 from '@/assets/doc3.jpg';
import imgBook from '@/assets/book.svg';
import imgLibrary from '@/assets/library.svg';


// todo: dummy image
// todo: use LRU cache to load images on demand for all images
const IMAGES = [img1, img2, img3];

// Preload and cache images globally to improve performance
const imageCache: Record<string, HTMLImageElement> = {};

type NetworkVisualizationProps = {
  doctorId: string;
  category: string;
  dataLoadWorker: Worker;
};

const NetworkVisualization: React.FC<NetworkVisualizationProps> = ({
  doctorId,
  category,
  dataLoadWorker
}) => {
  const fgRef: any = useRef(null);
  const [rawData, setRawData] = useState<any | null>(null);
  // const [graphData, setGraphData] = useState<any | null>(null);

  const centerId = useMemo(() => {
    return idMaker(category, doctorId);
  }, [doctorId, category]);

  useEffect(() => {
    dataLoadWorker.onmessage = e => {
      const { success, data, error } = e.data;

      if (success) {
        /*console.log(JSON.stringify(data.edges.slice(0, 2)))

        let edges = [{
          "source": "('Researcher', '0000-0003-0427-0369')",
          "target": "('BookPublication', 'The role of complement dysregulation in AMD mouse models')",
          "data": {"#text": "AUTHORED", "key": "labels"}
        }, {
          "source": "('BookPublication', 'The role of complement dysregulation in AMD mouse models')",
          "target": "('Publisher', 'Advances in Experimental Medicine and Biology')",
          "data": {"#text": "PUBLISHED_BY", "key": "labels"}
        }]


        console.log(JSON.stringify(data.nodes.slice(0, 3)))
        let nodesa = [{
          "id": "('Researcher', '0000-0003-0427-0369')",
          "label": "Researcher",
          "data": {"#text": "Researcher", "key": "labels"}
        }, {
          "id": "('BookPublication', 'The role of complement dysregulation in AMD mouse models')",
          "label": "BookPublication",
          "data": {"#text": "BookPublication", "key": "labels"}
        }, {
          "id": "('Publisher', 'Advances in Experimental Medicine and Biology')",
          "label": "Publisher",
          "data": {"#text": "Publisher", "key": "labels"}
        }]*/

        setRawData(data)
        console.log(NetworkVisualization.name, "=> ", "rawdata->", data)
      } else {
        console.error('Error loading GraphML:', error);
      }
    };

    dataLoadWorker.postMessage({
      dataType: 'PARSED_DATA',
      centerId,
    });
  }, [centerId]);

  // Memoize transformed graph data
  const graphData = useMemo(() => {
    if (!rawData || !rawData.nodes || !rawData.edges) return null;

    return {
      nodes: rawData.nodes.map((node: any) => {
        let img;
        switch (node.data['#text']) {
          case 'BookPublication':
            img = imgBook;
            break;
          case 'Publisher':
            img = imgLibrary;
            break;
          default:
            img = IMAGES[Math.floor(Math.random() * IMAGES.length)];
        }
        return {
          ...node,
          img,
        };
      }),
      links: rawData.edges,
    };
  }, [rawData]);

  // Memoized canvas renderer with rounded image nodes
  const drawNode = useCallback((node: any, ctx: CanvasRenderingContext2D) => {
    const size = 12;
    const imgSize = 16;

    // Use cached image or load it
    let img = imageCache[node.img];
    if (!img) {
      img = new Image();
      img.src = node.img;
      img.width = imgSize;
      img.height = imgSize;
      imageCache[node.img] = img;
    }

    if (img.complete) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(node.x, node.y, size/2, 0, 2 * Math.PI);
      ctx.clip();

      ctx.drawImage(img, node.x - size / 2, node.y - size / 2, size, size);
      ctx.restore();

      // border
      ctx.beginPath();
      ctx.arc(node.x, node.y, size/2, 0, 2 * Math.PI, false);
      ctx.lineWidth = 0.25;
      ctx.strokeStyle = '#f00';
      ctx.stroke();
    }
  }, []);

  // console.log(NetworkVisualization.name, "=> ", "graphData", graphData)

  if (!graphData) return <div>Loading...</div>;

  // todo: throttle animation
  // https://github.com/vasturiano/react-force-graph/issues/334

  return (
    <div className="size-full overflow-hidden">
      <ForceGraph2D
        ref={fgRef}
        width={window.innerWidth * 2 / 3 - 100} // based on parent component from App.tsx
        backgroundColor="#fff"
        graphData={graphData}
        nodeCanvasObject={drawNode}

        cooldownTicks={10}
        linkDirectionalArrowLength={4}
        linkDirectionalArrowRelPos={1}
        linkLabel={_link => _link.data?.['#text'] || ''}
        // pauseAnimation={true}
        onEngineStop={() => {
          fgRef.current?.zoomToFit(100, 150);
          // fgRef.current.zoom(1250)
        }}
      />
    </div>
  )
};

export default NetworkVisualization;
