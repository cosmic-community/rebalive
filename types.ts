// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Category interface
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name: string;
    description?: string;
    color?: string;
    icon?: string;
  };
}

// Featured Artist interface
export interface FeaturedArtist extends CosmicObject {
  type: 'featured-artists';
  metadata: {
    name: string;
    bio: string;
    profile_photo: {
      url: string;
      imgix_url: string;
    };
    category: {
      key: string;
      value: string;
    };
    instagram?: string;
    twitter?: string;
    facebook?: string;
    website?: string;
  };
}

// Live Channel interface
export interface LiveChannel extends CosmicObject {
  type: 'live-channels';
  metadata: {
    channel_name: string;
    description: string;
    channel_logo: {
      url: string;
      imgix_url: string;
    };
    stream_url: string;
    channel_type: {
      key: string;
      value: string;
    };
    currently_live: boolean;
    current_program?: string;
    schedule?: string;
  };
}

// Music Release interface
export interface MusicRelease extends CosmicObject {
  type: 'music-releases';
  metadata: {
    track_title: string;
    artist: FeaturedArtist;
    album?: string;
    cover_art: {
      url: string;
      imgix_url: string;
    };
    release_date: string;
    preview_audio_url?: string;
    spotify_link?: string;
    youtube_link?: string;
    genre?: {
      key: string;
      value: string;
    };
    featured: boolean;
    new_release: boolean;
  };
}

// News Article interface
export interface NewsArticle extends CosmicObject {
  type: 'news-articles';
  metadata: {
    headline: string;
    summary: string;
    content: string;
    featured_image: {
      url: string;
      imgix_url: string;
    };
    category: Category;
    author: string;
    publication_date: string;
    featured: boolean;
    breaking_news: boolean;
  };
}

// Movie interface
export interface Movie extends CosmicObject {
  type: 'movies';
  metadata: {
    title: string;
    synopsis: string;
    poster_image: {
      url: string;
      imgix_url: string;
    };
    trailer_url?: string;
    release_year: number;
    duration?: number;
    rating?: {
      key: string;
      value: string;
    };
    genres?: Category[];
    languages?: string[];
    featured: boolean;
    trending: boolean;
  };
}

// Type guard functions
export function isMovie(obj: CosmicObject): obj is Movie {
  return obj.type === 'movies';
}

export function isNewsArticle(obj: CosmicObject): obj is NewsArticle {
  return obj.type === 'news-articles';
}

export function isMusicRelease(obj: CosmicObject): obj is MusicRelease {
  return obj.type === 'music-releases';
}

export function isLiveChannel(obj: CosmicObject): obj is LiveChannel {
  return obj.type === 'live-channels';
}

export function isFeaturedArtist(obj: CosmicObject): obj is FeaturedArtist {
  return obj.type === 'featured-artists';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}