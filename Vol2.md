# 林不渡的前端周刊VOL.2

> 2020.5.10 - 2020.5.16
>
> 本期包含项目：8个
>
> 本期包含项目分类：GraphQL、NodeJS、React、Angular、工程、其他

## Angular

- [ngrx-forms](https://github.com/MrWolfZ/ngrx-forms)，React和Vue社区有 [formil](https://github.com/formik/formik) 和 [formily](https://github.com/alibaba/formily) 这种专门优化的表单方案，现在Angular社区也有了ngrx-forms！。从名字很明显可以看出来，ngrx-form基于[ngrx](https://ngrx.io/)，在这一点上有点像[redux-form](https://github.com/redux-form/redux-form)。当然，学习成本要高一些，毕竟ngrx包括了@ngrx/store、@ngrx/router-store、@ngrx/entity等六七个适用于不同场景的模块。



## React

- [react-static](https://github.com/react-static/react-static)，说实话，这个标星9.6k的项目我最近才发现...，我原本以为React社区的主流SSG框架主要是NextJS和Gatsby，加上新秀dumi。亮点在于对React生态的全面支持。



## NodeJS

- [piscina](https://github.com/piscinajs/piscina)，NodeJS的线程池实现，对于我这种没学过别的后端语言的弱鸡来说，确实很新奇。



## GraphQL

- [graphql-crunch](https://github.com/banterfm/graphql-crunch)，通过 拍平GraphQL 响应 >>> 检查重复键值 >>> 替换重复键值为首次出现的键值地引用 来减少GraphQL响应的体积。（太丧心病狂了，本来GraphQL通过仅获取需要字段已经很好地减少了响应体积，但是人类还不满足）



## 工程

- [changesets](https://github.com/atlassian/changesets)，为Monorepo提供的版本、CHANGELOG管理方案。它的思路是在项目下使用专有的.changeset文件夹管理多个changeset（即你造成的变更），然后使用cli将多个changesets合并进本次release中。在这一点上和 [lerna-changelog](https://github.com/lerna/lerna-changelog) 完全不同，后者的思路是基于上一次标记过的commit（tagged commit）历史之后所有被合并的PR，来生成CHANGELOG。
- [type-fest](https://github.com/sindresorhus/type-fest)，类型体操选手狂喜，一套TS工具类型，感觉比起 [utility-types](https://github.com/piotrwitek/utility-types) 更加贴近实际使用，实现也不会太过花里胡哨。



## 其他

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts)，从JSON Schema获取TS类型。这一点思路有点类似于Fastify，这个框架的卖点就是：快！在JSON输出的场景下速度要比原生的JSON.stringify方法都快上几倍，原因就是Fastify从JSON Schema获得了这个JSON中各种字段的类型，不再需要像原生的JSON.stringify方法那样每次为不同类型字段准备不同的序列化方法，这个思路被单独抽离为[fastify/fast-json-stringify](https://github.com/fastify/fast-json-stringify)，使用例子也能看出来，它需要预先传入JSON Schema。
- [peerjs](https://github.com/peers/peerjs)，有对象的前端同学可能想过给对象搞个可以多设备一起看电影同步进度的小玩具，peerjs就是用来干这个的，基于WebRTC，对音视频流做了优化。如果不会写native，直接写网页也可以。这里有个简单demo [peerjs-video](https://peerjs-video.glitch.me/)，开两个网页，然后输入一个网页的peer ID到另一个网页的connect即可。