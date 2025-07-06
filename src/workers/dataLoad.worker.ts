import { XMLParser } from 'fast-xml-parser';

type WorkerMessage = {
  filePath: string;
  centerId: string;
};

self.onmessage = async (e: MessageEvent<WorkerMessage>) => {
  const { filePath, centerId }: WorkerMessage = e.data;

  if (!centerId) {
    console.log("No centerId provided, skipping data load");
    return
  }

  console.log("centerId", centerId)

  try {
    const response = await fetch(filePath);
    const json_data = await response.text();

    // Parse GraphML to JSON
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '',
    });

    // todo: typescript types
    const json = parser.parse(json_data);
    const graph = json.graphml.graph;
    console.log("graph", graph)
    let nodes = Array.isArray(graph.node) ? graph.node : [graph.node];
    let edges = Array.isArray(graph.edge) ? graph.edge : [graph.edge];

    // todo: confirm if the source is only match
    // edges = edges.filter(_edge => _edge.source === centerId) //|| _edge.target == centerId);

    // nodes = nodes
    //   .map(_node => ({
    //     id: _node.id,
    //     label: _node.data?.['#text'] || '',
    //   }))
    //   .filter(_node => _node.id === centerId);

    edges = edges.filter(_edge => _edge.source === centerId || _edge.target === centerId)
    console.log("filtered edges", edges)

    const nodeIds = new Set<string>();
    nodeIds.add(centerId);
    edges.forEach(_edge => nodeIds.add(_edge.target));

    nodes = nodes.filter(_node => nodeIds.has(_node.id));  // all nodes from edges













    // const filteredEdges = edges.filter(_edge => _edge.source === targetId);
    //
    // // all target node IDs from these edges
    // const connectedNodeIds = new Set<string>();
    // connectedNodeIds.add(targetId);
    // filteredEdges.forEach(_edge => connectedNodeIds.add(_edge.target));
    //
    // // filter nodes based on those IDs
    // const filteredNodes = nodes.filter((node) => connectedNodeIds.has(node.id));


    /*filteredEdges = allEdges.filter(
      (edge) => edge.source === targetId || edge.target === targetId
    );
    filteredEdges.forEach((edge) => {
      connectedIds.add(edge.source);
      connectedIds.add(edge.target);
    });

    filteredNodes = allNodes.filter((node) => connectedIds.has(node.id));*/

    console.log("Final", {nodes, edges})

    self.postMessage({
      success: true,
      data: {nodes, edges}
    });
  } catch (error) {
    self.postMessage({ success: false, error: (error as Error).message });
  }
};

export {};

/* // all data..
type WorkerMessage = {
  filePath: string;
  targetId: string;
};

self.onmessage = async (e: MessageEvent<WorkerMessage>) => {
  const { filePath, targetId }: WorkerMessage = e.data;

  try {
    const response = await fetch(filePath);
    const xmlText = await response.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '',
    });

    const json = parser.parse(xmlText);
    const graph = json.graphml.graph;

    const nodesRaw = Array.isArray(graph.node) ? graph.node : [graph.node];
    const edgesRaw = Array.isArray(graph.edge) ? graph.edge : [graph.edge];
    console.log("nodesRaw", nodesRaw)
    console.log("edgesRaw", edgesRaw)

    const allNodes = nodesRaw.map((_node: any) => ({
      id: _node.id,
      label: _node.data?.['#text'] || '',
    }));

    const allEdges = edgesRaw.map((_edge: any) => ({
      source: _edge.source,
      target: _edge.target,
      data: _edge.data,
    }));

    let filteredNodes = allNodes;
    let filteredEdges = allEdges;

    // If a targetId is provided, filter to that node + its direct connections
    if (targetId) {
      filteredEdges = allEdges.filter(
        (edge) => edge.source === targetId || edge.target === targetId
      );

      const connectedIds = new Set<string>([targetId]);
      filteredEdges.forEach((edge) => {
        connectedIds.add(edge.source);
        connectedIds.add(edge.target);
      });

      filteredNodes = allNodes.filter((node) => connectedIds.has(node.id));
    }

    self.postMessage({
      success: true,
      data: {
        nodes: filteredNodes,
        edges: filteredEdges,
      },
    });
  } catch (error) {
    self.postMessage({
      success: false,
      error: (error as Error).message,
    });
  }
};

export {};*/
