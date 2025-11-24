import { NextResponse } from 'next/server'
import { getLiveChannels } from '@/lib/cosmic'

export async function GET() {
  try {
    const channels = await getLiveChannels()
    return NextResponse.json({ channels })
  } catch (error) {
    console.error('Error fetching channels:', error)
    return NextResponse.json(
      { error: 'Failed to fetch channels' },
      { status: 500 }
    )
  }
}