---
title: 深入理解vue中的slot与slot-scope 
date: 2019-10-26 20:48:18
categories:
- vue
tags:
- vue
---

单个插槽 | 默认插槽 | 匿名插槽
<!-- more -->
## 单个插槽
首先是单个插槽，单个插槽是vue的官方叫法，但是其实也可以叫它默认插槽，或者与具名插槽相对，我们可以叫它匿名插槽。因为它不用设置name属性。
单个插槽可以放置在组件的任意位置，但是就像它的名字一样，一个组件中只能有一个该类插槽。相对应的，具名插槽就可以有很多个，只要名字（name属性）不同就可以了。

下面通过一个例子来展示。

父组件：

    <template>
        <div class="father">
            <h3>这里是父组件</h3>
            <child>
                <div class="tmpl">
                <span>菜单1</span>
                <span>菜单2</span>
                <span>菜单3</span>
                <span>菜单4</span>
                <span>菜单5</span>
                <span>菜单6</span>
                </div>
            </child>
        </div>
    </template>

子组件：

    <template>
        <div class="child">
            <h3>这里是子组件</h3>
            <slot></slot>
        </div>
    </template>

## 具名插槽

匿名插槽没有name属性，所以是匿名插槽，那么，插槽加了name属性，就变成了具名插槽。具名插槽可以在一个组件中出现N次，出现在不同的位置。下面的例子，就是一个有两个具名插槽和单个插槽的组件，这三个插槽被父组件用同一套css样式显示了出来，不同的是内容上略有区别。

父组件：

    <template>
    <div class="father">
        <h3>这里是父组件</h3>
        <child>
        <div class="tmpl" slot="up">
            <span>菜单1</span>
            <span>菜单2</span>
            <span>菜单3</span>
            <span>菜单4</span>
            <span>菜单5</span>
            <span>菜单6</span>
        </div>
        <div class="tmpl" slot="down">
            <span>菜单-1</span>
            <span>菜单-2</span>
            <span>菜单-3</span>
            <span>菜单-4</span>
            <span>菜单-5</span>
            <span>菜单-6</span>
        </div>
        <div class="tmpl">
            <span>菜单->1</span>
            <span>菜单->2</span>
            <span>菜单->3</span>
            <span>菜单->4</span>
            <span>菜单->5</span>
            <span>菜单->6</span>
        </div>
        </child>
    </div>
    </template>

子组件：

    <template>
        <div class="child">
            // 具名插槽
            <slot name="up"></slot>
            <h3>这里是子组件</h3>
            // 具名插槽
            <slot name="down"></slot>
            // 匿名插槽
            <slot></slot>
        </div>
    </template>

## 作用域插槽 | 带数据的插槽

最后，就是我们的作用域插槽。这个稍微难理解一点。官方叫它作用域插槽，实际上，对比前面两种插槽，我们可以叫它带数据的插槽。什么意思呢，就是前面两种，都是在组件的template里面写

    匿名插槽
    <slot></slot>
    具名插槽
    <slot name="up"></slot>

但是作用域插槽要求，在slot上面绑定数据。也就是你得写成大概下面这个样子。

    <slot name="up" :data="data"></slot>
    export default {
        data: function(){
        return {
            data: ['zhangsan','lisi','wanwu','zhaoliu','tianqi','xiaoba']
        }
        },
    }

我们前面说了，插槽最后显示不显示是看父组件有没有在child下面写模板，像下面那样。

    <child>
    html模板
    </child>

写了，插槽就总得在浏览器上显示点东西，东西就是html该有的模样，没写，插槽就是空壳子，啥都没有。OK，我们说有html模板的情况，就是父组件会往子组件插模板的情况，那到底插一套什么样的样式呢，这由父组件的html+css共同决定，但是这套样式里面的内容呢？

正因为作用域插槽绑定了一套数据，父组件可以拿来用。于是，情况就变成了这样：样式父组件说了算，但内容可以显示子组件插槽绑定的。

我们再来对比，作用域插槽跟单个插槽和具名插槽的区别，因为单个插槽和具名插槽不绑定数据，所以父组件提供的模板一般要既包括样式又包括内容，上面的例子中，你看到的文字，“菜单1”，“菜单2”都是父组件自己提供的内容；而作用域插槽，父组件只需要提供一套样式（在确实用作用域插槽绑定的数据的前提下）。

下面的例子，你就能看到，父组件提供了三种样式(分别是flex、ul、直接显示)，都没有提供数据，数据使用的都是子组件插槽自己绑定的那个数组（一堆人名的那个数组）。

    <template>
        <div class="father">
            <h3>这里是父组件</h3>
            <!--第一次使用：用flex展示数据-->
            <child>
            <template slot-scope="user">
                <div class="tmpl">
                <span v-for="item in user.data">{{item}}</span>
                </div>
            </template>

            </child>

            <!--第二次使用：用列表展示数据-->
            <child>
            <template slot-scope="user">
                <ul>
                <li v-for="item in user.data">{{item}}</li>
                </ul>
            </template>

            </child>

            <!--第三次使用：直接显示数据-->
            <child>
            <template slot-scope="user">
            {{user.data}}
            </template>

            </child>

            <!--第四次使用：不使用其提供的数据, 作用域插槽退变成匿名插槽-->
            <child>
            我就是模板
            </child>
        </div>
    </template>