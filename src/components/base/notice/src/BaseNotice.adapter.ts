type NoticeMode = 'closeable' | 'link'
export interface NoticeAdapter {
  mode?: NoticeMode
  title?: string
  color?: string
  background?: string
  leftIcon?: string
  delay?: number | string
  speed?: number | string
  scrollable?: boolean
  wrapable?: boolean
  slots?: {
    leftIcon?: string
    rightIcon?: string
  }
  on?: {
    click?(e: MouseEvent): void
    close?(e: MouseEvent): void
    replay?(): void
  }
  reset?: () => void
}
