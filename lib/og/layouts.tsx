import { OG_CONFIG, type PageType } from './config'
import { OGBackground, OGBackgroundArticle } from './background'
import { OGLogo } from './logo'
import { OGTitle, OGDescription, OGCategoryBadge, OGPageBadge } from './typography'

interface BaseLayoutProps {
  title: string
  description?: string
}

interface ArticleLayoutProps extends BaseLayoutProps {
  category?: string
}

interface PageLayoutProps extends BaseLayoutProps {
  badge?: string
}

/**
 * Default OG layout for standard pages
 */
export function OGLayoutDefault({ title, description, badge }: PageLayoutProps) {
  return (
    <div
      style={{
        width: OG_CONFIG.width,
        height: OG_CONFIG.height,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <OGBackground />
      <OGLogo />
      
      {/* Content */}
      <div
        style={{
          position: 'absolute',
          left: OG_CONFIG.spacing.contentLeft,
          right: OG_CONFIG.spacing.contentRight,
          bottom: 80,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {badge && <OGPageBadge>{badge}</OGPageBadge>}
        <OGTitle>{title}</OGTitle>
        {description && <OGDescription>{description}</OGDescription>}
      </div>
    </div>
  )
}

/**
 * Homepage OG layout - prominent branding
 */
export function OGLayoutHomepage({ title, description }: BaseLayoutProps) {
  return (
    <div
      style={{
        width: OG_CONFIG.width,
        height: OG_CONFIG.height,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <OGBackground />
      <OGLogo />
      
      {/* Content - centered for homepage */}
      <div
        style={{
          position: 'absolute',
          left: OG_CONFIG.spacing.contentLeft,
          right: OG_CONFIG.spacing.contentRight,
          top: '50%',
          transform: 'translateY(-30%)',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        <OGTitle maxWidth={900}>{title}</OGTitle>
        {description && <OGDescription maxWidth={800}>{description}</OGDescription>}
      </div>
    </div>
  )
}

/**
 * Article/Blog OG layout - optimized for content
 */
export function OGLayoutArticle({ title, description, category }: ArticleLayoutProps) {
  return (
    <div
      style={{
        width: OG_CONFIG.width,
        height: OG_CONFIG.height,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <OGBackgroundArticle />
      <OGLogo size="small" />
      
      {/* Content */}
      <div
        style={{
          position: 'absolute',
          left: OG_CONFIG.spacing.contentLeft,
          right: OG_CONFIG.spacing.contentRight,
          bottom: 70,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        {category && <OGCategoryBadge>{category}</OGCategoryBadge>}
        <OGTitle maxWidth={1000}>{title}</OGTitle>
        {description && <OGDescription maxLength={180}>{description}</OGDescription>}
      </div>
    </div>
  )
}

/**
 * Solutions page OG layout
 */
export function OGLayoutSolutions({ title, description }: BaseLayoutProps) {
  return <OGLayoutDefault title={title} description={description} badge="Engineering Services" />
}

/**
 * Products page OG layout
 */
export function OGLayoutProducts({ title, description }: BaseLayoutProps) {
  return <OGLayoutDefault title={title} description={description} badge="Product Portfolio" />
}

/**
 * Labs page OG layout
 */
export function OGLayoutLabs({ title, description }: BaseLayoutProps) {
  return <OGLayoutDefault title={title} description={description} badge="Research & Development" />
}

/**
 * Insights page OG layout
 */
export function OGLayoutInsights({ title, description }: BaseLayoutProps) {
  return <OGLayoutDefault title={title} description={description} badge="Technical Insights" />
}

/**
 * Company page OG layout
 */
export function OGLayoutCompany({ title, description }: BaseLayoutProps) {
  return <OGLayoutDefault title={title} description={description} badge="About Us" />
}

/**
 * Careers page OG layout
 */
export function OGLayoutCareers({ title, description }: BaseLayoutProps) {
  return <OGLayoutDefault title={title} description={description} badge="Join Our Team" />
}

/**
 * Factory function to get the appropriate layout based on page type
 */
export function getOGLayout(
  pageType: PageType,
  props: { title: string; description?: string; category?: string }
) {
  switch (pageType) {
    case 'homepage':
      return <OGLayoutHomepage {...props} />
    case 'article':
      return <OGLayoutArticle {...props} />
    case 'solutions':
      return <OGLayoutSolutions {...props} />
    case 'products':
      return <OGLayoutProducts {...props} />
    case 'labs':
      return <OGLayoutLabs {...props} />
    case 'insights':
      return <OGLayoutInsights {...props} />
    case 'company':
      return <OGLayoutCompany {...props} />
    case 'careers':
      return <OGLayoutCareers {...props} />
    default:
      return <OGLayoutDefault {...props} />
  }
}
