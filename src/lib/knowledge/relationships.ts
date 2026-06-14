export function buildKnowledgeRelationships(memories: any[]) {
  const relationships = [];

  for (let i = 0; i < memories.length; i++) {
    for (let j = i + 1; j < memories.length; j++) {
      const source = memories[i];
      const target = memories[j];

      relationships.push({
        source_id: source.id,
        target_id: target.id,
        relationship_type: "related",
        confidence: 0.5,
      });
    }
  }

  return relationships;
}
