import Link from 'next/link'
import { getFeaturedMovies, getMovies } from '@/lib/cosmic'
import MovieCard from '@/components/MovieCard'
import FeaturedMovieHero from '@/components/FeaturedMovieHero'

export default async function HomePage() {
  const [featuredMovies, allMovies] = await Promise.all([
    getFeaturedMovies(),
    getMovies(),
  ])

  // Get trending movies (movies marked as trending)
  const trendingMovies = allMovies.filter(movie => movie.metadata.trending)

  // Get first featured movie with validation
  const firstFeaturedMovie = featuredMovies[0]

  return (
    <div>
      {/* Hero Section with Featured Movie */}
      {firstFeaturedMovie && (
        <FeaturedMovieHero movie={firstFeaturedMovie} />
      )}

      {/* Trending Now */}
      {trendingMovies && trendingMovies.length > 0 && (
        <section className="section-container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title">🔥 Trending Now</h2>
            <Link
              href="/movies?filter=trending"
              className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2"
            >
              View All
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {trendingMovies.slice(0, 5).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Movies */}
      {featuredMovies && featuredMovies.length > 1 && (
        <section className="section-container bg-gray-900">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">⭐ Featured Movies</h2>
            <Link
              href="/movies?filter=featured"
              className="text-primary-400 hover:text-primary-300 font-semibold flex items-center gap-2"
            >
              View All
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {featuredMovies.slice(1, 6).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      )}

      {/* Recently Added */}
      {allMovies && allMovies.length > 0 && (
        <section className="section-container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title">🆕 Recently Added</h2>
            <Link
              href="/movies"
              className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2"
            >
              Browse All
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {allMovies.slice(0, 10).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="section-container bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-2xl">
        <div className="text-center py-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Unlimited Movies, TV Shows & More
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Watch anywhere. Discover new favorites every day.
          </p>
          <Link
            href="/movies"
            className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors inline-block"
          >
            Start Watching Now
          </Link>
        </div>
      </section>
    </div>
  )
}