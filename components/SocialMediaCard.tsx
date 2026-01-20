'use client'

import Image from 'next/image'
import { SocialMediaLink } from '@/types/company'
import { getPlatformColor, getPlatformIcon } from '@/src/util/social'
import { FaShare } from 'react-icons/fa'

interface SocialMediaCardProps {
  companyName: string
  companyLogo?: string
  companyDescription?: string
  socialMedia: SocialMediaLink[]
}


export default function SocialMediaCard({ 
  companyName, 
  companyLogo, 
  companyDescription,
  socialMedia 
}: SocialMediaCardProps) {
  // Split social media into left sidebar (circular) and bottom row (square)
  const leftSidebarLinks = socialMedia.slice(0, 4) // First 4 for left sidebar
  const bottomRowLinks = socialMedia.slice(0, 4) // Same links for bottom row

  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Left Sidebar - Circular Icons */}
        <div className="bg-white p-6 flex flex-row md:flex-col gap-4 justify-center items-center md:border-r border-gray-200">
          {leftSidebarLinks.map((social, index) => {
            const IconComponent = getPlatformIcon(social.platform)
            const colorClass = getPlatformColor(social.platform)
            
            if (!IconComponent) return null
            
            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-14 h-14 ${colorClass} rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform duration-200 shadow-lg`}
              >
                <IconComponent className="w-6 h-6" />
              </a>
            )
          })}
          {/* Share button */}
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: companyName,
                  url: window.location.href
                })
              }
            }}
            className="w-14 h-14 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center text-gray-600 hover:scale-110 transition-transform duration-200 shadow-lg"
          >
            <FaShare className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8">
          {/* Company Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-64 h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl flex items-center justify-center shadow-lg overflow-hidden">
              {companyLogo && (companyLogo.startsWith('http://') || companyLogo.startsWith('https://')) ? (
                <Image
                  src={companyLogo}
                  alt={companyName}
                  width={256}
                  height={256}
                  className="w-full h-full object-contain"
                  unoptimized
                />
              ) : (
                <div className="text-9xl">{companyLogo || '🏢'}</div>
              )}
            </div>
          </div>

          {/* Company Name and Description */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {companyName}
            </h1>
            {companyDescription && (
              <p className="text-gray-600 text-lg">
                {companyDescription}
              </p>
            )}
          </div>

          {/* Bottom Row - Square Icons */}
          <div className="flex justify-center gap-4 mt-8">
            {bottomRowLinks.map((social, index) => {
              const IconComponent = getPlatformIcon(social.platform)
              const colorClass = getPlatformColor(social.platform)
              
              if (!IconComponent) return null
              
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-14 h-14 ${colorClass} rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform duration-200 shadow-lg`}
                >
                  <IconComponent className="w-6 h-6" />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

