export interface NavBarAdapter {
  title?: string
  leftText?: string
  rightText?: string
  leftArrow?: boolean
  border?: boolean
  fixed?: boolean
  placeholder?: boolean
  zIndex?: number | string
  safeAreaInsetTop?: boolean
  slots?: {
    title?: string
    left?: string
    right?: string
  }
  on?: {
    clickLeft?(e: MouseEvent): void
    clickRight?(e: MouseEvent): void
  }
}
