Hexo Blog.



- node 版本：`nvm use 12`
- 在public下新建CNAME



3件套：

- 
- 
- 

前两个也可以，但是显示不太好。



方案一（和博客写法不兼容，很多公式无法显示）：

- https://github.com/hexojs/hexo-renderer-markdown-it/tree/4.1.0

    - ❎自带插件：`@renbaoshuo/markdown-it-katex`

    - ❎使用插件：https://github.com/hexojs/hexo-math/tree/3.0.4
    - ❎增加安装：https://github.com/phoenixcw/hexo-renderer-mathjax



方案二（没成功）：

- https://github.com/CHENXCHEN/hexo-renderer-markdown-it-plus





方案三（最终使用）：

- https://github.com/byronwanbl/hexo-renderer-markdown-it-katex



Error:

- hexo Template render error: (unknown path) Error: expected end of comment, got end of file：公式里有`{#`这种，一般表示统计个数。
