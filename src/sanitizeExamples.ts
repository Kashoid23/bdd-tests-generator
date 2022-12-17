export const sanitizeExamples = (examples: string[]) => (
  examples.map(e => e.trim()).filter(e => e !== '').join('\n')
)
