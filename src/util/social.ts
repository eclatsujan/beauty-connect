import { 
    FaFacebook, 
    FaInstagram, 
    FaTiktok, 
    FaGoogle,
    FaLinkedin,
    FaTwitter,
    FaTelegram,
    FaAmazon,
  } from 'react-icons/fa'
  
  export const getPlatformIcon = (platform: string) => {
    const platformLower = platform.toLowerCase()
    
    if (platformLower.includes('facebook')) {
      return FaFacebook
    }
    if (platformLower.includes('instagram')) {
      return FaInstagram
    }
    if (platformLower.includes('tiktok')) {
      return FaTiktok
    }
    if (platformLower.includes('google')) {
      return FaGoogle
    }
    if (platformLower.includes('linkedin')) {
      return FaLinkedin
    }
    if (platformLower.includes('twitter') || platformLower.includes('x')) {
      return FaTwitter
    }
    if (platformLower.includes('telegram')) {
      return FaTelegram
    }
    if (platformLower.includes('amazon')) {
      return FaAmazon
    }
    
    return null
  }
  
export const getPlatformColor = (platform: string) => {
    const platformLower = platform.toLowerCase()
    
    if (platformLower.includes('facebook')) {
      return 'bg-[#1877F2]'
    }
    if (platformLower.includes('instagram')) {
      return 'bg-gradient-to-br from-[#E4405F] to-[#FCAF45]'
    }
    if (platformLower.includes('tiktok')) {
      return 'bg-[#000000]'
    }
    if (platformLower.includes('google')) {
      return 'bg-[#4285F4]'
    }
    if (platformLower.includes('linkedin')) {
      return 'bg-[#0077B5]'
    }
    if (platformLower.includes('twitter') || platformLower.includes('x')) {
      return 'bg-[#000000]'
    }
    if (platformLower.includes('telegram')) {
      return 'bg-[#0088CC]'
    }
    if (platformLower.includes('amazon')) {
      return 'bg-[#FF9900]'
    }
    
    return 'bg-gray-600'
  }