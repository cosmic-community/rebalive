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
      <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover h-full flex flex-col">
        <div className="relative aspect-[2/3] bg-gray-200">
          {posterUrl && (
            <img
              src={`${posterUrl}?w=600&h=900&fit=crop&auto=format,compress`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          )}
          {movie.metadata.trending && (
            <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Trending
            </div>
          )}
          {movie.metadata.featured && !movie.metadata.trending && (
            <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-md text-xs font-bold">
              Featured
            </div>
          )}
          {rating && (
            <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs font-bold">
              {rating}
            </div>
          )}
        </div>
        <div className="p-3 flex-1 flex flex-col">
          <h3 className="font-bold text-sm mb-1 group-hover:text-primary-600 transition-colors line-clamp-2 flex-1">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between text-xs text-gray-600">
            {year && <span>{year}</span>}
            {genres.length > 0 && (
              <span className="line-clamp-1">{genres[0].title}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}