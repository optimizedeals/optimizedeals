interface Definition {
  identifier: string;
  url: string;
  title: string;
}

export function remarkRenderReferences() {
  return (tree: { children: any[] }) => {
    const definitions: Definition[] = [];

    for (const node of tree.children) {
      if (node.type === "definition") {
        definitions.push({
          identifier: node.identifier,
          url: node.url,
          title: node.title || "",
        });
      }
    }

    if (definitions.length === 0) return;

    for (let i = 0; i < tree.children.length; i++) {
      const node = tree.children[i];
      if (node.type === "heading" && node.depth === 2) {
        const text = (node.children || [])
          .map((c: any) => c.value || "")
          .join("")
          .toLowerCase();

        if (text === "references" || text === "refer\u00eancias") {
          const list = {
            type: "list",
            ordered: true,
            spread: false,
            children: definitions.map((def) => ({
              type: "listItem",
              spread: false,
              children: [
                {
                  type: "paragraph",
                  children: [
                    {
                      type: "link",
                      url: def.url,
                      title: def.title || undefined,
                      children: [
                        { type: "text", value: def.title || def.url },
                      ],
                    },
                  ],
                },
              ],
            })),
          };

          tree.children.splice(i + 1, 0, list);
          break;
        }
      }
    }
  };
}
