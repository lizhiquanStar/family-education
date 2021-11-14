export type FieldType =
  | 'tel'
  | 'text'
  | 'digit'
  | 'number'
  | 'search'
  | 'password'
  | 'textarea'

export type FieldTextAlign = 'left' | 'center' | 'right'
export interface Options {
  label?: string | number | boolean
  value?: string | number | boolean
}
export type FieldClearTrigger = 'always' | 'focus'
type TypeField = 'textarea' | 'text'

type Hidden = (field: Field, formModel: FormModel) => Boolean
export interface Field {
  label?: string
  name?: string
  selectKey?: string
  dicKey?: string
  hidden?: Boolean | Hidden
  formType?: '' | 'arrayForm'
  type?: TypeField
  valType?: '' | 'money' | 'percent' | 'date' | 'time' | 'select' | 'dicSelect' // 对值进行格式话
  defaultFill?: string | number
  valTypeConfig?: {
    min?: number
    max?: number
    options?: Options[]
    pn?: boolean // 是否需要添加“+/-”符号
    ratio?: boolean // 百分比是否需要除以一百
  }
  placeholder?: string
  colon?: boolean
  required?: boolean
  center?: boolean
  labelClass?: string | Array<string>
  labelWidth?: number | string
  labelAlign?: FieldTextAlign
  inputAlign?: FieldTextAlign
  leftIcon?: string
  rightIcon?: string
  iconPrefix?: string
  arrayformConfig?: FormArr
  slots?: {
    label?: string
    input?: string
    leftIcon?: string
    rightIcon?: string
    button?: string
    extra?: string
  }
  on?: {
    clickLeftIcon?(e: MouseEvent): void
    clickRightIcon?(e: MouseEvent): void
  }
}
interface FormModel {
  [key: string]: any
}
export interface FormArr {
  className?: string
  title?: string
  fieldConfig?: Field[]
}
export interface FormDetailAdapter {
  name?: string | number
  title?: string
  direction?: 'vertical' | 'horizontal'
  size?: 'sm' | 'md'
  sub?: string
  colon?: boolean
  readonly?: boolean
  showError?: boolean
  labelWidth?: number | string
  labelAlign?: FieldTextAlign
  inputAlign?: FieldTextAlign
  slot?: {
    default?: String
  }
  form?: FormArr[]
  formModel?: FormModel | FormModel[]
}
