// OG Image Generation System
// Centralized exports for dynamic OpenGraph image generation

export { OG_CONFIG, type PageType, type PageOGData } from './config'
export { 
  calculateTitleFontSize, 
  calculateLineHeight, 
  truncateText, 
  formatCategory,
  getOGImageUrl,
  getOGMetadata,
} from './utils'
export { OGBackground, OGBackgroundArticle } from './background'
export { OGLogo } from './logo'
export { OGTitle, OGDescription, OGCategoryBadge, OGPageBadge } from './typography'
export {
  OGLayoutDefault,
  OGLayoutHomepage,
  OGLayoutArticle,
  OGLayoutSolutions,
  OGLayoutProducts,
  OGLayoutLabs,
  OGLayoutInsights,
  OGLayoutCompany,
  OGLayoutCareers,
  getOGLayout,
} from './layouts'
