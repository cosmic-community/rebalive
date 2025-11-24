'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <svg className="w-8 h-8 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
            <span className="text-2xl font-bold">Rebalive</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-300 hover:text-white font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/movies"
              className="text-gray-300 hover:text-white font-medium transition-colors"
            >
              Movies
            </Link>
            <Link
              href="/news"
              className="text-gray-300 hover:text-white font-medium transition-colors"
            >
              News
            </Link>
            <Link
              href="/music"
              className="text-gray-300 hover:text-white font-medium transition-colors"
            >
              Music
            </Link>
            <Link
              href="/live-tv"
              className="text-gray-300 hover:text-white font-medium transition-colors"
            >
              Live TV
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-gray-300 hover:text-white font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/movies"
                className="text-gray-300 hover:text-white font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Movies
              </Link>
              <Link
                href="/news"
                className="text-gray-300 hover:text-white font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                News
              </Link>
              <Link
                href="/music"
                className="text-gray-300 hover:text-white font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Music
              </Link>
              <Link
                href="/live-tv"
                className="text-gray-300 hover:text-white font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Live TV
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}