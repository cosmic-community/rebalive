import Link from 'next/link'
import { getFeaturedMovies, getFeaturedNews, getFeaturedMusic, getLiveChannels } from '@/lib/cosmic'
import MovieCard from '@/components/MovieCard'
import NewsCard from '@/components/NewsCard'
import MusicCard from '@/components/MusicCard'
import ChannelCard from '@/components/ChannelCard'

export default async function HomePage() {
  const [movies, news, music, channels] = await Promise.all([
    getFeaturedMovies(),
    getFeaturedNews(),
    getFeaturedMusic(),
    getLiveChannels(),
  ])

  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to Rebalive
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Rwanda's Premier Entertainment Platform
            </p>
            <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">
              Discover the latest movies, breaking news, trending music, and live TV channels all in one place
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/movies"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Browse Movies
              </Link>
              <Link
                href="/live-tv"
                className="bg-secondary-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary-600 transition-colors"
              >
                Watch Live TV
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Movies */}
      {movies && movies.length > 0 && (
        <section className="section-container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title">Featured Movies</h2>
            <Link
              href="/movies"
              className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2"
            >
              View All
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.slice(0, 3).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      )}

      {/* Breaking News */}
      {news && news.length > 0 && (
        <section className="section-container bg-white">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title">Latest News</h2>
            <Link
              href="/news"
              className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2"
            >
              View All
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.slice(0, 3).map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Music */}
      {music && music.length > 0 && (
        <section className="section-container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title">New Music</h2>
            <Link
              href="/music"
              className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2"
            >
              View All
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {music.slice(0, 3).map((track) => (
              <MusicCard key={track.id} track={track} />
            ))}
          </div>
        </section>
      )}

      {/* Live Channels */}
      {channels && channels.length > 0 && (
        <section className="section-container bg-white">
          <div className="flex justify-between items-center mb-8">
            <h2 className="section-title">Live TV Channels</h2>
            <Link
              href="/live-tv"
              className="text-primary-600 hover:text-primary-700 font-semibold flex items-center gap-2"
            >
              View All
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {channels.slice(0, 3).map((channel) => (
              <ChannelCard key={channel.id} channel={channel} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}