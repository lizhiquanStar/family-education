type Image = 'error' | 'network' | 'search' | 'default'
export interface EmptyAdapter {
  image?: Image | string
  imageSize?: string | number
  description?: string
  slots?: {
    default?: string
    image?: string
    description?: string
  }
}
