/**
 * UNION network structure shown in the navbar "Network" dropdown.
 * status:
 *  - 'current' → this website
 *  - 'live'    → has its own site (set `href` to the full URL)
 *  - 'soon'    → planned, not clickable yet
 * When a sibling site goes live, just set status: 'live' and href: 'https://…'.
 */
export type NetworkStatus = 'current' | 'live' | 'soon'

export type NetworkItem = {
  id: string
  label: string
  status: NetworkStatus
  href?: string
}

export type NetworkGroup = {
  entity: NetworkItem
  items: NetworkItem[]
}

export const networkRoot: NetworkItem = { id: 'union', label: 'Union', status: 'soon' }

export const networkGroups: NetworkGroup[] = [
  {
    entity: { id: 'interactive', label: 'Union Interactive', status: 'soon' },
    items: [
      { id: 'studio', label: 'Union Studio', status: 'current', href: '#top' },
      { id: 'media-works', label: 'Union Media Works', status: 'soon' },
      { id: 'atelier', label: 'Union Atelier', status: 'soon' },
    ],
  },
  {
    entity: { id: 'foundation', label: 'Union Foundation', status: 'soon' },
    items: [
      { id: 'lab', label: 'Union Lab', status: 'soon' },
      { id: 'academia', label: 'Union Academia', status: 'soon' },
    ],
  },
]
