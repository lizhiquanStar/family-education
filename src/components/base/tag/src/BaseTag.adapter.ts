export type Type = 'default' | 'primary' | 'success' | 'danger' | 'warning'

export interface TagAdapter {
  text?: string | number
  type?: Type
  size?: 'large' | 'medium'
  color?: string
  show?: true | false
  plain?: false | true
  round?: false | true
  mark?: false | true
  textColor?: string
  closeable?: false | true
  on?: {
    click?(e: MouseEvent): void
    close?(e: MouseEvent): void
  }
}
