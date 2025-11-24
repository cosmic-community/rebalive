import { NextResponse } from 'next/server'
import { getNewsArticles } from '@/lib/cosmic'

export async function GET() {
  try {
    const articles = await getNewsArticles()
    return NextResponse.json({ articles })
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    )
  }
}