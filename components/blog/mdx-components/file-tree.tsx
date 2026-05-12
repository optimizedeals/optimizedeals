import { File, Folder, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FileTreeNode {
  name: string;
  type?: "file" | "folder";
  highlight?: boolean;
  comment?: string;
  children?: FileTreeNode[];
}

interface FileTreeProps {
  title?: string;
  data: FileTreeNode[];
}

function Node({ node, depth }: { node: FileTreeNode; depth: number }) {
  const isFolder =
    node.type === "folder" || (node.children && node.children.length > 0);
  const Icon = isFolder ? (depth === 0 ? FolderOpen : Folder) : File;

  return (
    <li className="font-mono text-sm">
      <div
        className={cn(
          "flex items-center gap-2 py-1 px-2 rounded",
          node.highlight && "bg-[#0054D6]/10 text-[#3B80EC]",
          !node.highlight && "text-[#7A8BA7]",
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        <Icon
          className={cn(
            "w-4 h-4 flex-shrink-0",
            isFolder ? "text-[#3B80EC]" : "text-[#585F78]",
            node.highlight && "text-[#3B80EC]",
          )}
        />
        <span className={isFolder ? "text-[#F0F5FB]" : ""}>{node.name}</span>
        {node.comment && (
          <span className="text-xs text-[#585F78] ml-2">{node.comment}</span>
        )}
      </div>
      {node.children && (
        <ul>
          {node.children.map((child, i) => (
            <Node key={i} node={child} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export function FileTree({ title, data }: FileTreeProps) {
  return (
    <div className="not-prose my-8 rounded-xl border border-[#002A6B]/50 bg-[#001535]/30 overflow-hidden">
      {title && (
        <div className="px-4 py-2 bg-[#001535] border-b border-[#002A6B]/50 text-xs font-mono text-[#585F78]">
          {title}
        </div>
      )}
      <ul className="py-3">
        {data.map((node, i) => (
          <Node key={i} node={node} depth={0} />
        ))}
      </ul>
    </div>
  );
}
