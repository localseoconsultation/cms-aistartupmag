'use client'

import type { ChangeEvent } from 'react'
import { TextInput, useField } from '@payloadcms/ui'
import SeoFieldFeedback from './SeoFieldFeedback'

export default function SeoTitleField() {
  const { value, setValue } = useField<string>()

  const currentValue = value || ''

  return (
    <div>
      <TextInput
        path="seo.metaTitle"
        label="Meta Title"
        value={currentValue}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setValue(e.target.value)
        }}
      />

      <SeoFieldFeedback value={currentValue} type="title" />
    </div>
  )
}
