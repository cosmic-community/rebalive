'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import type { FeaturedArtist } from '@/types'

export default function ArtistsPage() {
  const [artists, setArtists] = useState<FeaturedArtist[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/artists')
        const data = await response.json()
        setArtists(data.artists || [])
      } catch (error) {
        console.error('Error fetching artists:', error)
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
          <p className="mt-4 text-gray-600">Loading artists...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="gradient-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Featured Artists</h1>
          <p className="text-xl text-blue-100">
            Discover talented artists from Rwanda
          </p>
        </div>
      </div>

      <div className="section-container">
        {artists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artists.map((artist) => (
              <Link
                key={artist.id}
                href={`/artists/${artist.slug}`}
                className="group bg-white rounded-xl shadow-md overflow-hidden card-hover"
              >
                <div className="relative aspect-square bg-gray-200">
                  {artist.metadata.profile_photo?.imgix_url && (
                    <img
                      src={`${artist.metadata.profile_photo.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
                      alt={artist.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-xl mb-2 group-hover:text-primary-600 transition-colors">
                    {artist.metadata.name}
                  </h3>
                  <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                    {artist.metadata.category.value}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No artists available.</p>
          </div>
        )}
      </div>
    </div>
  )
}