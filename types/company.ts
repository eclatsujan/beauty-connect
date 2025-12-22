export interface SocialMediaLink {
  platform: string
  url: string
  icon?: string
}

export interface Company {
  id: string
  name: string
  slug: string
  logo?: string
  description?: string
  socialMedia: SocialMediaLink[]
}

