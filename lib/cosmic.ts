import { createBucketClient } from '@cosmicjs/sdk'
import type { Movie, NewsArticle, MusicRelease, LiveChannel, FeaturedArtist, Category } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Helper function for error handling
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

// Fetch featured movies
export async function getFeaturedMovies(): Promise<Movie[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'movies',
        'metadata.featured': true 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Movie[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch featured movies')
  }
}

// Fetch all movies and series
export async function getMovies(): Promise<Movie[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'movies' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Movie[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch movies')
  }
}

// Fetch only movies (not series)
export async function getMoviesOnly(): Promise<Movie[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'movies',
        'metadata.content_type.key': 'movie'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Movie[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch movies only')
  }
}

// Fetch only series
export async function getSeriesOnly(): Promise<Movie[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'movies',
        'metadata.content_type.key': 'series'
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as Movie[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch series only')
  }
}

// Fetch movie by slug
export async function getMovieBySlug(slug: string): Promise<Movie | null> {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'movies',
        slug 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as Movie
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch movie')
  }
}

// Fetch featured news articles
export async function getFeaturedNews(): Promise<NewsArticle[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'news-articles',
        'metadata.featured': true 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as NewsArticle[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch featured news')
  }
}

// Fetch all news articles
export async function getNewsArticles(): Promise<NewsArticle[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'news-articles' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as NewsArticle[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch news articles')
  }
}

// Fetch news article by slug
export async function getNewsArticleBySlug(slug: string): Promise<NewsArticle | null> {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'news-articles',
        slug 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as NewsArticle
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch news article')
  }
}

// Fetch featured music releases
export async function getFeaturedMusic(): Promise<MusicRelease[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'music-releases',
        'metadata.featured': true 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as MusicRelease[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch featured music')
  }
}

// Fetch all music releases
export async function getMusicReleases(): Promise<MusicRelease[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'music-releases' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as MusicRelease[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch music releases')
  }
}

// Fetch live channels
export async function getLiveChannels(): Promise<LiveChannel[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'live-channels' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as LiveChannel[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch live channels')
  }
}

// Fetch featured artists
export async function getFeaturedArtists(): Promise<FeaturedArtist[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'featured-artists' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects as FeaturedArtist[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch featured artists')
  }
}

// Fetch artist by slug
export async function getArtistBySlug(slug: string): Promise<FeaturedArtist | null> {
  try {
    const response = await cosmic.objects
      .findOne({ 
        type: 'featured-artists',
        slug 
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object as FeaturedArtist
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch artist')
  }
}

// Fetch all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categories' })
      .props(['id', 'title', 'slug', 'metadata'])
    
    return response.objects as Category[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch categories')
  }
}