'use client'

import { useState, useEffect } from 'react'
import MovieCard from '@/components/MovieCard'
import CategoryFilter from '@/components/CategoryFilter'
import SearchBar from '@/components/SearchBar'
import type { Movie, Category } from '@/types'

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'latest' | 'popular' | 'title'>('latest')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [moviesRes, categoriesRes] = await Promise.all([
          fetch('/api/movies'),
          fetch('/api/categories')
        ])
        
        const moviesData = await moviesRes.json()
        const categoriesData = await categoriesRes.json()
        
        setMovies(moviesData.movies || [])
        setCategories(categoriesData.categories || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter and search movies
  let filteredMovies = movies

  // Apply category filter
  if (selectedCategory) {
    filteredMovies = filteredMovies.filter((movie) => 
      movie.metadata.genres?.some((genre) => genre.id === selectedCategory)
    )
  }

  // Apply search filter
  if (searchQuery) {
    filteredMovies = filteredMovies.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      movie.metadata.synopsis.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  // Apply sorting
  filteredMovies = [...filteredMovies].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title)
    }
    if (sortBy === 'popular') {
      // Sort by trending first, then featured
      if (a.metadata.trending && !b.metadata.trending) return -1
      if (!a.metadata.trending && b.metadata.trending) return 1
      if (a.metadata.featured && !b.metadata.featured) return -1
      if (!a.metadata.featured && b.metadata.featured) return 1
      return 0
    }
    // Default: latest (by release year)
    return (b.metadata.release_year || 0) - (a.metadata.release_year || 0)
  })

  if (isLoading) {
    return (
      <div className="section-container">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading movies...</p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="gradient-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">All Movies</h1>
          <p className="text-xl text-blue-100">
            Browse our complete collection of {movies.length} movies
          </p>
        </div>
      </div>

      <div className="section-container">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Filter by Genre</h2>
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Sort By</h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSortBy('latest')}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  sortBy === 'latest'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Latest
              </button>
              <button
                onClick={() => setSortBy('popular')}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  sortBy === 'popular'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Most Popular
              </button>
              <button
                onClick={() => setSortBy('title')}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  sortBy === 'title'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                A-Z
              </button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredMovies.length} {filteredMovies.length === 1 ? 'movie' : 'movies'}
          </p>
        </div>

        {/* Movies Grid */}
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
            </svg>
            <p className="text-gray-600 text-lg">No movies found matching your criteria.</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory(null)
              }}
              className="mt-4 text-primary-600 hover:text-primary-700 font-semibold"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}