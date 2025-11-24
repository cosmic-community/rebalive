import Link from 'next/link'
import type { MusicRelease } from '@/types'

interface MusicCardProps {
  track: MusicRelease
}

export default function MusicCard({ track }: MusicCardProps) {
  const coverUrl = track.metadata.cover_art?.imgix_url
  const artist = track.metadata.artist
  const genre = track.metadata.genre?.value

  return (
    <div className="group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden card-hover">
        <div className="relative aspect-square bg-gray-200">
          {coverUrl && (
            <img
              src={`${coverUrl}?w=600&h=600&fit=crop&auto=format,compress`}
              alt={track.title}
              className="w-full h-full object-cover"
            />
          )}
          {track.metadata.new_release && (
            <div className="absolute top-4 right-4 bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              New
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1 group-hover:text-primary-600 transition-colors line-clamp-1">
            {track.metadata.track_title}
          </h3>
          {artist && (
            <Link
              href={`/artists/${artist.slug}`}
              className="text-gray-600 hover:text-primary-600 transition-colors text-sm mb-2 block"
            >
              {artist.title}
            </Link>
          )}
          {genre && (
            <span className="inline-block text-xs px-2 py-1 rounded-full bg-primary-50 text-primary-700">
              {genre}
            </span>
          )}
          <div className="flex gap-2 mt-3">
            {track.metadata.spotify_link && (
              <a
                href={track.metadata.spotify_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-green-500 text-white text-center py-2 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors"
              >
                Spotify
              </a>
            )}
            {track.metadata.youtube_link && (
              <a
                href={track.metadata.youtube_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-red-500 text-white text-center py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition-colors"
              >
                YouTube
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}