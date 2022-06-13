# 项目名称：mouv

本项目是基于 JHipster 7.1.0,使用 Pro710 蓝图生成，您可以在相应位置找到文档和帮助：[https://www.jhipster.tech/documentation-archive/v7.1.0](https://www.jhipster.tech/documentation-archive/v7.1.0) ， Pro710 蓝图参考文档：[JHipster.Pro](http://www.jhipster.pro/) 。

## 开发说明

在生成此项目之前，必须在计算机上安装和配置以下依赖项：

1. [Node.js][]: 我们使用 Node 来运行开发 Web 服务器并构建项目。
   根据您的系统，可以从源安装或作为预打包的捆绑包安装 Node。

安装 Node 之后，您应该能够运行以下命令来安装开发工具。 仅当[package.json](package.json)中的依赖项发生更改时，才需要运行此命令。

```
npm install
```

如果您的 npm 版本大于 7.0，则可能必须运行以下命令。

```
npm install  --legacy-peer-deps
```

本项目使用 npm 脚本和[Angular CLI][] with [Webpack][]作为我们的构建系统。

在两个单独的终端中运行以下命令，以创建愉悦的开发体验，当硬盘驱动器上的文件更改时，浏览器会自动刷新。

```
./mvnw
npm start
```

Npm 还用于管理此应用程序中使用的 CSS 和 JavaScript 依赖项。 您可以通过在[package.json](package.json)中指定较新的版本来升级依赖项。
您还可以运行`npm update`和`npm install`来管理依赖项。
在任何命令上添加`help`参数，以查看如何使用它。 例如，`npm help update`。

The `npm run` 命令将列出可用于该项目的所有脚本。

## OAuth 2.0 / OpenID Connect

恭喜你！ 您选择了一种保护 JHipster 应用程序的绝佳方法。 如果您不确定什么是 OAuth 和 OpenID Connect（OIDC），请参阅[What the Heck is OAuth?](https://developer.okta.com/blog/2017/06/21/what-the-heck-is-oauth)。

要登录您的应用，您需要启动并运行[Keycloak](https://keycloak.org)。 JHipster 团队为您创建了一个 Docker 容器，该容器具有默认用户和角色。 使用以下命令启动 Keycloak。

```
docker-compose -f src/main/docker/keycloak.yml up
```

为此映像配置了`src/main/resources/config/application.yml`中的安全设置。

```yaml
spring:
  ...
  security:
    oauth2:
      client:
        provider:
          oidc:
            issuer-uri: http://localhost:9080/auth/realms/jhipster
        registration:
          oidc:
            client-id: web_app
            client-secret: web_app
```

### JHipster 控制中心

JHipster Control Center 可以帮助您管理和控制您的应用程序。 您可以使用以下命令启动本地控制中心服务器（可从 http://localhost:7419 访问）：

```
docker-compose -f src/main/docker/jhipster-control-center.yml up
```

### Okta

如果您想使用 Okta 代替 Keycloak，那么使用[Okta CLI](https://cli.okta.com/)很快。 安装后，运行：

```shell
okta register
```

然后，在您的 JHipster 应用程序目录中，运行`okta apps create`并选择**JHipster**。 这将为您设置一个 Okta 应用程序，创建`ROLE_ADMIN`和`ROLE_USER`组，使用您的 Okta 设置创建`.okta.env`文件，并在您的 ID 令牌中配置`groups`声明。

运行`source .okta.env`并使用 Maven 或 Gradle 启动您的应用程序。 您应该能够使用您注册时使用的凭据登录。

如果您使用的是 Windows，则应安装[WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10)，以便使用`source`命令。

如果您想通过 Okta 开发人员控制台手动进行配置，请参见以下说明。

首先，您需要在<https://developer.okta.com/signup/>上创建一个免费的开发人员帐户。 之后，您将获得自己的 Okta 域，其名称类似于`https://dev-123456.okta.com`。

修改`src/main/resources/config/application.yml`以使用您的 Okta 设置。

```yaml
spring:
  ...
  security:
    oauth2:
      client:
        provider:
          oidc:
            issuer-uri: https://{yourOktaDomain}/oauth2/default
        registration:
          oidc:
            client-id: {clientId}
            client-secret: {clientSecret}
security:
```

在 Okta 中创建一个 OIDC 应用，以获取一个`{clientId}`和`{clientSecret}`。 为此，请登录您的 Okta Developer 帐户，然后导航至**Applications**> **Add Application**。 单击**Web**，然后单击**Next**按钮。 为应用命名，您将记住该名称，将`http://localhost:8080`指定为基本 URI，将`http://localhost:8080/login/oauth2/code/oidc`指定为登录重定向 URI。 单击**Done**，然后编辑并添加`http://localhost:8080`作为注销重定向 URI。 将客户端 ID 和密码复制并粘贴到您的`application.yml`文件中。

创建一个`ROLE_ADMIN`和`ROLE_USER`组并将用户添加到其中。 修改 e2e 测试以在运行集成测试时使用此帐户。 您需要在`src/test/javascript/e2e/account/account.spec.ts`和`src/test/javascript/e2e/admin/administration.spec.ts`中更改凭据。

导航到**API** > **Authorization Servers**，单击**Authorization Servers**选项卡，然后编辑默认选项卡。 点击**Claims**标签，然后点击**Add Claim**。 将其命名为“groups”，并将其包含在 ID 令牌中。 将值类型设置为"Groups"，并将过滤器设置为`.*`的正则表达式。

进行这些更改之后，您应该一切顺利！ 如果您有任何问题，请将其发布到[Stack Overflow](https://stackoverflow.com/questions/tagged/jhipster)。 确保用"jhipster"和"okta"标记您的问题。

### PWA 支持

JHipster 附带 PWA（渐进式 Web 应用程序）支持，并且默认情况下处于关闭状态。 PWA 的主要组成部分之一是 service worker。

默认情况下，服务工作者初始化代码是禁用的。 要启用它，请取消注释`src/main/webapp/app/app.module.ts`中的以下代码：

```typescript
ServiceWorkerModule.register('ngsw-worker.js', { enabled: false }),
```

### 管理依赖

例如，要将[Leaflet][]库添加为应用程序的运行时依赖项，可以运行以下命令：

```
npm install --save --save-exact leaflet
```

要从开发中[DefinitelyTyped][]存储库中的 TypeScript 类型定义中受益，您可以运行以下命令：

```
npm install --save-dev --save-exact @types/leaflet
```

然后，您将导入库的安装说明中指定的 JS 和 CSS 文件，以便[Webpack][]了解它们：
Edit [src/main/webapp/app/app.module.ts](src/main/webapp/app/app.module.ts) file:

```
import 'leaflet/dist/leaflet.js';
```

Edit [src/main/webapp/content/scss/vendor.scss](src/main/webapp/content/scss/vendor.scss) file:

```
@import '~leaflet/dist/leaflet.css';
```

注意：Leaflet 还有其他要做的事情，我们在这里不做详细介绍。

有关如何使用 JHipster 进行开发的更多说明，请参阅在开发中使用[Using JHipster in development][]。

### 使用 Angular CLI

您也可以使用[Angular CLI][]生成一些自定义前端代码。

例如，以下命令：

```
ng generate component my-component
```

将生成一些文件：

```
create src/main/webapp/app/my-component/my-component.component.html
create src/main/webapp/app/my-component/my-component.component.ts
update src/main/webapp/app/app.module.ts
```

## 系统构建

### 打包为 Jar 包

要构建最终的 Jar 包并优化用于生产的 mouv 应用程序，请运行：

```
./mvnw -Pprod clean verify
```

上面过程中可能会因为测试失败而无法完成，请暂时忽略测试再运行，测试代码正在整理中。：

```
./mvnw -Pprod clean verify -DskipTests
```

这将打包和压缩客户端 CSS 和 JavaScript 文件。 它还将修改`index.html`，以便它引用这些新文件。
为确保一切正常，请运行：

```
java -jar target/*.jar
```

然后在浏览器中打开[http://localhost:8080](http://localhost:8080)。

有关更多详细信息，请参阅在生产中使用[Using JHipster in production][]。

### 打包为 War 包

要将应用程序打包为 War 包以将其部署到应用程序服务器，请运行：

```
./mvnw -Pprod,war clean verify
```

上面过程中可能会因为测试失败而无法完成，请暂时忽略测试再运行，测试代码正在整理中。

```
./mvnw -Pprod,war clean verify -DskipTests
```

## 测试

要启动应用程序的测试，请运行：

```
./mvnw verify
```

### 前端测试

单元测试由[Jest][]运行。 它们位于[src/test/javascript/](src/test/javascript/)中，可以与以下命令一起运行：

```
npm test
```

UI end-to-end tests are powered by [Cypress][]. They're located in [src/test/javascript/cypress](src/test/javascript/cypress)
and can be run by starting Spring Boot in one terminal (`./mvnw spring-boot:run`) and running the tests (`npm run e2e`) in a second one.

#### Lighthouse audits

You can execute automated [lighthouse audits][https://developers.google.com/web/tools/lighthouse/] with [cypress audits][https://github.com/mfrachet/cypress-audit] by running `npm run e2e:cypress:audits`.
You should only run the audits when your application is packaged with the production profile.
The lighthouse report is created in `target/cypress/lhreport.html`

有关更多信息，请参阅[Running tests page][]。

### 代码质量

Sonar 用于分析代码质量。 您可以使用以下命令启动本地 Sonar 服务器（可从 http://localhost:9001 访问）：

```
docker-compose -f src/main/docker/sonar.yml up -d
```

注意：我们在尝试 SonarQube 时已关闭[src/main/docker/sonar.yml](src/main/docker/sonar.yml)中的身份验证以提供开箱即用的体验，对于实际用例，请重新打开它。

您可以使用[sonar-scanner](https://docs.sonarqube.org/display/SCAN/Analyzing+with+SonarQube+Scanner)或使用 maven pluginmaven 插件运行 Sonar 分析。

然后，运行 Sonar 分析:

```
./mvnw -Pprod clean verify sonar:sonar
```

如果您需要重新运行 Sonar 阶段，请确保至少指定`initialize`阶段，因为 Sonar 属性是从 sonar-project.properties 文件加载的。

```
./mvnw initialize sonar:sonar
```

有关更多信息，请参阅[Code quality page][]。

## 使用 Docker 简化开发（可选）

您可以使用 Docker 来改善您的 JHipster 开发体验。 [src/main/docker](src/main/docker)文件夹中提供了许多 docker-compose 配置，以启动所需的第三方服务。

例如，要在 Docker 容器中启动 postgresql 数据库，请运行：

```
docker-compose -f src/main/docker/postgresql.yml up -d
```

要停止并删除容器，请运行：

```
docker-compose -f src/main/docker/postgresql.yml down
```

您还可以对应用程序及其依赖的所有服务进行完全 docker 化。
为此，请首先通过运行以下操作为您的应用构建 docker 映像：

```
./mvnw -Pprod verify jib:dockerBuild
```

然后运行：

```
docker-compose -f src/main/docker/app.yml up -d
```

有关更多信息，请参阅[Using Docker and Docker-Compose][]，此页面还包含有关 docker-compose 子生成器（`jhipster docker-compose`）的信息，该子生成器能够为一个或多个 JHipster 应用程序生成 docker 配置。

## 持续集成（可选）

要为您的项目配置 CI，请运行 ci-cd 子生成器（`jhipster ci-cd`），这将使您为许多 Continuous Integration 系统生成配置文件。 有关更多信息，请查阅[Setting up Continuous Integration][]页面。

[jhipster homepage and latest documentation]: https://www.jhipster.tech
[jhipster 7.1.0 archive]: https://www.jhipster.tech/documentation-archive/v7.1.0
[using jhipster in development]: https://www.jhipster.tech/documentation-archive/v7.1.0/development/
[using docker and docker-compose]: https://www.jhipster.tech/documentation-archive/v7.1.0/docker-compose
[using jhipster in production]: https://www.jhipster.tech/documentation-archive/v7.1.0/production/
[running tests page]: https://www.jhipster.tech/documentation-archive/v7.1.0/running-tests/
[code quality page]: https://www.jhipster.tech/documentation-archive/v7.1.0/code-quality/
[setting up continuous integration]: https://www.jhipster.tech/documentation-archive/v7.1.0/setting-up-ci/
[node.js]: https://nodejs.org/
[webpack]: https://webpack.github.io/
[angular cli]: https://cli.angular.io/
[browsersync]: https://www.browsersync.io/
[jest]: https://facebook.github.io/jest/
[jasmine]: https://jasmine.github.io/2.0/introduction.html
[cypress]: https://www.cypress.io/
[leaflet]: https://leafletjs.com/
[definitelytyped]: https://definitelytyped.org/
