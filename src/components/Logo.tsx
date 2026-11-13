import { logo } from '../data/brand'
import { assetUrl } from '../lib/assets'

export default function Logo() {
  if (logo.src) {
    return <img className="logo-img" src={assetUrl(logo.src)} alt={logo.alt} />
  }
  return (
    <span className="logo-fallback">
      <img src={assetUrl('android-chrome-192x192.png')} alt="" width={30} height={30} />
      <span>UNION Studio</span>
    </span>
  )
}
