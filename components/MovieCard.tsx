import Link from 'next/link'
import type { Movie } from '@/types'

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.metadata.poster_image?.imgix_url
  const genres = movie.metadata.genres || []
  const year = movie.metadata.release_year
  const rating = movie.metadata.rating?.value

  return (
    <Link href={`/movies/${movie.slug}`} className="group">
      <div className="bg-white rounded-xl shadow-md overflow-hidden card-hover">
        <div className="relative aspect-[2/3] bg-gray-200">
          {posterUrl && (
            <img
              src={`${posterUrl}?w=800&h=1200&fit=crop&auto=format,compress`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          )}
          {movie.metadata.trending && (
            <div className="absolute top-4 right-4 bg-secondary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Trending
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
            {movie.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            {year && <span>{year}</span>}
            {rating && (
              <>
                <span>•</span>
                <span className="bg-gray-100 px-2 py-0.5 rounded">{rating}</span>
              </>
            )}
          </div>
          {genres.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {genres.slice(0, 2).map((genre) => (
                <span
                  key={genre.id}
                  className="text-xs px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: genre.metadata.color ? `${genre.metadata.color}20` : '#E3F2FD',
                    color: genre.metadata.color || '#1E88E5',
                  }}
                >
                  {genre.metadata.icon} {genre.title}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}