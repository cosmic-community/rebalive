import { NextResponse } from 'next/server'
import { getFeaturedArtists } from '@/lib/cosmic'

export async function GET() {
  try {
    const artists = await getFeaturedArtists()
    return NextResponse.json({ artists })
  } catch (error) {
    console.error('Error fetching artists:', error)
    return NextResponse.json(
      { error: 'Failed to fetch artists' },
      { status: 500 }
    )
  }
}