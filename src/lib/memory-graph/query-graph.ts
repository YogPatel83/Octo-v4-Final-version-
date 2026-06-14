import { buildMemoryGraph } from "./build-graph";

export async function queryMemoryGraph(input: {
  company_id: string;
  keyword: string;
}) {
  const graph = await buildMemoryGraph(input.company_id);

  return {
    keyword: input.keyword,
    matches: graph.nodes.filter(node =>
      JSON.stringify(node).toLowerCase().includes(
        input.keyword.toLowerCase()
      )
    )
  };
}
