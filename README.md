# Rebalive - Rwanda's Premier Entertainment Platform

![App Preview](https://imgix.cosmicjs.com/f7797120-a455-11ed-81f2-f50e185dd248-U7NLcNo9NGA.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, comprehensive entertainment platform for Rwanda featuring movies, news, music, and live TV streaming. Built with Next.js 16 and powered by Cosmic CMS.

## Features

- 🎬 **Movies Module** - Browse films with trailers, ratings, genres, and language filters
- 📰 **News Hub** - Breaking news across Entertainment, Sports, Technology, and Economy
- 🎵 **Music Discovery** - New releases, featured artists, and streaming links
- 📺 **Live TV** - Real-time channel streaming with program schedules
- 👤 **Artist Profiles** - Detailed artist pages with social media integration
- 🎨 **Modern Design** - Vibrant blue and orange theme, fully responsive
- ⚡ **Fast Performance** - Optimized images with imgix, server-side rendering
- 🔍 **Smart Filtering** - Category and genre-based content discovery

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69240bacb183692bb397fd80&clone_repository=6924178ab183692bb397fe22)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Build a modern, responsive entertainment web platform called Rebalive for Rwanda, featuring:
>
> Homepage with featured content, trending sections, and easy navigation.
> Movies Module: trailers, series, popular movies, descriptions, filters by genre and language.
> News Module: entertainment, sports, economy, tech, daily updates, with filtering and detailed articles.
> Music Module: regional and global updates, hits, new releases, with streaming previews.
> Live TV & Live Shows: real-time streaming of channels and events, sports, news, concerts.
> User accounts for personalization, favorites, and suggestions.
> Clean, modern design with vibrant blue and orange colors, suitable for mobile and desktop.
> Fast, reliable, and easy to update content.
> Admin panel for content management.
> Integrated social sharing and notification features."

### Code Generation Prompt

> "Based on the content model I created for 'Build a modern, responsive entertainment web platform called Rebalive for Rwanda, featuring: Homepage with featured content, trending sections, and easy navigation. Movies Module: trailers, series, popular movies, descriptions, filters by genre and language. News Module: entertainment, sports, economy, tech, daily updates, with filtering and detailed articles. Music Module: regional and global updates, hits, new releases, with streaming previews. Live TV & Live Shows: real-time streaming of channels and events, sports, news, concerts. User accounts for personalization, favorites, and suggestions. Clean, modern design with vibrant blue and orange colors, suitable for mobile and desktop. Fast, reliable, and easy to update content. Admin panel for content management. Integrated social sharing and notification features.', now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless CMS for content management
- **Imgix** - Image optimization and transformation
- **React Server Components** - Server-side rendering

## Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- A Cosmic account with your content bucket

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Cosmic SDK Examples

### Fetching Movies with Genres

```typescript
const { objects: movies } = await cosmic.objects
  .find({ 
    type: 'movies',
    'metadata.featured': true 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Movies include nested genre data automatically
movies.forEach(movie => {
  console.log(movie.metadata.genres) // Array of category objects
})
```

### Fetching News Articles by Category

```typescript
const { objects: articles } = await cosmic.objects
  .find({ 
    type: 'news-articles',
    'metadata.category': categoryId 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Articles include full category object with metadata
```

### Fetching Music with Artist Information

```typescript
const { objects: tracks } = await cosmic.objects
  .find({ 
    type: 'music-releases',
    'metadata.featured': true 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Tracks include complete artist object with profile and social links
```

## Cosmic CMS Integration

This application uses several Cosmic object types:

- **Movies** - Film content with trailers, ratings, genres, and languages
- **News Articles** - News content with categories, featured images, and HTML content
- **Music Releases** - Track information with artist connections and streaming links
- **Live Channels** - Streaming channels with schedules and program info
- **Featured Artists** - Artist profiles with bios and social media
- **Categories** - Universal categorization system with color-coding

All content is fetched server-side for optimal performance and SEO.

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Click the "Deploy with Vercel" button
2. Add your environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
3. Deploy!

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Click the "Deploy to Netlify" button
2. Add your environment variables in Netlify dashboard
3. Deploy!

## Project Structure

```
rebalive/
├── app/
│   ├── layout.tsx          # Root layout with navigation
│   ├── page.tsx            # Homepage with featured content
│   ├── movies/             # Movies section
│   ├── news/               # News section
│   ├── music/              # Music section
│   ├── live-tv/            # Live TV section
│   └── artists/            # Artist profiles
├── components/
│   ├── MovieCard.tsx       # Movie display component
│   ├── NewsCard.tsx        # News article component
│   ├── MusicCard.tsx       # Music track component
│   ├── ChannelCard.tsx     # Live channel component
│   ├── CategoryFilter.tsx  # Category filtering
│   └── Navigation.tsx      # Main navigation
├── lib/
│   └── cosmic.ts           # Cosmic SDK configuration
└── types.ts                # TypeScript definitions
```

## License

MIT

<!-- README_END -->