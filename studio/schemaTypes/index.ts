import { localizedString, localizedText } from './objects/localized'
import { imageSlide, videoSlide } from './objects/slides'
import { aboutPage } from './documents/aboutPage'
import { faq } from './documents/faq'
import { homePage } from './documents/homePage'
import { project } from './documents/project'
import { service } from './documents/service'
import { siteSettings } from './documents/siteSettings'

export const schemaTypes = [
  // building blocks
  localizedString,
  localizedText,
  imageSlide,
  videoSlide,
  // one-of-a-kind documents
  siteSettings,
  homePage,
  aboutPage,
  // collections
  project,
  service,
  faq,
]
