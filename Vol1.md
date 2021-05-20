# 林不渡的前端周刊VOL.1

> 5.3 - 5.9
>
> 开了个新坑，前端周刊，搜罗、推荐好玩强大fantastic的前端开源项目，包括React/Angular/GraphQL/Node/工程化/CICD/理财/等等等等相关的内容（其实也就是我那一周刚好瞅到的东西啦hhh，但主要还是这几个方面），每一期包含10个以内的项目，所有项目我都会自己去简单尝试一下再写评语。
>
> - [GitHub仓库地址](https://github.com/linbudu599/FE-Weekly)

## 内容

> 本期包含项目：7个
>
> 本期包含项目分类：工程化、GraphQL、NodeJS、其他

### 工程化

- [rome](https://github.com/rome/tools)

  一套新的前端工具链，开发团队的意图在于整合目前前端分散到各个不同库的能力：编译、构建、格式化、代码规范、单元测试。并且不是简单的**整合**，它不会基于已有的这些工具如Babel、ESLint、Webpack等，Rome的想法是从零开始。**事实上，Rome这个库没有任何依赖...，一个都没有。** 作者从零实现了非常多的基础库，如下图中的formatter、html-parser、js的ast相关等。

  

  ![image-20210505213324185](C:%5CUsers%5C96457%5CAppData%5CRoaming%5CTypora%5Ctypora-user-images%5Cimage-20210505213324185.png)

  

  我并不太认为它能够撼动Babel、ESLint的地位，除非它能够像Vite、Snowpack一样带来船新的开发体验。

  目前的开发进度好像只到对JS/TS的Linter能力，看起来还有很长的路要走。

  

- [@nrwl/nx](https://nx.dev/)

  我想了五分钟才给nx找到一个合适的定义：Angular的工作流 + Monorepo + 插件体系 + 开发工具套件 + ...。你可以在nx的workspace里以monorepo的方式，用着各种内置好的开发服务器、构建能力、Lint、单测、E2E等，舒服的开发自己的各种规模的项目。

  如果你没有使用过Angular的工作流，我在这里简单介绍一下。它主要由两个部分组成：schematic和builder。

  - schematic：或者叫generator更好理解，它可以快速生成项目中的一部分代码，即`ng generate component CompA`，Nest中也有类似的脚手架命令。
  - builder：或者叫executor。我们正常项目中的serve/dev/start/build命令都属于executor的范畴。

  Nx中也实现了这么一套Angular的工作流，在nx中就叫generator与executor（Nx也支持Angular的schematic和builder）。

  至于插件体系，nx本身的能力并不包含框架相关，它可以支持React/Angular/Nest/Next/Gatsby/Express应用的运行，这些能力都来自于官方的插件：

  ![image-20210505214945550](https://budu-oss-store.oss-cn-shenzhen.aliyuncs.com/image-20210505214945550.png)

  这也就意味着如果你使用的框架不受支持，那么你可以自己实现一套，如社区的Vue、Electron插件，以及我正在开发的ESBuild、Vite插件等。

  nx预计会是我2021年花费精力最多的一个项目之一，因为**真-的-很-好-玩**啊，在很早之前我自己写的脚手架就是这种思路（当然笨比得多），多个模板，内置开发构建能力，但是自己写真的挺麻烦的... 感谢nx！
  
  

- [ts-morph](https://ts-morph.com/)

  对TypeScript 编译器API的封装，明显降低了使用难度。属于命令式的使用（[jscodeshift](https://github.com/facebook/jscodeshift) 也属于这个范畴，[babel-traverse](https://www.babeljs.cn/docs/babel-traverse) 则是Visitor模式）。代码大概是这样的：

  ```typescript
  import {
    Project,
    StructureKind,
    ExportDeclarationStructure,
    OptionalKind,
  } from 'ts-morph';
  
  const project = new Project();
  
  const sourceFile = project.createSourceFile(path, content, {
    overwrite: true,
  });
  
  const exportDeclaration: OptionalKind<ExportDeclarationStructure> = {
    kind: StructureKind.ExportDeclaration,
    isTypeOnly: false,
    moduleSpecifier: `./${directory}/${fileName}`,
  };
  
  sourceFile.addExportDeclaration(exportDeclaration);
  ```

  这一段代码会为源文件新增一段 `export * from "./dir/file"` 的导入。

  整体来说它降低了很多AST的操作门槛，但是文档目前还在完善，在使用过程中很可能需要自己挨个试一遍名字听起来像的方法。

### GraphQL

- [graphql-rate-limit](https://github.com/ravangen/graphql-rate-limit)

  GraphQL 版本的 [rate-limit](https://github.com/nfriedly/express-rate-limit)，实现了大部分的能力，包括放行策略以及基于Redis、PM2、MongoDB、MySQL等等的存储。它的实现是基于[GraphQL Directive](https://graphql.org/learn/queries/#directives)，我之前写过这个概念相关的文章，但是考虑到受众少就没法，见 [你不知道的GraphQL Directives](https://linbudu.top/posts/2021/02/04/graphql%E6%8C%87%E4%BB%A4%E8%AF%A6%E8%A7%A3.html)。



### NodeJS

- [execa](https://github.com/sindresorhus/execa)

  究极强化版的`child_process`，由于真的太强了介绍不完，我就简单说下。

  - 更好的windows支持！在windows上，如果没有指定子进程的`shell`为true，通常需要在命令后加上`.cmd`后缀，但有可能带来新的问题...
  - 更易用的API，如Promise接口与错误处理、stdin/stdout处理、防止进程的意外存货等。
  - 更多的请看文档吧，感觉展开收不住了。

- [npm-run-path](https://github.com/sindresorhus/npm-run-path)

  > 和上面的是一个作者，这个作者有多少库我也没数过，但你大概率用到过...

  我们都知道npm script会在执行时把项目目录下的node_modules/bin目录中的命令暂时添加到环境变量process.env.PATH中，如果你在为项目编写一些脚本，想要使用本地安装的模块，同时又不想`./node_modules/bin/command`这样使用，就可以使用npm-run-path来将本地安装的模块添加到环境变量中。如：

  ```javascript
  // 官方示例
  const childProcess = require('child_process');
  const npmRunPath = require('npm-run-path');
  
  // `foo` is a locally installed binary
  childProcess.execFileSync('foo', {
  	env: npmRunPath.env()
  });
  ```

  另外，如果你使用了`execa`而不是原生的`child_process`模块，也可以直接使用`execa`中的`preferLocal`来使用本地安装的模块。



### 其他

- [vite-plugin-mix](https://github.com/egoist/vite-plugin-mix)

  国内的开源大佬[egoist](https://github.com/egoist)作品，类似与execa与npm-run-path的作者，有非常多质量高而又短小精悍的库。

  这个Vite插件很有趣，让你可以同时开发前后端应用（但不是一体化应用如Blitz、Midway-Hooks那种同时），比如访问/login是前端页面，访问/api/login就是后端接口了，类似于NextJS的[API Routs](https://nextjs.org/docs/api-routes/introduction)。

  会让我觉得很感兴趣是因为这个项目的README里放了Apollo-GraphQL和Vercel的例子，让我想到可以整一个Vite + Apollo + Vercel Functions的例子。
  
  放一下官网的例子：
  
  ```typescript
  // vite.config.ts
  import { defineConfig } from 'vite'
  import mix from 'vite-plugin-mix'
  
  export default defineConfig({
    plugins: [
      mix({
        handler: './handler.ts',
      }),
    ],
  })
  
  // handler.ts
  import type { Handler } from 'vite-plugin-mix'
  
  export const handler: Handler = (req, res, next) => {
    if (req.path === '/hello') {
      return res.end('hello')
    }
    next()
  }
  ```
  
  你可以在handler里面用任意实现了这个接口的库，比如Nest、Express、Apollo等（虽然Nest Apollo是因为都有基于Express的实现）。
  
  
  
  个人感觉这个混合模式还是挺好玩的~



**本期就到这里，我们下期再见~**