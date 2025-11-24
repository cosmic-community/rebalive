'use client'

import { useState, useEffect } from 'react'
import MusicCard from '@/components/MusicCard'
import type { MusicRelease } from '@/types'

export default function MusicPage() {
  const [tracks, setTracks] = useState<MusicRelease[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/music')
        const data = await response.json()
        setTracks(data.tracks || [])
      } catch (error) {
        console.error('Error fetching music:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div className="section-container">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading music...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="gradient-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Music</h1>
          <p className="text-xl text-blue-100">
            Discover the latest tracks and albums
          </p>
        </div>
      </div>

      <div className="section-container">
        {tracks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tracks.map((track) => (
              <MusicCard key={track.id} track={track} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No music tracks available.</p>
          </div>
        )}
      </div>
    </div>
  )
}