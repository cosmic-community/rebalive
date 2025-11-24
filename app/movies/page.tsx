'use client'

import { useState, useEffect } from 'react'
import MovieCard from '@/components/MovieCard'
import CategoryFilter from '@/components/CategoryFilter'
import type { Movie, Category } from '@/types'

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
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

  const filteredMovies = selectedCategory
    ? movies.filter((movie) => 
        movie.metadata.genres?.some((genre) => genre.id === selectedCategory)
      )
    : movies

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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Movies</h1>
          <p className="text-xl text-blue-100">
            Discover and watch the latest films
          </p>
        </div>
      </div>

      <div className="section-container">
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Filter by Genre</h2>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No movies found in this category.</p>
          </div>
        )}
      </div>
    </div>
  )
}