module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      },
      'element-ui'
    ]
    // [
    //   'component',
    //   {
    //     libraryName: 'at',
    //     libraryDirectory: 'src/components'
    //   },
    //   'at'
    // ]
  ]
}

// 单个引入
// plugins: [
//   [
//     'component',
//     {
//       libraryName: 'element-ui',
//       styleLibraryName: 'theme-chalk'
//     },
//     'element-ui'
//   ]
// ]
