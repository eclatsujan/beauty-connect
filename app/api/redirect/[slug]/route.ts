import { NextRequest, NextResponse } from 'next/server'
import { getCompanyBySlug } from '@/lib/companies'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const company = getCompanyBySlug(slug)
  
  if (!company) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Redirect to company page
  return NextResponse.redirect(new URL(`/company/${slug}`, request.url))
}

