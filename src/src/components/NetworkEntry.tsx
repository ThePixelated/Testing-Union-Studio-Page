import type { NetworkItem } from '../data/network'
import { useI18n } from '../i18n'

/** One entry in the Network dropdown: link if it has a page, otherwise a "Soon" label. */
export default function NetworkEntry({ item, onNavigate }: { item: NetworkItem; onNavigate?: () => void }) {
  const { t } = useI18n()
  if (item.status === 'soon' || !item.href) {
    return (
      <span className="network-entry is-soon">
        {item.label} <em>{t.network.soon}</em>
      </span>
    )
  }
  const current = item.status === 'current'
  return (
    <a className="network-entry" href={item.href} aria-current={current ? 'page' : undefined} onClick={onNavigate}>
      {item.label} {current && <em>{t.network.here}</em>}
    </a>
  )
}
