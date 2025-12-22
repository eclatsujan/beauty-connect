import { notFound } from 'next/navigation'
import { getCompanyBySlug } from '@/lib/companies'
import SocialMediaCard from '../components/SocialMediaCard'

interface CompanyPageProps {
  params: Promise<{ slug: string }>
}

export default async function CompanyPage({ params }: CompanyPageProps) {
  const { slug } = await params
  const company = getCompanyBySlug(slug)

  if (!company) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-64 h-64 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-5xl mx-auto">
          <SocialMediaCard 
            companyName={company.name}
            companyLogo={company.logo}
            companyDescription={company.description}
            socialMedia={company.socialMedia} 
          />
        </div>
      </div>
    </main>
  )
}

