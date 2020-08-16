module.exports = {
  "title": "倘若有一天",
  // "description": "blog",
  "dest": "public",
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
  "theme": "reco",
  "themeConfig": {
    // "huawei": true,
    "mode": "light",
    modePicker: false,
    "themePicker": {
      "colorName1": 'red',
      "colorName2": 'yellow',
      "colorName3": 'blue'
    },
    "friendLink": [
      {
        "title": "掘金",
        "avatar": "https://mirror-gold-cdn.xitu.io/16cfbdbdfd582853a24?imageView2/1/w/180/h/180/q/85/format/webp/interlace/1",
        "link": "https://juejin.im/user/5d6f947051882537fb103bc1"
      },
      {
        "title": "github",
        "avatar": "https://mirror-gold-cdn.xitu.io/16cfbdbdfd582853a24?imageView2/1/w/180/h/180/q/85/format/webp/interlace/1",
        "link": "https://github.com/xiuyuan-wang"
      }
    ],
    "nav": [
      {
        "text": "博客",
        "link": "/",
        "icon": "reco-blog"
      },
      {
        "text": "UI文档",
        "link": "/vueUIDoc/",
        "icon": "reco-api"
      },
      // {
      //   "text": "日常积累",
      //   "link": "/days/",
      //   "icon": "reco-api"
      // },
      // {
      //   "text": "基础知识",
      //   "link": "/knows/",
      //   "icon": "reco-api"
      // },
      {
        "text": "TimeLine",
        "link": "/timeline/",
        "icon": "reco-date"
      },
      {
        "text": "掘金",
        "icon": "reco-juejin",
        "link": "https://juejin.im/user/5d6f947051882537fb103bc1",
      },
      {
        "text": "GitHub",
        "icon": "reco-github",
        "link": "https://github.com/xiuyuan-wang",
      }
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
    // "sidebar": "auto",
    "sidebar": {
      '/days/': [
        {
          title: '20170401',
          path: '/20170401',
          collapsable: true,
          children: [{
            title: '20170918',
            path: '20170918',
            collapsable: true,
            children: ['20170521']
          }]
        },  
      ],
      '/vueUIDoc/': [
        {
          title: '20170401',
          collapsable: true,
          children: [{
            title: '20170918',
            path: '20170918',
            collapsable: true,
            children: ['20170521']
          }]
        },  
      ],
      '/knows/': [
        // {
        //   title: '20170401',
        //   path: '20170401',
        //   collapsable: true,
        //   children: [{
        //     title: '20170918',
        //     path: '20170918',
        //     collapsable: true,
        //     children: ['20170521']
        //   }]
        // },  
      ],
    },
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