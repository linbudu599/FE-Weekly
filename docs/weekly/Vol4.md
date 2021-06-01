# 林不渡的前端周刊VOL.4

>5.14 - 5.30
>
>本期包含项目：9个
>
>关键词：快速加载应用配置、将Rust语法带到TS中来、又一个HTTP请求库、又一个Monorepo构建工具

- [cosmiconfig](https://github.com/davidtheclark/cosmiconfig)，帮助快速加载应用配置，整合了常见的几种配置存放位置，如package.json的属性、JSON/YAML/rc(如.babelrc .eslintrc)文件、xxx.config.js。

  搜索顺序大概是这样的：

  ```js
  [
    'package.json',
    `.${moduleName}rc`,
    `.${moduleName}rc.json`,
    `.${moduleName}rc.yaml`,
    `.${moduleName}rc.yml`,
    `.${moduleName}rc.js`,
    `.${moduleName}rc.cjs`,
    `${moduleName}.config.js`,
    `${moduleName}.config.cjs`,
  ]
  ```

  我记得看到过不少著名项目在用，一时找不到了...，除了提供配置文件搜索，还提供了同步异步的API以及缓存能力。

  

- [ts-results](https://github.com/vultix/ts-results)，TypeScript的Rust Results实现。在Rust中，Result是一种用于处理错误的方式，我们用TS的角度来理解，Result接受两个泛型，i的一个为正确的返回值的变量类型，第二个则为错误的返回值的类型。

  ```rust
  enum Result<T, E> {
     Ok(T),
     Err(E),
  }
  ```

  然后在可能抛出错误的函数中返回result

  ```rust
  #[derive(Debug)]
  enum Version { Version1, Version2 }
  
  // 如果能解析，就能返回Ok包裹的值
  // 否则返回Err包裹的值
  fn parse_version(header: &[u8]) -> Result<Version, &'static str> {
      match header.get(0) {
          None => Err("invalid header length"),
          Some(&1) => Ok(Version::Version1),
          Some(&2) => Ok(Version::Version2),
          Some(_) => Err("invalid version"),
      }
  }
  
  let version = parse_version(&[1, 2, 3, 4]);
  // 做不同的处理
  match version {
      Ok(v) => println!("working with version: {:?}", v),
      Err(e) => println!("error parsing header: {:?}", e),
  }
  ```

  知乎上也有这么个问题：[JavaScript能否把Rust的Option和Result抄过来？](https://www.zhihu.com/question/444739095)

  再来看看ts-results的使用方式：

  ```typescript
  import { existsSync, readFileSync } from 'fs';
  import { Ok, Err, Result } from 'ts-results';
  
  function readFile(path: string): Result<string, 'invalid path'> {
      if (existsSync(path)) {
          return new Ok(readFileSync(path)); // new is optional here
      } else {
          return new Err('invalid path'); // new is optional here
      }
  }
  
  // Typescript now forces you to check whether you have a valid result at compile time.
  const result = readFile('test.txt');
  if (result.ok) {
      // text contains the file's content
      const text = result.val;
  } else {
      // err equals 'invalid path'
      const err = result.val;
  }
  ```

  我个人当然希望JS中能支持越来越多的新特性，但是关于错误处理这个，如果直接抄过来，JS似乎就不再是JS了（没内味儿了）。所以还是由TS啊Flow啊这些的来支持吧。

  

- [ky](https://github.com/sindresorhus/ky)，基于fetch的HTTP请求库，和axios以及got不同的是它只面向现代浏览器。同时，零依赖、极简的实现、没有花里胡哨的功能，推荐在个人小型项目中使用。

  

- [preconstruct](https://github.com/preconstruct/preconstruct)，monorepo下的开发/构建工具，接管了link、构建、发布工作，也支持单package仓库（就是普通的啦）。有个问题是只支持babel编译，对于TypeScript项目也只能使用`@babel/preset-typescript`。

  

- [posh-git](https://github.com/dahlbyk/posh-git)，为Windows下的PowerShell提供部分Git能力，类似于iterm2，但是只有git的这么些功能。

  ![C:\Users\Keith\GitHub\posh-git [main ≡ +0 ~1 -0 | +0 ~1 -0 !]> ](https://github.com/dahlbyk/posh-git/wiki/images/PromptDefaultLong.png)

  

- [tsyringe](https://github.com/microsoft/tsyringe)，微软出品的依赖注入方案，竞品有[TypeDI](https://github.com/typestack/typedi)、[InversifyJS](https://github.com/inversify/InversifyJS)等。和TypeDI相比，在Service（也有的叫Provide、Injectable）与Inject这两个必备装饰器之外，还提供了autoInjectable、injectAll、injectWithTransform、scoped、singleton（scoped与singleton的效果一般别的框架使用`@Injectable(SCOPE.SINGLETON)`这种方式来实现），更加灵活多变一点，也更契合目前装饰器的主流场景：作为Node应用的底层使用。

  

- [majestic](https://github.com/Raathigesh/majestic)，Jest的GUI，带给你Cypress那种在可视化界面上看着测试用例一个个变绿的快感。

  ![img](https://github.com/Raathigesh/majestic/raw/master/image.png)

或许能帮助你养成喜爱写测试的习惯也说不定。

（在终端里看Jest打印结果是真的不太舒服）




- [nvs](https://github.com/jasongin/nvs)，看名字就知道和nvm一样是NodeJS的版本管理，但是nvm是用shell写的，nvs则大部分是JS代码，并且在Windows上的支持也好得多（nvm在Windows上只能用Linux子系统或者Bash运行）。



- [json-graphql-server](https://github.com/marmelab/json-graphql-server)，类似于[json-server](https://github.com/typicode/json-server)，都是从一个文件来快速启动一个Fake服务，但json-graphql-server启动的是GraphQL Server，作者的动机主要是为了帮助初学者快速启动一个GraphQL服务（自己写的话确实麻烦啊，Type、Resolver，还有一个Server）。推荐在学习的前期使用这个库结合GraphiQL来搭建起对GraphQL的整体概念。

