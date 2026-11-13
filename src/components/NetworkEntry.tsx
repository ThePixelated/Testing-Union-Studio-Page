import type { NetworkItem } from '../data/network'
import { useI18n } from '../i18n'

type Variant = 'root' | 'group' | 'item'

const classNames: Record<Variant, string> = {
  root: 'network-root-label',
  group: 'network-group-title',
  item: 'network-entry',
}

/**
 * One entry in the Network dropdown. Every level (UNION, a division, a unit) can be a link:
 * it becomes clickable as soon as its `href` is set and its status is not 'soon'.
 * Until then headings are plain text and items show a "Soon" tag.
 */
export default function NetworkEntry({ item, variant = 'item', onNavigate }: { item: NetworkItem; variant?: Variant; onNavigate?: () => void }) {
  const { t } = useI18n()
  const isHeading = variant !== 'item'
  const className = classNames[variant]

  if (item.status === 'soon' || !item.href) {
    return isHeading ? (
      <p className={className}>{item.label}</p>
    ) : (
      <span className={`${className} is-soon`}>
        {item.label} <em>{t.network.soon}</em>
      </span>
    )
  }
  const current = item.status === 'current'
  return (
    <a className={isHeading ? `${className} is-link` : className} href={item.href} aria-current={current ? 'page' : undefined} onClick={onNavigate}>
      {item.label}
      {isHeading ? <span aria-hidden="true"> ↗</span> : current && <em>{t.network.here}</em>}
    </a>
  )
}
