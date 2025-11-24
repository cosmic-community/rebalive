import Link from 'next/link'
import type { NewsArticle } from '@/types'

interface NewsCardProps {
  article: NewsArticle
}

export default function NewsCard({ article }: NewsCardProps) {
  const imageUrl = article.metadata.featured_image?.imgix_url
  const category = article.metadata.category
  const date = new Date(article.metadata.publication_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <Link href={`/news/${article.slug}`} className="group">
      <article className="bg-white rounded-xl shadow-md overflow-hidden card-hover">
        <div className="relative aspect-video bg-gray-200">
          {imageUrl && (
            <img
              src={`${imageUrl}?w=800&h=450&fit=crop&auto=format,compress`}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          )}
          {article.metadata.breaking_news && (
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
              Breaking
            </div>
          )}
          {category && (
            <div
              className="absolute bottom-4 left-4 px-3 py-1 rounded-full text-sm font-semibold text-white"
              style={{
                backgroundColor: category.metadata.color || '#1E88E5',
              }}
            >
              {category.metadata.icon} {category.title}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
            {article.metadata.headline}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {article.metadata.summary}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{article.metadata.author}</span>
            <span>•</span>
            <span>{date}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}