
module.exports = {
  "title": "倘若有一天",
  // "description": "blog",
  "dest": "dist",
  "head": [
    [
      "link",
      {
        "rel": "icon",
        "href": "/header.jpg"
      }
    ],
    [
      "meta",
      {
        "name": "viewport",
        "content": "width=device-width,initial-scale=1,user-scalable=no"
      }
    ]
  ],
  // "theme": "foo",
  "themeConfig": {
    // "huawei": true,
    "displayAllHeaders": false,
    "mode": "light",
    modePicker: false,
    "themePicker": {
      "colorName1": 'red',
      "colorName2": 'yellow',
      "colorName3": 'blue'
    },
    "friendLink": [],
    "nav": [
      // {
      //   "text": "博客",
      //   "link": "/blog/",
      //   "icon": "reco-blog"
      // },
      {
        "text": "前端",
        "link": "/knows/",
        "icon": "reco-blog"
      },
      // {
      //   "text": "组件",
      //   "link": "/vueUIDoc/",
      //   "icon": "reco-api"
      // },
      {
        "text": "数据可视化",
        "link": "/guide/",
        "icon": "reco-api"
      },
      // {
      //   "text": "时间轴",
      //   "link": "/timeline/",
      //   "icon": "reco-date"
      // },
      // {
      //   "text": "掘金",
      //   "icon": "reco-juejin",
      //   "link": "https://juejin.im/user/5d6f947051882537fb103bc1",
      // },
      // {
      //   "text": "",
      //   "icon": "reco-github",
      //   "link": "https://github.com/xiuyuan-wang",
      // }
    ],
    "type": "blog",
    "blogConfig": {
      // "category": {
      //   "location": 2,
      //   "text": "分类"
      // },
      // "tag": {
      //   "location": 3,
      //   "text": "Tag"
      // }
    },
    "logo": "/header.jpg",
    "search": true,
    "searchMaxSuggestions": 10,
    "subSidebar": "auto",
    // "sidebar":  {
    //   '/days/': [],
    //   '/views/': [
    //     {
    //       title: '指南',
    //       collapsable: false,
    //       children: [
    //         'react/guide'
    //       ]
    //     },
    //   ],
    //   '/knows/': [],
    //   '/guide/': [
    //     {
    //       title: '指南',
    //       collapsable: true,
    //       children: [
    //         ''
    //       ]
    //     },
    //     {
    //       title: '基础阶段',
    //       collapsable: true,
    //       children: [
    //         'guide/scene',
    //         'guide/tech',
    //         'guide/canvas',
    //         'guide/svg',
    //         'guide/webgl',
    //         'guide/zrender',
    //         'guide/d3',
    //         'guide/three',
    //         'guide/highcharts',
    //         'guide/antv',
    //         'guide/echarts',
    //         'guide/echarts-basic',
    //         'guide/compare',
    //         'guide/bmap',
    //         'guide/bmap-harder',
    //         'guide/bmap-datav',
    //         'guide/bmap-webpack',
    //         'guide/echarts-map',
    //         'guide/amap',
    //         'guide/amap-harder',
    //         'guide/amap-datav',
    //       ]
    //     },
    //     {
    //       title: '数据报表项目',
    //       collapsable: true,
    //       children: [
    //         'report/guide',
    //         'report/qa',
    //         'report/summary',
    //       ]
    //     },
    //     {
    //       title: '数据大屏项目',
    //       collapsable: true,
    //       children: [
    //         'screen/vue3',
    //       ]
    //     },
    //     {
    //       title: '数据可视化组件库',
    //       collapsable: true,
    //       children: [
    //         'libs/start',
    //         'libs/svg',
    //         'libs/svgAnimation'
    //       ]
    //     },
    //     {
    //       title: '移动报表项目',
    //       collapsable: true,
    //       children: [
    //         'mobile/guide',
    //       ]
    //     }
    //   ]
    // },
    "sidebar": require('./router'),
    "lastUpdated": "Last Updated",
    "author": "倘若有一天",
    "authorAvatar": "/header.jpg",
    // "record": "xxxx",
    "startYear": "2017"
  },
  "markdown": {
    "lineNumbers": true
  }
}