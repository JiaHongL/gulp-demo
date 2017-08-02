## ㄧ、前提
這是一個簡單介紹 npm 和 gulp 的Demo.
<br />
<br />

## 二、NPM介紹 (Node Package Manager)

npm是一個套件管理的工具，用管理專案下所使用的套件與開發環境上所使用的工具，通常裝Node時就會一併被安裝.

<br />

#### I.初始化:
1.輸入一些專案的相關資料，並產生 Package.json.    
```sh
  npm init   
```
<br />

#### II.安裝套件：安裝套件分四種.  

1.基本安裝：單純安裝在專案下的 node_modules，沒在 Package.json 做紀錄.
```sh
  npm install jquery
```

2.全域安裝：安裝在系統下的 node_modules，通常是套件需要在終端機打指令或是 cli 的工具. (-g = -global)  
```sh
  npm install gulp -g 
```

3.專案套件安裝：安裝專案使用到的套件到專案下的node_modules，並記錄在 Package.json 的 dependencies. (--save) 
```sh
  npm install jquery --save 
```

4.開發環境套件安裝：安裝開發環境使用的套件到專案下的node_modules，並記錄在 Package.json 的 devDependencies. (--save-dev)
```sh
  npm install gulp-uglify --save-dev 
```
>gulp-uglify 是一個壓縮JS的工具套件，像這類的套件只會用在開發環境，通常歸類在devDependencies.    

<br />

#### III.Demo的Package.json介紹:  
這邊可以看到如果有使用加--save指令的話，安裝套件的版本和分類就會被記錄在 Package.json 裡，這邊我們看到gulp也被記錄在 devDependencies ，而這個 gulp 是用 --save-dev 安裝的，因為我們在撰寫gulp的task時也會用到gulp,所以也必須在專案下載安裝一次.

![alt text](https://1.bp.blogspot.com/-JEUnmbqTGAg/WYE0PfhoaSI/AAAAAAAAAxg/YGjA7M36vRsS_ZKC4g5lidpR88aSnM_TACLcBGAs/s320/%25E8%259E%25A2%25E5%25B9%2595%25E5%25BF%25AB%25E7%2585%25A7%2B2017-08-02%2B%25E4%25B8%258A%25E5%258D%258810.04.42.png "選擇性的標題")

<br />

#### IV.如果你的肝和我一樣還很新鮮的話，可能會有這些疑問:

##### Q：安裝完套件後怎麼引入到html呢？  
##### A：這邊有三種方式介紹
1.自己手動從 node_modules 裡面搬出來，放在專案的某個資料夾.  
2.使用工具把 dependencies 紀錄的套件從 node_modules 搬出來，放在專案某個資料夾.如 demo 中會用到的 deLinker 這個工具套件.  
3.使用某cli 如 Angular Cli 或 使用 Webpack ， 只要做些配置它就會自己去 node_modules 尋找套件然後幫引入.  
> node_modules只是下載放置套件的地方，通常上線時會過濾並不會一起上傳，所以才會有以上三種方式做處理，如有使用git的話，通常都會新增一個.gitinore檔，來過濾上傳的檔案.    
- [各式.gitinore create 參考](https://www.gitignore.io/)  

<br />

##### Q：為何要分dependencies和devDependencies，不是都一樣安裝在專案下的node_modules？  
##### A：因為如果專案要給其他人開發時，別人才可以選擇要不要全部安裝.
1.全部安裝(dependencies + devDependencies)
```sh
  npm install
```

2.只安裝專案套件(dependencies)
```sh
  npm install --production
```

3.只安裝開發環境套件(devDependencies)
```sh
  npm install --dev
```

<br />

##### Q：如果 node_modules 裡的套件要做移除要怎麼辦呢？  
##### A：npm有提供指令 uninstall 
1.移除專案的 node_modules 裡 jquery.
```sh
  npm uninstall jquery --save 
```
> 記得要加--save，這樣移除時也會順便更新 Package.json 的紀錄.  

2.移除專案的 node_modules 裡 gulp-uglify.
```sh
  npm uninstall gulp-uglify --save-dev 
```

3.移除全域的 node_modules 裡 gulp.
```sh
  npm uninstall gulp -g
```

<br />

##### Q：可以安裝指定版本的套件嗎？  
##### A：npm install 套件名稱＠版本號
1.安裝jquery 2.1.0 版本.
```sh
  npm install jquery@2.1.0  --save 
```
<br />
<br />
## 三、Gulp介紹  
簡單來說就是用gulp配合一些套件去執行開發環境自動化的事情.

#### I.全域安裝 gulp (終端機上會打gulp指令)
```sh
  npm install gulp -g
```

<br />

#### II.專案安裝 gulp (攥寫gulpfile.js會用到)
```sh
  npm install gulp --save-dev
```

<br />

#### III.專案下建立一個gulpfile.js檔案.


#### IV.介紹gulp簡單用法

1.把 gulp 引入 和 工具套件 引入.  
```sh
  const gulp = require('gulp');
  const sass = require('gulp-sass');
```

2.gulp.src('xxx/xxx.xxx')：選擇某個檔案輸入.  
```sh
  gulp.src('./scss/style.scss')
```

3.pipe()：執行一些功能
```sh
  .pipe(sass())
```

4.gulp.dest('xxx/xxx')：輸出處理後檔案到某個檔方.  
```sh
  .pipe(gulp.dest('./www/css/'))
```

5.寫成一個task
```sh
  gulp.task('sass', function() {
      gulp.src('./scss/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css/'))
  });
```
> 在終端機打 gulp sass，就會執行這個task.   
> 從 gulp.src()->pipe()->gulp.dest()，這樣就完成了一個簡單的stream.

6.gulp.watch(path,tasks)：監聽某資料夾下的文件，如有變動則執行某些task.  
```sh
    gulp.task('watch', function() {
        gulp.watch('./scss/style.scss', ['sass']);
    });
```

7.gulp default tasks：終端機打 gulp 時 , 預設執行某些task.  
```sh
    gulp.task('default', ['sass','watch']);
```

<br />

## 四、gulp-demo介紹   

#### I.使用到的套件  
```sh
    const gulp = require('gulp'); 
    const webserver = require('gulp-webserver');
    const concat = require('gulp-concat');
    const uglify = require('gulp-uglify');
    const depLinker = require('dep-linker');
    const compass = require('gulp-compass');
    const autoprefixer = require('gulp-autoprefixer');
    const fse = require('fs-extra')
    const babel = require('gulp-babel');
```
介紹：  
    gulp：用來寫gulp的處理stream.  
    gulp-webserver：建立一個webserver執行專案.  
    gulp-concat：合併檔案.  
    gulp-uglify：壓縮醜化js檔案.  
    dep-linker：會抓package.json的dependencies，到node_modules尋找，然後複製到某個資料夾.
    gulp-compass：sass 編譯成 css.  
    gulp-autoprefixer：對css檔案裡的屬性，自動加前綴.
    fs-extra：可以做一些檔案的處理.  
    gulp-babel：es6 轉譯成 es6，需要另外安裝 babel-preset-es2015，請參考package.json.  

<br />

#### II. webserver task  
```sh
    gulp.task('webserver', () => {
        gulp.src('./src')
            .pipe(webserver({
                port: 8000,
                livereload: true,
                directoryListing: false,
                open: true,
                fallback: 'index.html'
            }));
    });
```
介紹：  
webserver 執行的路徑、跑的port、自動刷新...等設定.
> 各套件詳細參數請自行google.  

<br />

#### III. compass task  
```sh
    gulp.task('compass', () => {
        return gulp.src('src/style/scss/*.scss')
            .pipe(compass({
            sass: 'src/style/scss/',
            css: 'src/style/css/',
            sourcemap: false,
            style: 'compact',
            comments: false
            }))
            .pipe(autoprefixer('last 2 versions'))
            .pipe(gulp.dest('src/style/css/'));
    })
```
介紹：  
這邊輸入了rc/style/scss/下全部 scss 檔案，然後使用 compass 套件做編譯，在使用 autoprefixer 加前綴，最後輸出到src/style/css/下.  

<br />

#### IV. copydependencies:src task   
```sh
    gulp.task('copydependencies:src', () => {
        return depLinker.linkDependenciesTo('src/assets/plugins');
    });
```
介紹：  
這邊輸入了src/style/scss/下全部 scss 檔案，然後使用 compass 套件做編譯，在使用autoprefixer 加前綴，最後輸出到src/style/css/下.  

<br />

#### V. uglifyJS task  
```sh
    gulp.task('uglifyJS', () => {
        return gulp.src('src/js/*.js')
            .pipe(babel({
            presets: ['es2015']
            }))
            .pipe(concat('app.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('src/js/min'));
    });
```

介紹：    
這邊輸入了src/js/下全部js檔案，然後使用babel做轉譯，合併成一個叫app.min.js的檔案，然後進行壓縮醜化，最後輸出到src/js/min下.    

<br />

#### VI. watch task  
```sh
    gulp.task('watch', () => {
        gulp.watch('src/style/scss/*.scss', ['compass']);
        gulp.watch('src/style/scss/*/*.scss', ['compass']);
        gulp.watch('src/js/*.js', ['uglifyJS']);
        gulp.watch('package.json', ['copydependencies:src']);
    });
```
介紹：    
這個watch task分別去做了四個watch的動作，只要檔案有變動就會執行對應的task.  

<br />

#### VII. copyfile task
```sh
    gulp.task('copyfile', () => {
        // remove dist folder
        fse.remove('./dist').then(() => {
            // output html
            gulp.src('src/*.html').pipe(gulp.dest('dist/'));
            // output js
            gulp.src('src/js/min/app.min.js').pipe(gulp.dest('dist/js/min'));
            // output css
            gulp.src('src/style/css/style.css').pipe(gulp.dest('dist/style/css/'));
            // output assets folder
            fse.copy('src/assets', 'dist/assets')
            .then(() => console.log('success!'))
            .catch(err => console.error('assets error', err));
        }).catch(err => console.error('remove dist error', err));
    });
```
介紹：    
這是一個輸出專案到 dist 資料夾的 task，首先我們會先把原本的 dist 資料夾移除，然後進行 Html、Js、Css 檔案 和 assets資料夾的搬移動作，最後搬移到dist 資料夾.  
> assets資料夾通常是放些 images 、 js plugins 、 css framework 等檔案.  

<br />

#### VIII. product task
```sh
    gulp.task('product', ['copyfile']);
```
介紹： 
當專案開發完成時，要做輸出的動作，雖然這邊只做搬移的動作，但實際上可能會在做些其他動作，如 api切換等.  

<br />

#### IX. gulp default
```sh
    gulp.task('default', ['webserver', 'watch']);
``` 
介紹： 
終端機打 gulp 時，預設執行webserver和watch這兩個task.

<br />
<br />

> 以上這個gulpfile.js設定僅供參考，因為本身現在比較常用Angular cli，擔心會有遺漏的地方，如有錯誤歡迎在[issues](https://github.com/JiaHongL/gulp-demo/issues) 提出建言，感謝.
