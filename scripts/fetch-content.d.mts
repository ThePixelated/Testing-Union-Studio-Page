export const QUERY: string
export function fetchContent(options?: {
  env?: Record<string, string | undefined>
  log?: Pick<Console, 'info' | 'warn'>
}): Promise<{ source: 'sanity' | 'snapshot' }>
