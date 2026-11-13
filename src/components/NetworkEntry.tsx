import type { NetworkItem } from '../data/network'

/** One entry in the Network dropdown: link if it has a page, otherwise a "Soon" label. */
export default function NetworkEntry({ item, onNavigate }: { item: NetworkItem; onNavigate?: () => void }) {
  if (item.status === 'soon' || !item.href) {
    return (
      <span className="network-entry is-soon">
        {item.label} <em>Soon</em>
      </span>
    )
  }
  const current = item.status === 'current'
  return (
    <a className="network-entry" href={item.href} aria-current={current ? 'page' : undefined} onClick={onNavigate}>
      {item.label} {current && <em>You are here</em>}
    </a>
  )
}
