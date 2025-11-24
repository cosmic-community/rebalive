// app/news/[slug]/page.tsx
import { getNewsArticleBySlug } from '@/lib/cosmic'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface NewsPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function NewsArticlePage({ params }: NewsPageProps) {
  const { slug } = await params
  const article = await getNewsArticleBySlug(slug)

  if (!article) {
    notFound()
  }

  const imageUrl = article.metadata.featured_image?.imgix_url
  const category = article.metadata.category
  const date = new Date(article.metadata.publication_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div>
      <div className="gradient-primary text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-blue-100 hover:text-white transition-colors mb-4"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to News
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {category && (
          <div className="mb-4">
            <span
              className="inline-block px-4 py-2 rounded-full text-sm font-semibold text-white"
              style={{
                backgroundColor: category.metadata.color || '#1E88E5',
              }}
            >
              {category.metadata.icon} {category.title}
            </span>
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {article.metadata.headline}
        </h1>

        <div className="flex items-center gap-4 text-gray-600 mb-8">
          <span className="font-semibold">{article.metadata.author}</span>
          <span>•</span>
          <time>{date}</time>
        </div>

        {imageUrl && (
          <div className="mb-8">
            <img
              src={`${imageUrl}?w=1200&h=675&fit=crop&auto=format,compress`}
              alt={article.title}
              className="w-full rounded-xl shadow-lg"
            />
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-6">
            {article.metadata.summary}
          </p>
          <div
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.metadata.content }}
          />
        </div>
      </article>
    </div>
  )
}