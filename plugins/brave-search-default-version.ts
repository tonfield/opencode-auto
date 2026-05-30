import type { Plugin } from "@opencode-ai/plugin"

const API_VERSION_KEY = "api-version"

function isBraveSearchTool(toolID: string) {
  const normalized = toolID.toLowerCase()

  return (
    normalized.startsWith("brave-search_") ||
    normalized.startsWith("brave_search_") ||
    normalized.startsWith("brave-") ||
    normalized.startsWith("brave_")
  )
}

export default (async () => {
  return {
    "tool.definition": async (input, output) => {
      if (!isBraveSearchTool(input.toolID)) return

      const properties = output.parameters?.properties
      if (!properties || !(API_VERSION_KEY in properties)) return

      delete properties[API_VERSION_KEY]

      if (Array.isArray(output.parameters.required)) {
        output.parameters.required = output.parameters.required.filter(
          (key: string) => key !== API_VERSION_KEY,
        )
      }

      output.description = `${output.description}\n\nCompatibility note: omit the \`${API_VERSION_KEY}\` parameter. Brave Search should use its default/latest API version.`
    },

    "tool.execute.before": async (input, output) => {
      if (!isBraveSearchTool(input.tool)) return
      if (!output.args || typeof output.args !== "object") return

      delete output.args[API_VERSION_KEY]
    },
  }
}) satisfies Plugin
