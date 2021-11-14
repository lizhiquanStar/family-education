export function PpsEditPublishConfig() {
  return {}
}

export const userItem = {
  1: [
    {
      title: '阶段',
      icon: 'label-o',
      url: 'BaseInfo',
      class: 'header-cell',
      value: 'jdId',
      label: 'jdCn',
      type: 'text',
      itemType: 'select'
    },
    // {
    //   title: '年级',
    //   icon: 'label-o',
    //   url: 'BaseInfo',
    //   class: 'header-cell',
    //   value: 'njCn'
    // },
    {
      title: '科目',
      icon: 'label-o',
      url: 'BaseInfo',
      class: 'header-cell',
      label: 'kmCn',
      value: 'kmId',
      type: 'text',
      itemType: 'select'
    },
    {
      title: '描述',
      icon: 'label-o',
      url: 'BaseInfo',
      class: 'header-cell',
      value: 'fbContent',
      type: 'textarea',
      itemType: 'input'
    }
  ],
  2: [
    // {
    //   title: '阶段',
    //   icon: 'label-o',
    //   url: 'BaseInfo',
    //   label: 'jdCn',
    //   value: 'kmId',
    //   type: 'text',
    //   itemType: 'select'
    // },
    {
      title: '教师资格证',
      icon: 'label-o',
      url: 'BaseInfo',
      class: 'header-cell',
      label: 'jszgCn',
      value: 'zgzId',
      type: 'text',
      itemType: 'select'
    },
    {
      title: '费用',
      icon: 'label-o',
      url: 'BaseInfo',
      class: 'header-cell',
      value: 'fy',
      type: 'text',
      itemType: 'input'
    }
  ]
}
