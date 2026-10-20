'use client'

import './SeoFieldFeedback.scss'

type Props = {
  value?: string
  type: 'title' | 'description'
}

const LIMITS = {
  title: {
    chars: 60,
    pixels: 600,
    averageMin: 30,
    minWords: 5,
  },
  description: {
    chars: 160,
    pixels: 960,
    averageMin: 80,
    minWords: 5,
  },
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function estimatePixelWidth(text: string): number {
  if (!text) return 0

  const widths: Record<string, number> = {
    i: 3,
    l: 3,
    I: 4,
    t: 5,
    f: 5,
    r: 5,
    j: 5,
    m: 10,
    w: 10,
    W: 12,
    M: 11,
    ' ': 4,
  }

  let width = 0

  for (const char of text) {
    width += widths[char] ?? 7
  }

  return Math.round(width)
}

function getStatus(value: string, type: 'title' | 'description') {
  const limit = LIMITS[type]

  const charCount = value.length
  const wordCount = countWords(value)
  const pixelWidth = estimatePixelWidth(value)

  // Empty or fewer than 5 words = Bad
  if (wordCount < limit.minWords) {
    return {
      label: 'Bad',
      className: 'seo-status-bad',
    }
  }

  // Too long = Bad
  if (charCount > limit.chars || pixelWidth > limit.pixels) {
    return {
      label: 'Bad',
      className: 'seo-status-bad',
    }
  }

  // Too short = Average
  if (charCount < limit.averageMin || pixelWidth < limit.pixels * 0.55) {
    return {
      label: 'Average',
      className: 'seo-status-average',
    }
  }

  return {
    label: 'Good',
    className: 'seo-status-good',
  }
}

export default function SeoFieldFeedback({ value = '', type }: Props) {
  const limit = LIMITS[type]

  const charCount = value.length
  const wordCount = countWords(value)
  const pixelWidth = estimatePixelWidth(value)

  const status = getStatus(value, type)

  const percentage = Math.min(
    Math.max((pixelWidth / limit.pixels) * 100, (charCount / limit.chars) * 100),
    100,
  )

  return (
    <div className="seo-feedback">
      {/* Count + Status */}
      <div className="seo-feedback-row">
        <span className="seo-count">
          {charCount} chars ({pixelWidth} / {limit.pixels}px)
        </span>

        <span className={`seo-status ${status.className}`}>{status.label}</span>
      </div>

      {/* Progress */}
      <div className="seo-progress">
        <div
          className={`seo-progress-bar ${status.className}`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      {/* Word Count Warning */}
      {wordCount < limit.minWords && <div className="seo-warning">Use at least 5 words.</div>}

      {/* Character Warning */}
      {wordCount >= limit.minWords && charCount > limit.chars && (
        <div className="seo-warning">
          Your {type === 'title' ? 'title' : 'description'} is too long.
        </div>
      )}

      {/* Pixel Width Warning */}
      {wordCount >= limit.minWords && charCount <= limit.chars && pixelWidth > limit.pixels && (
        <div className="seo-warning">Estimated pixel width is too wide.</div>
      )}
    </div>
  )
}
