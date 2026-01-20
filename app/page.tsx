import Link from 'next/link'
import { getAllCompanies } from '@/lib/companies'
import { getPlatformColor, getPlatformIcon } from '@/src/util/social'
import Image from 'next/image'

export default function Home() {
  const companies = getAllCompanies()

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Company Social Media Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Connect with companies through their social media profiles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {companies.map((company) => (
            <Link
              key={company.id}
              href={`/company/${company.slug}`}
              className="block bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 transform hover:scale-105"
            >
              <div className="text-center flex flex-col flex-wrap h-full items-center">
                <div className="text-6xl mb-4 h-48 w-48 flex-0 flex justify-center items-center">
                  <Image src={company.logo || ''} alt={company.name} width={256} height={256} />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2 flex-1 mb-4">
                    {company.name}
                </h2>
                <div className='flex-0'>
                  {company.description && (
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {company.description}
                    </p>
                  )}
                  <div className="flex justify-center gap-2 flex-wrap">
                    {company.socialMedia.map((social, index) => {
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
                      ); 
                    })}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
                    {company.socialMedia.length} social links
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Select a company to view and access their social media profiles
          </p>
          <Link
            href="/admin"
            className="inline-block px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors"
          >
            Admin Dashboard
          </Link>
        </div>
      </div>
    </main>
  )
}

