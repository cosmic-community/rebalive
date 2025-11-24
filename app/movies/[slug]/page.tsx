// app/movies/[slug]/page.tsx
import { getMovieBySlug, getMovies } from '@/lib/cosmic'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import VideoPlayer from '@/components/VideoPlayer'
import RelatedMovies from '@/components/RelatedMovies'

interface MoviePageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { slug } = await params
  const movie = await getMovieBySlug(slug)

  if (!movie) {
    notFound()
  }

  const posterUrl = movie.metadata.poster_image?.imgix_url
  const genres = movie.metadata.genres || []
  const languages = movie.metadata.languages || []

  // Get related movies (same genre)
  const allMovies = await getMovies()
  const relatedMovies = allMovies
    .filter(m => 
      m.id !== movie.id && 
      m.metadata.genres?.some(g => genres.some(mg => mg.id === g.id))
    )
    .slice(0, 5)

  return (
    <div>
      <div className="bg-black">
        {/* Video Player Section */}
        <div className="max-w-7xl mx-auto">
          <VideoPlayer
            trailerUrl={movie.metadata.trailer_url}
            posterUrl={posterUrl}
            title={movie.title}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/movies"
          className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors mb-6"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Movies
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Poster */}
          <div className="lg:col-span-1">
            {posterUrl && (
              <img
                src={`${posterUrl}?w=800&h=1200&fit=crop&auto=format,compress`}
                alt={movie.title}
                className="w-full rounded-xl shadow-lg sticky top-24"
              />
            )}
          </div>

          {/* Movie Info */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            
            <div className="flex flex-wrap gap-4 mb-6">
              {movie.metadata.release_year && (
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-semibold">
                  {movie.metadata.release_year}
                </span>
              )}
              {movie.metadata.duration && (
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-semibold">
                  {movie.metadata.duration} min
                </span>
              )}
              {movie.metadata.rating && (
                <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {movie.metadata.rating.value}
                </span>
              )}
            </div>

            {genres.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 rounded-full text-sm"
                      style={{
                        backgroundColor: genre.metadata.color ? `${genre.metadata.color}20` : '#E3F2FD',
                        color: genre.metadata.color || '#1E88E5',
                      }}
                    >
                      {genre.metadata.icon} {genre.title}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {languages.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {languages.map((lang, index) => (
                    <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <h3 className="font-semibold mb-2 text-xl">Synopsis</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                {movie.metadata.synopsis}
              </p>
            </div>

            <div className="flex gap-4 pt-6 border-t border-gray-200">
              {movie.metadata.trailer_url && (
                <a
                  href={movie.metadata.trailer_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  Watch Trailer
                </a>
              )}
              <button
                className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Add to Favorites
              </button>
            </div>
          </div>
        </div>

        {/* Related Movies */}
        {relatedMovies.length > 0 && (
          <RelatedMovies movies={relatedMovies} />
        )}
      </div>
    </div>
  )
}