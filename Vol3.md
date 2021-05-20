# 林不渡的前端周刊VOL.3

>  5.17 - 5.23
>
>  以后的前端周刊将会发布在[FE-Weekly](https://github.com/linbudu599/FE-Weekly)，不会再发布到掘金等平台。
>
>  更新时间不定，从周一六点到周日十点，均有可能。
>
>  本期包含项目：10个
>
>  关键词：ESBuild插件、使用require处理TS文件、Vite模块处理/预编译使用的词法分析库

## 工程

- [folio](https://github.com/microsoft/folio)，微软的测试框架，同样遵循BDD的行为模式。严格来说不算是Jest的竞品，folio的思路更底层一些，从示例来看应该更倾向于基于folio封装上层的测试框架。同时，它比Jest也更加灵活一些，Jest只支持测试用例的skip与only注解，而folio则支持skip、fail、fixme、slow等。个人感觉会是不错的工具，等真正release稳定版后可能会出现一批新的基于folio的测试库。

- [graphql-react](https://github.com/jaydenseric/graphql-react)，轻量的GraphQL React客户端实现，基于context与hooks。就是发展趋势比较惨淡，因为说实话我觉得ApolloClient也不是特别笨重那种，并且人家功能强得多哇...

  P.S. 这个logo有点诡异

  ![logo](https://camo.githubusercontent.com/ba3731385cbf2740f29ae84b332fe105d9020aaceb3bee6abbc489ce8e404d2d/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6a617964656e73657269632f6772617068716c2d726561637440302e312e302f6772617068716c2d72656163742d6c6f676f2e737667)

- [esbuild-plugin-decorator](https://www.npmjs.com/package/esbuild-plugin-decorator)，我写的ESBuild插件，为ESBuild补齐了装饰器方面的能力，支持使用@swc/core或者TypeScript来编译装饰器。

- [esbuild-plugin-run](https://www.npmjs.com/package/esbuild-plugin-run)，又一个我写的ESBuild插件，用于在编译完成后用一个子进程执行编译的文件，在使用ESBuild来编译node应用时非常好用，不需要再手动输命令了。

- [esbuild-plugin-alias-path](https://www.npmjs.com/package/esbuild-plugin-alias-path)，还是我写的ESBuild插件！其实吧，这些ESBuild插件都是副产品，但是后面感觉可以抽出来单独发布就这么做了。这个插件用于处理alias以及tsconfig-paths，基本上如果想要用ESBuild来编译一个完整的Nest应用，decorator、run以及alias-path是必不可少的（还有一个今天刚发布的[node-externals](https://www.npmjs.com/package/esbuild-plugin-node-externals)）。

- https://reactive.how/，可视化展示RxJS中操作符的作用，以及Observable对象在管道中的流动情况，非常适合初学RxJS时对 **响应式编程** 建立基本概念。

- [superjson](https://github.com/blitz-js/superjson)，[BlitzJS](https://blitzjs.com/)作者的作品，用于处理JSON中带有Date、Map、Set、BigInt的情况，原生的JSON.stringify并不支持这些，因此superjson在其基础上做了封装。作者的最初思路来自于NextJS的`getServerSideProps`等方法不支持传递Date这些日期对象，但Blitz基于Next+GraphQL，在GraphQL中是存在着Date等一系列特殊标量的，所以作者就自己动手整了个。

- [require-ts](https://www.npmjs.com/package/@adonisjs/require-ts)，允许你使用require文件处理ts。本质上在require注册了ts为扩展名，然后实时使用tsc编译、缓存等。这一思路在[Vuepress@next](https://github.com/vuepress/vuepress-next/blob/f91651c3c7248fdabfa19cb9bdcdba4c28622eec/packages/%40vuepress/cli/src/utils/allowTs.ts)也得到了体现，但有几点不同：

  - Vuepress中，使用ESBuild编译，很明显速度快的不是一点点。
  - 但由于使用ESBuild编译，[externals](https://github.com/vuepress/vuepress-next/blob/f91651c3c7248fdabfa19cb9bdcdba4c28622eec/packages/%40vuepress/cli/src/utils/esbuildUtils.ts#L16)是被写死的，因此只能确保被require的文件中没有额外的external。

- [@2fd/graphdoc](https://github.com/2fd/graphdoc)，基于GraphQL Schema的静态页面生成，我觉得挺奇怪的，因为GraphQL Schema可读性这么好（和Swagger差不多吧），但是目前只有这一个稍微成熟点的SSG框架。如果后面能研究懂Vitepress、Vuepress这种方案，我还挺想自己做一套的。

- [es-module-lexer](https://github.com/guybedford/es-module-lexer)，CJS/ESM的词法分析库（注意，和Babel、Ts-morph不同，它专注于模块的词法拆分），支持动态导入，使用方式简洁的离谱，大概是这样：

  ```typescript
  import { init, parse } from 'es-module-lexer/dist/lexer.js';
  
  (async () => {
    await init;
  
    const source = `
      import { a } from 'asdf';
      export var p = 5;
      export function q () {
  
      };
  
      // Comments provided to demonstrate edge cases
      import /*comment!*/ ('asdf');
      import /*comment!*/.meta.asdf;
    `;
  
    const [imports, exports] = parse(source, 'optional-sourcename');
  
    // Returns "asdf"
    imports[0].n
    source.substring(imports[0].s, imports[0].e);
    // "s" is shorthand for "start"
    // "e" is shorthand for "end"
  
    // Returns "import { a } from 'asdf';"
    source.substring(imports[0].ss, imports[0].se);
    // "ss" is shorthand for "statement start"
    // "se" is shorthand for "statement end"
  
    // Returns "import /*comment!*/ ('asdf')"
    source.substring(imports[1].d, imports[1].e + 1);
  })();
  ```

  另外，在Vite的预编译优化与模块地址重写中，也使用了es-module-lexer来分析依赖关系，见[node/optimizer/scan.ts](es-module-lexer)、[node/plugins/importAnalysis.ts](https://github.com/vitejs/vite/blob/d36e10ed99fe765a5f25268bdf8252fe0b026701/packages/vite/src/node/plugins/importAnalysis.ts)。