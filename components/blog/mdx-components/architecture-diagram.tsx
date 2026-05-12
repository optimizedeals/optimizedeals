"use client"

import { useId } from "react"
import { motion } from "framer-motion"

interface DiagramNode {
  id: string
  label: string
  x: number
  y: number
  type?: "primary" | "secondary" | "tertiary"
}

interface DiagramConnection {
  from: string
  to: string
  label?: string
}

interface ArchitectureDiagramProps {
  title?: string
  description?: string
  nodes?: DiagramNode[]
  connections?: DiagramConnection[]
  preset?: "micro-frontend" | "module-federation" | "monorepo"
}

const presets: { [key: string]: { nodes: DiagramNode[]; connections: DiagramConnection[] } } = {
  "micro-frontend": {
    nodes: [
      { id: "shell", label: "Shell App", x: 50, y: 20, type: "primary" },
      { id: "mf1", label: "MF 1", x: 20, y: 60, type: "secondary" },
      { id: "mf2", label: "MF 2", x: 50, y: 60, type: "secondary" },
      { id: "mf3", label: "MF 3", x: 80, y: 60, type: "secondary" },
      { id: "shared", label: "Shared Runtime", x: 50, y: 90, type: "tertiary" },
    ],
    connections: [
      { from: "shell", to: "mf1" },
      { from: "shell", to: "mf2" },
      { from: "shell", to: "mf3" },
      { from: "mf1", to: "shared" },
      { from: "mf2", to: "shared" },
      { from: "mf3", to: "shared" },
    ],
  },
  "module-federation": {
    nodes: [
      { id: "host", label: "Host", x: 50, y: 15, type: "primary" },
      { id: "remote1", label: "Remote A", x: 20, y: 50, type: "secondary" },
      { id: "remote2", label: "Remote B", x: 80, y: 50, type: "secondary" },
      { id: "shared", label: "Shared Deps", x: 50, y: 85, type: "tertiary" },
    ],
    connections: [
      { from: "host", to: "remote1", label: "exposes" },
      { from: "host", to: "remote2", label: "exposes" },
      { from: "remote1", to: "shared" },
      { from: "remote2", to: "shared" },
    ],
  },
  "monorepo": {
    nodes: [
      { id: "mono", label: "Monorepo", x: 50, y: 15, type: "primary" },
      { id: "app1", label: "App 1", x: 20, y: 45, type: "secondary" },
      { id: "app2", label: "App 2", x: 50, y: 45, type: "secondary" },
      { id: "app3", label: "App 3", x: 80, y: 45, type: "secondary" },
      { id: "lib1", label: "UI Lib", x: 30, y: 75, type: "tertiary" },
      { id: "lib2", label: "Utils", x: 70, y: 75, type: "tertiary" },
    ],
    connections: [
      { from: "mono", to: "app1" },
      { from: "mono", to: "app2" },
      { from: "mono", to: "app3" },
      { from: "app1", to: "lib1" },
      { from: "app2", to: "lib1" },
      { from: "app2", to: "lib2" },
      { from: "app3", to: "lib2" },
    ],
  },
}

export function ArchitectureDiagram({
  title,
  description,
  nodes,
  connections,
  preset,
}: ArchitectureDiagramProps) {
  const data = preset ? presets[preset] : { nodes: nodes || [], connections: connections || [] }
  const gridId = useId()

  const getNodeStyle = (type?: string) => {
    switch (type) {
      case "primary":
        return "bg-[#0054D6]/20 border-[#0054D6]/50 text-[#3B80EC]"
      case "secondary":
        return "bg-[#002A6B]/30 border-[#002A6B] text-[#F0F5FB]"
      case "tertiary":
        return "bg-[#001535]/50 border-[#002A6B]/50 text-[#7A8BA7]"
      default:
        return "bg-[#002A6B]/30 border-[#002A6B] text-[#F0F5FB]"
    }
  }

  return (
    <div className="my-8 p-6 bg-[#001535]/30 border border-[#002A6B]/30 rounded-xl">
      {title && (
        <h4 className="text-sm font-medium text-[#F0F5FB] mb-2">{title}</h4>
      )}
      {description && (
        <p className="text-xs text-[#7A8BA7] mb-6">{description}</p>
      )}

      <div className="relative w-full aspect-[16/9] bg-[#000216]/50 rounded-lg overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={gridId} width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#3B80EC" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#${gridId})`} />
          </svg>
        </div>

        {/* Connections */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {data.connections.map((conn, index) => {
            const fromNode = data.nodes.find((n) => n.id === conn.from)
            const toNode = data.nodes.find((n) => n.id === conn.to)
            if (!fromNode || !toNode) return null

            return (
              <motion.line
                key={`${conn.from}-${conn.to}`}
                x1={`${fromNode.x}%`}
                y1={`${fromNode.y + 5}%`}
                x2={`${toNode.x}%`}
                y2={`${toNode.y - 5}%`}
                stroke="#3B80EC"
                strokeWidth="0.5"
                strokeDasharray="2,2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              />
            )
          })}
        </svg>

        {/* Nodes */}
        {data.nodes.map((node, index) => (
          <motion.div
            key={node.id}
            className={`absolute px-3 py-2 rounded-lg border text-xs font-mono transform -translate-x-1/2 -translate-y-1/2 ${getNodeStyle(node.type)}`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {node.label}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
