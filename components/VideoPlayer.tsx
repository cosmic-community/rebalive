'use client'

import { useState } from 'react'

interface VideoPlayerProps {
  trailerUrl?: string
  posterUrl?: string
  title: string
}

export default function VideoPlayer({ trailerUrl, posterUrl, title }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  // Extract YouTube video ID if it's a YouTube URL
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)
    return match ? match[1] : null
  }

  const youtubeId = trailerUrl ? getYouTubeId(trailerUrl) : null

  return (
    <div className="relative aspect-video bg-black">
      {!isPlaying ? (
        <>
          {posterUrl && (
            <img
              src={`${posterUrl}?w=2000&h=1125&fit=crop&auto=format,compress`}
              alt={title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <button
              onClick={() => setIsPlaying(true)}
              className="bg-primary-600 hover:bg-primary-700 text-white rounded-full p-8 transition-all hover:scale-110"
            >
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </button>
          </div>
        </>
      ) : youtubeId ? (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-white">
          <p>Video player coming soon</p>
        </div>
      )}
    </div>
  )
}