import { NextResponse } from 'next/server'
import { getMovies } from '@/lib/cosmic'

export async function GET() {
  try {
    const movies = await getMovies()
    return NextResponse.json({ movies })
  } catch (error) {
    console.error('Error fetching movies:', error)
    return NextResponse.json(
      { error: 'Failed to fetch movies' },
      { status: 500 }
    )
  }
}