'use client'

import type { ChangeEvent } from 'react'
import { useField } from '@payloadcms/ui'
import SeoFieldFeedback from './SeoFieldFeedback'

export default function SeoDescriptionField() {
  const { value, setValue } = useField<string>()

  const currentValue = value || ''

  return (
    <div>
      <label
        htmlFor="seo-meta-description"
        style={{
          display: 'block',
          marginBottom: '8px',
          fontWeight: 500,
        }}
      >
        Meta Description
      </label>

      <textarea
        id="seo-meta-description"
        value={currentValue}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          setValue(e.target.value)
        }}
        rows={4}
        style={{
          width: '100%',
          resize: 'vertical',
          padding: '10px 12px',
          border: '1px solid var(--theme-elevation-150)',
          borderRadius: '4px',
          backgroundColor: 'var(--theme-input-bg)',
          color: 'var(--theme-text)',
          fontFamily: 'inherit',
          fontSize: '14px',
          lineHeight: '1.5',
        }}
      />

      <SeoFieldFeedback value={currentValue} type="description" />
    </div>
  )
}
