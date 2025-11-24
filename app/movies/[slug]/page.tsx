// app/movies/[slug]/page.tsx
import { getMovieBySlug } from '@/lib/cosmic'
import Link from 'next/link'
import { notFound } from 'next/navigation'

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

  return (
    <div>
      <div className="gradient-primary text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/movies"
            className="inline-flex items-center gap-2 text-blue-100 hover:text-white transition-colors mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Movies
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            {posterUrl && (
              <img
                src={`${posterUrl}?w=800&h=1200&fit=crop&auto=format,compress`}
                alt={movie.title}
                className="w-full rounded-xl shadow-lg"
              />
            )}
          </div>

          <div className="lg:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            
            <div className="flex flex-wrap gap-4 mb-6">
              {movie.metadata.release_year && (
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {movie.metadata.release_year}
                </span>
              )}
              {movie.metadata.duration && (
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {movie.metadata.duration} min
                </span>
              )}
              {movie.metadata.rating && (
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-semibold">
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
              <h3 className="font-semibold mb-2">Synopsis</h3>
              <p className="text-gray-700 leading-relaxed">
                {movie.metadata.synopsis}
              </p>
            </div>

            {movie.metadata.trailer_url && (
              <a
                href={movie.metadata.trailer_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-secondary-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                Watch Trailer
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}