module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true
      }
    ],
    [
      'import',
      {
        libraryName: 'element-plus',
        customStyleName: name =>
          `element-plus/packages/theme-chalk/src/${name.slice(3)}.scss`
      },
      'element-plus'
    ]
  ]
}
