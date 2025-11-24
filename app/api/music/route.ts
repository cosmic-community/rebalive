import { NextResponse } from 'next/server'
import { getMusicReleases } from '@/lib/cosmic'

export async function GET() {
  try {
    const tracks = await getMusicReleases()
    return NextResponse.json({ tracks })
  } catch (error) {
    console.error('Error fetching music:', error)
    return NextResponse.json(
      { error: 'Failed to fetch music' },
      { status: 500 }
    )
  }
}