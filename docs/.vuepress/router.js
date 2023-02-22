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
      title: '数据报表项目',
      collapsable: true,
      children: [
        'react/guide',
      ]
    },
  ],
};
