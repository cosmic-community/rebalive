import MovieCard from './MovieCard'
import type { Movie } from '@/types'

interface RelatedMoviesProps {
  movies: Movie[]
}

export default function RelatedMovies({ movies }: RelatedMoviesProps) {
  return (
    <section className="mt-12 pt-12 border-t border-gray-200">
      <h2 className="text-3xl font-bold mb-6">You May Also Like</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}