import { Company } from '@/types/company'
import companiesData from '@/data/companies.json'

export function getCompanyBySlug(slug: string): Company | undefined {
  return companiesData.companies.find(company => company.slug === slug)
}

export function getAllCompanies(): Company[] {
  return companiesData.companies
}

export function getCompanyById(id: string): Company | undefined {
  return companiesData.companies.find(company => company.id === id)
}

