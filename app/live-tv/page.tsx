'use client'

import { useState, useEffect } from 'react'
import ChannelCard from '@/components/ChannelCard'
import type { LiveChannel } from '@/types'

export default function LiveTVPage() {
  const [channels, setChannels] = useState<LiveChannel[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/live-channels')
        const data = await response.json()
        setChannels(data.channels || [])
      } catch (error) {
        console.error('Error fetching channels:', error)
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
          <p className="mt-4 text-gray-600">Loading channels...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="gradient-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Live TV</h1>
          <p className="text-xl text-blue-100">
            Watch live channels and streaming content
          </p>
        </div>
      </div>

      <div className="section-container">
        {channels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {channels.map((channel) => (
              <ChannelCard key={channel.id} channel={channel} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No live channels available.</p>
          </div>
        )}
      </div>
    </div>
  )
}