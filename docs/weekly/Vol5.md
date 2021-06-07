# 林不渡的前端周刊VOL.4

>5.31 - 6.6
>
>本期包含项目：7个
>
>关键词：实时DB、svelte的ApolloClient binding、混沌测试、Nest周边工具库

- [nest-jsx](https://github.com/nestjsx)，一组NestJS的周边工具库，提供了不少有用的工具，如
  - nestjs-config，使用单独的一个Module来集中管理应用的所有配置，我觉得这种方式很不错
  - nest-router，类似于上一个，不过管理的是路由
  - nestjs-flub，提供格式化过的错误信息页面，类似于EggJS的错误页面。
- [rxdb](https://github.com/pubkey/rxdb) JS的实时数据库，支持几乎所有JS的环境如浏览器、Node、RN等，基于RxJS的API，支持离线模式、发布-订阅模式以及兼容常见ORM。还没有在实战中玩过，但看起来是很好玩也很强大的东西。
- [typegraphql-prisma](https://github.com/MichalLytek/typegraphql-prisma) 从Prisma Schema生成TypeGraphQL的类型定义以及CRUD的 Resolver，只能说作者创造力是真的强（还提供了TypeGraphQL + Nest的binding）。前端的确是越来越懒人化了，尤其是在GraphQL这种Schema First的东西上，类似GraphQL-Code-Generator、GenQL、Hasura Engine等等各种方案层出不穷，以后可能新项目只要一顿generate就搞定了...
- [svelte-apollo](https://github.com/timhall/svelte-apollo) 看起来像svelte版本的Apollo Client，但其实不是，更像是binding，因为还是需要使用`@apollo/client`包，即其中的`ApolloClient `来创建客户端实例，然后再绑定到svelte应用上。从这一点看，[apollo-angular](https://github.com/kamilkisiela/apollo-angular)才可以说是完整版本的Apollo Client实现。
  - 另外，目前只有React/Android/IOS版本的Apollo Client是由官方维护的，而Vue版本之前也是，后来被拆出去交给Vue官方团队了。
- [gremlins.js](https://github.com/marmelab/gremlins.js) Web/Node应用的混沌测试工具，有些同学可能没有了解过混沌测试，简单介绍下，单元测试与E2E测试通常是 按照预期行为编写测试用例 - 测试用例通过 的行为模式，这就使得测试只会按照常规得用户行为。如果用户瞎点把网站点崩了呢？比如哪个点击绑定事件没写好，用户电脑稍微卡了下导致连续点击十几下，页面直接卡死？这个时候就需要混沌测试了~ 通过无意识、无规律的测试用例来避免出现预期外的情况。
- [nodejs-mobile](https://github.com/JaneaSystems/nodejs-mobile) 能在Android与IOS上跑的NodeJS，辣是真的牛，等以后有机会接触客户端了一定要尝试下。

- [graphql-lodash](https://github.com/APIs-guru/graphql-lodash) 通过GraphQL Directives来在Query语句中使用Lodash的API，如 `@_(get: "obj-key")`，只能说创造力是真的强...

  ![Find the planet with the biggest population](https://github.com/APIs-guru/graphql-lodash/raw/master/docs/planet_with_max_population.png)

  

