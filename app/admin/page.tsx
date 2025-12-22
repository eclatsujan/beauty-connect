'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getAllCompanies } from '@/lib/companies'
import { Company, SocialMediaLink } from '@/types/company'

export default function AdminPage() {
  const router = useRouter()
  const [companies, setCompanies] = useState<Company[]>([])
  const [editingCompany, setEditingCompany] = useState<Company | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    setCompanies(getAllCompanies())
  }, [])

  const handleAddSocialMedia = (company: Company) => {
    const newSocial: SocialMediaLink = {
      platform: '',
      url: '',
      icon: '🔗'
    }
    const updated = {
      ...company,
      socialMedia: [...company.socialMedia, newSocial]
    }
    setEditingCompany(updated)
  }

  const handleRemoveSocialMedia = (company: Company, index: number) => {
    const updated = {
      ...company,
      socialMedia: company.socialMedia.filter((_, i) => i !== index)
    }
    setEditingCompany(updated)
  }

  const handleSocialMediaChange = (
    company: Company,
    index: number,
    field: keyof SocialMediaLink,
    value: string
  ) => {
    const updated = {
      ...company,
      socialMedia: company.socialMedia.map((social, i) =>
        i === index ? { ...social, [field]: value } : social
      )
    }
    setEditingCompany(updated)
  }

  const handleSave = () => {
    if (!editingCompany) return
    
    // In a real app, you'd save to a database or API
    // For now, we'll just update the local state
    setCompanies(companies.map(c => 
      c.id === editingCompany.id ? editingCompany : c
    ))
    setEditingCompany(null)
    alert('Changes saved! (Note: In production, this would persist to a database)')
  }

  const handleAddCompany = () => {
    const newCompany: Company = {
      id: Date.now().toString(),
      name: '',
      slug: '',
      description: '',
      logo: '🏢',
      socialMedia: []
    }
    setEditingCompany(newCompany)
    setShowAddForm(true)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage companies and their social media links
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => router.push('/')}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                View Site
              </button>
              <button
                onClick={handleAddCompany}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                + Add Company
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {companies.map((company) => (
              <div
                key={company.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-4xl mb-2">{company.logo || '🏢'}</div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {company.name}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      /company/{company.slug}
                    </p>
                  </div>
                  <button
                    onClick={() => setEditingCompany(company)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Edit
                  </button>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Social Media Links: {company.socialMedia.length}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {company.socialMedia.map((social, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                        title={social.url}
                      >
                        {social.icon} {social.platform}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Edit Modal */}
          {editingCompany && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {showAddForm ? 'Add Company' : 'Edit Company'}
                  </h2>
                  <button
                    onClick={() => {
                      setEditingCompany(null)
                      setShowAddForm(false)
                    }}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={editingCompany.name}
                      onChange={(e) =>
                        setEditingCompany({ ...editingCompany, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Slug (URL identifier)
                    </label>
                    <input
                      type="text"
                      value={editingCompany.slug}
                      onChange={(e) =>
                        setEditingCompany({ ...editingCompany, slug: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      value={editingCompany.description || ''}
                      onChange={(e) =>
                        setEditingCompany({ ...editingCompany, description: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Logo (emoji)
                    </label>
                    <input
                      type="text"
                      value={editingCompany.logo || ''}
                      onChange={(e) =>
                        setEditingCompany({ ...editingCompany, logo: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="🏢"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Social Media Links
                      </label>
                      <button
                        onClick={() => handleAddSocialMedia(editingCompany)}
                        className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        + Add Link
                      </button>
                    </div>
                    <div className="space-y-3">
                      {editingCompany.socialMedia.map((social, index) => (
                        <div
                          key={index}
                          className="flex gap-2 items-start p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <input
                            type="text"
                            placeholder="Platform (e.g., Instagram)"
                            value={social.platform}
                            onChange={(e) =>
                              handleSocialMediaChange(editingCompany, index, 'platform', e.target.value)
                            }
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                          />
                          <input
                            type="text"
                            placeholder="URL"
                            value={social.url}
                            onChange={(e) =>
                              handleSocialMediaChange(editingCompany, index, 'url', e.target.value)
                            }
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Icon"
                            value={social.icon || ''}
                            onChange={(e) =>
                              handleSocialMediaChange(editingCompany, index, 'icon', e.target.value)
                            }
                            className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                          />
                          <button
                            onClick={() => handleRemoveSocialMedia(editingCompany, index)}
                            className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={handleSave}
                      className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setEditingCompany(null)
                        setShowAddForm(false)
                      }}
                      className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

