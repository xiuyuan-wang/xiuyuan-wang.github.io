module.exports = {
  '/blog/': [],
  '/days/': [],
  '/vueUIDoc/': [],
  '/guide/': [
    {
      title: '指南',
      collapsable: false,
      children: [
        ''
      ]
    },
    {
      title: '基础阶段',
      collapsable: true,
      children: [
        'guide/scene',
        'guide/tech',
        'guide/canvas',
        'guide/svg',
        'guide/webgl',
        'guide/zrender',
        'guide/d3',
        'guide/three',
        'guide/highcharts',
        'guide/antv',
        'guide/echarts',
        'guide/echarts-basic',
        'guide/compare',
        'guide/bmap',
        'guide/bmap-harder',
        'guide/bmap-datav',
        'guide/bmap-webpack',
        'guide/echarts-map',
        'guide/amap',
        'guide/amap-harder',
        'guide/amap-datav',
      ]
    },
    {
      title: '数据报表项目',
      collapsable: true,
      children: [
        'report/guide',
        'report/qa',
        'report/summary',
      ]
    },
    {
      title: '数据大屏项目',
      collapsable: true,
      children: [
        'screen/vue3',
      ]
    },
    {
      title: '数据可视化组件库',
      collapsable: true,
      children: [
        'libs/start',
        'libs/svg',
        'libs/svgAnimation'
      ]
    },
    {
      title: '移动报表项目',
      collapsable: true,
      children: [
        'mobile/guide',
      ]
    }
  ],
  '/knows/': [
    {
      title: '前端方案',
      children: [
        ['project/001','指南'],
        {
          title: '即时通讯', 
          children: [
            ['project/即时通讯/浏览器断网联网事件','浏览器断网联网事件'], 
            ['project/即时通讯/如何让定时器在页面最小化的时候不执行','如何让定时器在页面最小化的时候不执行'], 
            ['project/即时通讯/消息推送7种方案','消息推送7种方案'], 
            ['project/即时通讯/为什么不用TCP的keepalive设计心跳','为什么不用TCP的keepalive设计心跳'],
            ['project/即时通讯/一套高效的IM长连接自适应心跳保活机制','一套高效的IM长连接自适应心跳保活机制'],
            ['project/即时通讯/搭建websocket消息推送服务必须要考虑的几个问题','搭建websocket消息推送服务必须要考虑的几个问题'],
          ]
        },
        {
          title: '前端监控', 
          children: [
            ['project/前端监控/前端监控-性能监控','前端监控-性能监控'], 
            ['project/前端监控/前端监控-行为监控','前端监控-行为监控'], 
            ['project/前端监控/前端监控-错误监控','前端监控-错误监控'], 
            ['project/前端监控/前端监控-架构设计','前端监控-架构设计'],
            ['project/前端监控/前端日志上报','前端日志上报'],
            ['project/前端监控/神策分析','神策分析 Web JS SDK'],
          ]
        },
        ['project/PWA/使用offline-plugin实现PWA','使用offline-plugin实现PWA'],
        {
          title: '微前端', 
          children: [
            ['project/微前端/MicroApp','MicroApp']
          ]
        }
      ]
    },
    {
      title: 'css',
      children: [
        ['css/001','sass（scss）、less、postcss、stylus等的用法与区别'],
        ['css/002','正在梳理，敬请期待'],
        ['css/003','正在梳理，敬请期待'],
        ['css/004','正在梳理，敬请期待'],
      ]
    },
    {
      title: 'javascript',
      children: [
        ['javascript/001','js处理的8种跨域方法'],
        ['javascript/002','正在梳理，敬请期待'],
        ['javascript/003','正在梳理，敬请期待'],
        ['javascript/004','正在梳理，敬请期待'],
      ]
    },
    {
      title: 'vue',
      collapsable: true,
      children: [
        ['vue3/001','变量，ref，reactive，toRefs'],
        ['vue3/002','vuex的state，actions，getters，mutations的使用'],
        ['vue3/003','vue源码分析 - observer,dep,watch实现数据双向绑定'],
        ['vue3/004','vue源码分析 - vue运行机制全局概览'],
      ]
    },
    {
      title: 'react',
      collapsable: true,
      children: [
        ['react/001','react Hook'],
        ['react/002','10种React组件之间通信'],
        ['react/003','React Context 原理理'],
        ['react/004','Redux原理、Redux中间件原理'],
      ]
    },
    {
      title: 'webpack',
      collapsable: true,
      children: [
        ['webpack/Webpack面试题及答案','Webpack面试题及答案'],
        ['webpack/源码分析/1-准备工作','源码分析(一)准备工作'],
        ['webpack/源码分析/2-log+debug','源码分析(二)log+debug'],
        ['webpack/源码分析/3-加载资源','源码分析(三)加载资源'],
        ['webpack/源码分析/4-hooks原理','源码分析(四)hooks原理'],
        ['webpack/源码分析/5-代码生成','源码分析(五)代码生成'],
        ['webpack/源码分析/6-代码压缩和缓存','源码分析(六)代码压缩和缓存'],
        ['webpack/源码分析/7-childCompiler','源码分析(七)childCompiler'],
        ['webpack/源码分析/8-watch','源码分析(八)watch'],
        ['webpack/源码分析/9-sourcemap','源码分析(九)source map'],
      ]
    },
  ],
};
