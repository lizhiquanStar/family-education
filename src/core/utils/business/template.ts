import { PpsGlobalApi } from '@/config/global.api'
import {
  FormDetailAdapter,
  Field
} from '@/components/base/form-detail/src/BaseFormDetail.adapter'
const FormProcessType = ['date-picker', 'input']
function getField(dynamicModules) {
  const field: Field[] = []
  dynamicModules.assetDynamicFormSchema.form.map(form => {
    field.push({
      label: dynamicModules.assetDynamicFormSchema.schema[form.key].title,
      name: FormProcessType.includes(form.type) ? form.key : `${form.key}Name`
    })
  })
  return field
}
/**
 * 获取模版，并对模版进行处理，满足当前动态表单展示
 * @param accountType 账户类型
 * @param category 账户：account/ 产品：product/ 资产：holding
 * @returns FormDetailAdapter[]
 */
export async function GetTemplate(
  accountType,
  formModel: { [key: string]: any },
  category = 'account'
) {
  const temParams = {
    category,
    subCategory: accountType,
    renderer: 'web'
  }
  const formTemplateConfig: FormDetailAdapter[] = []
  const [res] = await PpsGlobalApi.getTemplate(temParams)
  if (!res) return []
  res.dynamicModules.map(item => {
    item.enabled &&
      formTemplateConfig.push({
        formModel: formModel,
        title: item.name,
        name: item.code,
        form: [
          {
            fieldConfig: getField(item)
          }
        ]
      })
  })
  return formTemplateConfig
}
