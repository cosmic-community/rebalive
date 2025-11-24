import Link from 'next/link'
import type { Movie } from '@/types'

interface FeaturedMovieHeroProps {
  movie: Movie
}

export default function FeaturedMovieHero({ movie }: FeaturedMovieHeroProps) {
  const posterUrl = movie.metadata.poster_image?.imgix_url
  const genres = movie.metadata.genres || []
  const year = movie.metadata.release_year
  const duration = movie.metadata.duration
  const rating = movie.metadata.rating?.value

  return (
    <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {posterUrl && (
          <img
            src={`${posterUrl}?w=2000&h=1200&fit=crop&auto=format,compress`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            {movie.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            {year && (
              <span className="text-white text-lg font-semibold">{year}</span>
            )}
            {rating && (
              <span className="bg-yellow-500 text-black px-3 py-1 rounded-md text-sm font-bold">
                {rating}
              </span>
            )}
            {duration && (
              <span className="text-white text-lg">{duration} min</span>
            )}
          </div>

          {genres.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {genres.slice(0, 3).map((genre) => (
                <span
                  key={genre.id}
                  className="text-white text-sm px-3 py-1 rounded-full border border-white/30 backdrop-blur-sm"
                >
                  {genre.metadata.icon} {genre.title}
                </span>
              ))}
            </div>
          )}

          <p className="text-white text-lg mb-8 line-clamp-3 drop-shadow-md">
            {movie.metadata.synopsis}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href={`/movies/${movie.slug}`}
              className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
              Watch Now
            </Link>
            <Link
              href={`/movies/${movie.slug}`}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              More Info
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}