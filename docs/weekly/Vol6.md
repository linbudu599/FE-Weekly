# 林不渡的前端周刊VOL.6

>6.7 - 6.13
>
>本期包含项目：9个
>
>关键词：GraphQL的模块化/结合Prisma/Mock、终端日志美化、命令行应用的E2E测试、mini版本的TypeScript

- [graphql-modules](https://github.com/Urigo/graphql-modules) GraphQL的模块化方案，通过为每个模块注册专属的typeDef、resolver、middleware以及provider（供依赖注入使用），使得不同功能的GraphQL代码能够被很好的解耦开来。能够将所有GraphQL Schema聚合在一起生成一份schema，这样就使得能很方便的和GraphQL Server或者是[GraphQL-Tools](https://www.graphql-tools.com/)这一类Schema Visitor的工具库一起使用。

  > - 不过话说回来，生成schema的能力应该是标配...
  > - 我还是更喜欢Nexus或者TypeGraphQL的方案，毕竟GraphQL是SDL First的，如果还是需要自己手写原生的类型和解析器，不论框架有多强大都感觉缺了点什么。同时，用JS语法书写Schema的方式，天生就支持了模块化的拆分。

- [msw](https://github.com/mswjs/msw)，思路新颖的mock服务，支持浏览器与Node（在浏览器下通过worker启动），支持REST与GraphQL。注意msw并不是mockjs的替代品，反而是可以结合使用有奇效的工具。

- [genql](https://github.com/remorses/genql)，很早就开始关注的一个GraphQL Generator系列工具库，基于GraphQL Schema生成携带TS类型定义以及query、mutation方法的JS代码，类似于Prisma的思路。所以说GraphQL项目真的只需要一顿generate就能跑起来了，还自带全链路的类型定义。

  > 其实理论上来说是可以一步到位的，Prisma Schema -> GraphQL Schema -> JS Client + CRUD Resolver，我要是不这么菜就自己搞了

- [consola](https://github.com/unjs/consola)，终端日志神器，再也不用担心console.log平平无奇了，支持浏览器和node，效果大致如下：

  ![Screenshot 2020-01-28 at 14 15 15](https://user-images.githubusercontent.com/904724/73267133-af6b2f00-41d8-11ea-9f16-4a8243d19c43.png)

- [mini-typescript](https://github.com/sandersn/mini-typescript)，mini版本的TypeScript Compiler实现，你可以通过这个项目来学习官方版本的Compiler架构，对于编译原理零基础的同学推荐配置神光老师的系列教程食用。

- [nixt](https://github.com/vesln/nixt)，命令行应用的E2E测试工具，支持中间件和插件体系，可以和ava、jest、mocha这一类测试框架一起使用，也可以直接和assert一起使用。

- [ts-transformer-keys](https://github.com/kimamula/ts-transformer-keys)，蛮神奇的一个工具，从TS接口获取到可实际使用的接口成员，如：

  ```typescript
  import { keys } from 'ts-transformer-keys';
  
  interface Props {
    id: string;
    name: string;
    age: number;
  }
  const keysOfProps = keys<Props>();
  
  console.log(keysOfProps); // ['id', 'name', 'age']
  ```

  具体实现没有很复杂的地方，就是使用TS的Compiler API做AST分析，拿到类型数据即可。作者还写了个类似的，从Enum定义获得Enum成员：[ts-transformer-enumerate](https://github.com/kimamula/ts-transformer-enumerate)。

- [paljs](https://github.com/paljs)，一套工具，提供了Prisma / React / GraphQL的相关支持，如[prisma-tools](https://github.com/paljs/prisma-tools)，从Prisma Schema生成GraphQL的CRUD代码（和我上面说的其实不太一样）。另外，还提供了Prisma Schema -> Nexus Schema的转化等，最夸张的是还提供了一套UI组件库...

- [prisma-nestjs-graphql](https://github.com/unlight/prisma-nestjs-graphql)，从Prisma Schema生成@nest/graphql的类型定义，所以说这些东西排列组合起来是真的多啊...