<template>
  <main class="about-snap" :class="{ 'now-last': snapLast, 'not-last': !snapLast }">
    <section class="about-snap-dev" :style="{ opacity: leaveOne }">
      <div class="about-snap-info">
        <h1>{{ snapList[0].title_1 }}</h1>
        <h2>{{ snapList[0].title_2 }}</h2>
      </div>
      <ul>
        <li
          :style="{ 'background-color': colors[0].val }"
          @mousemove="devOn(colors[0].no)"
          @mouseleave="devLeave()"
          class="about-snap-dev-item"
        >
          <div>
            <span>
              <p><i class="el-icon-cpu"></i>技术栈介绍</p>
            </span>
            <span>
              <p><i class="el-icon-money"></i>- 前端</p>
              <p>&nbsp;Echarts、Element UI、Vue2、DPlayer</p>
            </span>
            <span>
              <p><i class="el-icon-coin"></i>- 后端</p>
              <p>&nbsp;&nbsp;Node.js、轻服务、阿里云oss</p>
            </span>
          </div>
        </li>
        <li
          :style="{ 'background-color': colors[1].val }"
          @mousemove="devOn(colors[1].no)"
          @mouseleave="devLeave()"
          class="about-snap-dev-item"
        >
          <div>
            <span class="about-snap-devInfo">
              <i class="about-snap-txBox"></i>
              <span>
                <p><font class="el-icon-s-promotion"></font>（贲冠然）职责：</p>
                组织协调团队、成员分工、视频推荐、登录注册、权限控制、用户统计、页面发布、视频功能
              </span>
            </span>
            <span class="about-snap-devInfo">
              <i class="about-snap-txBox"></i>
              <span>
                <p><font class="el-icon-s-promotion"></font>（帅宇翔）职责：</p>
                nodejs、轻服务、后端项目搭建
              </span>
            </span>
          </div>
        </li>
        <li>
          <div
            :style="{ 'background-color': colors[2].val }"
            @mousemove="devOn(colors[2].no)"
            @mouseleave="devLeave()"
            class="about-snap-dev-item"
          >
            <div>
              <span class="about-snap-devInfo">
                <i class="about-snap-txBox"></i>
                <span>
                  <p><font class="el-icon-s-promotion"></font>（高佳乐）职责：</p>
                  主页、 <br />夜间模式
                </span>
              </span>
              <span class="about-snap-devInfo">
                <i class="about-snap-txBox"></i>
                <span>
                  <p><font class="el-icon-s-promotion"></font>（黄友艺）职责：</p>
                  我的发布与收藏
                </span>
              </span>
            </div>
          </div>
          <div
            :style="{ 'background-color': colors[3].val }"
            @mousemove="devOn(colors[3].no)"
            @mouseleave="devLeave()"
            class="about-snap-dev-item"
          >
            <div>
              <span class="about-snap-devInfo">
                <i class="about-snap-txBox"></i>
                <span>
                  <p><font class="el-icon-s-promotion"></font>（钱文浩）职责：</p>
                  about宣传页面、 <br />动画绘制
                </span>
              </span>
              <span class="about-snap-devInfo">
                <i class="about-snap-txBox"></i>
                <span>
                  <p><font class="el-icon-s-promotion"></font>（高宇航）职责：</p>
                  调试bug与 <br />丰富项目视频库
                </span>
              </span>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <section :style="{ opacity: leaveTwo }">
      <div class="about-snap-info">
        <h1>{{ snapList[1].title_1 }}</h1>
        <h2>{{ snapList[1].title_2 }}</h2>
        <p style="color: #fe5234">网站视频大多源自抖音（不用于商用活动，侵权立删）</p>
      </div>
      <div class="about-snap-single">
        <span class="about-snap-floatImg-1">
          <img
            src="https://lf1-cdn-tos.bytegoofy.com/goofy/ies/douyin_home_web/imgs/3_1.96996d5c.png"
            alt
          />
        </span>
        <span class="about-snap-floatImg-2">
          <img
            src="https://lf1-cdn-tos.bytegoofy.com/goofy/ies/douyin_home_web/imgs/3_2.b65d7830.png"
            alt
          />
        </span>
        <span class="about-snap-floatImg-3">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOYAAADmCAMAAAD2tAmJAAABXFBMVEVHcEz4cpnyoFD6faHnfFLuj1HvkVLsgFvvpU/rg1nnfl/dVGrshFPth1PvilzvnE/CO1XGP1jLQVv0q07YXmvwh2DzaZL3rk7KSVDsiEn1c5j4eZ7wnlL2dJrPRl71dpnpdk/kYID/60D/7kX+6Dz/7EP+5Tf+KV7+LXD+K2n+2TD+3zz+5Dv80kL5xUX+4zb9JlL7y0b91kL8JEj+3jP+4DT+5ED+K2T9zTT93Dv3qkPvi0j3u0r91DT7vD3xkkX9KFj+20L92Tr8xTj1s07xiWD5tED9u1XSIEL1n1m7IDrgID79xE/ylFz6Q368MEv6v07xmUX1I0f6sVbzrFD5zT30nkTzJ1jqeE3GHz3yf2TqlVP5V4rehEHqI0z5qFj1o0TxvDzXcUD/yFH7NnX/obrcKVTunlP2ZpHlojnekjbsrz3USmjoilrtg0rba2LtIT3QYT7mVHvpPGwgjDHpAAAAInRSTlMA/sH6G1JuC/8r+kaNv6Q899WR2/vaHoqw33PT8ZhpstrDB1/o4gAAFK9JREFUeNrsm+1PItkShwGB7gZhfANdxPFKjGgQFB0h7u174xhYcEBBwTAMohlgwB0hIv7/ya2qc053o+797DFdKJv9MB+ePL+q89Ktw2GXXXbZZZdddtlll1122WWXXXbZZZdddtlll112vfdS/JG1tUjEH1Y+LmI4sjrDa3U98lEpEdLpvMdyOp0zq5GPaNS/iow3ohB13f/hKNdmwCPgXUD14BdJnc4PJjQMKu8ZI2L2EPRiAqBr4Y8VWAbZ693/+vVrZubmgkgn9/frH4fTz1X2etsXv3jN3CAocH4Yn0RJkNs9AxNAL3rPvcnkPvJREisogXP7ZsYEBc7nyWTpQ8xbjVMiJP7g/LlxMs5eAzk3pNzqhMP+sKaIjguvc8ptohR14RScw8mSJtu6EVlbXTV2cxFNcShrSEmBtUDuwOcGMe8b/eHzZEEuyDVEdIpC1rU106W1dgCUOHv9/nC4IZPOCNuxmrs53LneG31pisRCUBxGF/3+81CiIaRYdnM37IfVtEuOiJW9mPk10+ijTmkww+vmbq7X47s5/n9WROzKLKOE/1z0GreI+VkWl+tOsZszxk2PlbUduUdkpGo0CHNpQZrEit3cds/4GNN1Z8eSVYMxm41n44hZGUqC6Tf3Oa+G6vbOlEcDMh6Pc5t9STDDq05zNzfNubP9j4xAmQXKojQ2I857Pmp6r1ZHS2XNtMYRNB5HmcViRY4RpNBG52Vgd6Ygs9aGjDOb8YZUmBHnq43O1MixzBwWVlMmx5Rh3VTWucxpRr48vogq48M6OTlhlMW5eRk2e2GU+Q9zdSqrJiJAxpGSyZybd8uQWZL5/7JqzJwsJ0SVBubc3IoMrblxP0HMnSmPWevaYcwcQsS8xk3KZmVOhvUkvHEz6T1PteMbM0dENc5EQu2LzFbmZGhN5X7y3Ou9mVWGmDW60WQ82SfKEsqsSNGa2tLkufGcfYPROnOsHolyv3HFMecWZLh61yaA2YhnX4ycuLk8TnskRrR5dXt7S5hSnDbDiPkMnG9G1VgjLZAnSLl/dYUyK005MutwbwyHfYMz/jKrJy8YCZFRcply7NuVjeFzv9+INywas28w7jPGEw7KZDZlyazD8XkInLfAGTfWyBPxsWo0REIdGjIlySzMoPkhHI1vGyQ0+3Y7kkZBeYiUDSFTlnsgxwJiIieQ8u3qC4+mRsZ52Lgak8ymNDKFTsZ5cjIVVtGOAvQQP4fQmKIzK/LcuCufAbMInAL09VwVkMh4aHTmt29ybPQE58pcpWhwNsRYtcxVQch+rmBrUCqRzBWHROWeR84iCy4cPYysGhYB75CrPESZJcCUTCbeYM5XkLOIQm8BdDqpnI8xEua4VGo2AXNFsjdJGGepWEJQmDBX1rm6z+PKa8wiK59MztlEo7clGC8IenjFozrFiJjgkslckO+1IA3mULOJyS0xUJD6BiPKHAuZMr514F4Azkqz2DeMIuiLumKUKFOmNXN6/YTgWo3eUnSnVR5ejcdvdKbidsgTYP8KNiiB9k1Qi8lDIRMoK2I3q2jeYCjgCwS8miSo7s9zlcq3JoECDWUXwMjp2GxMJpMzKbOu/CiP9cM3q0nToZUp0NJ4DEaBjhI7NiMrZHpC5/nz89H5OWD++BHySiJUweR+g+KgYyQdEynyYmSL5s5ACZ4blSfQoCbTKCLQJu0YgHSMdYVftJc1FhPFdX7G65z7/BGQ5mimLFhAKbucVLjkMjUXEd7d4deZ4AzKM3PdwiiSNrnTEl8xYc2kh2DuRWKs3dHvmcHpkWkV9c/j1AUm7hRIiyKytDNwu1S1Xq/xIk7ZYsuW0QUCBVKavPTTZJF1E2W9nssBYaFQKyDo2RnDlEon7W14k5JSKswxzR9lGSF1qEK1WoBCTq5zVr6drn9ljo8j0kqYsGQqHqIsVOlDZWIGZfyDBm1hnpOyots8LQqQ1WoZqtuFLzRaw9QiZ0DSv9vwixUGCyPrdiFlOc2qi6RVU2dI2j9PcQtSNmWXBWQynUwmiRQ4EfNHXtLQTpNSZD8BZQoYD7CSBwwUdHKbAYfcBQNpHnd5Ll1PIeRXLCRF0DJhos1ZKW26FUWbOjV7c4IyAZ8MkgJnuVq7Yza98l0pfPIGAyFfKBSc9SgcVVvUU6k0QmYymd1E4vgYjabTVT5qfR7ZKLXZUN6oUNCDoMoyRhZcAmViN0Gcx6gTbNI+yCdbZmd9eboZGOH3KO/zISjKhMgyl7u7e3vIadiE3pRs0GoBIDxnVwPwnc/7Hh+X5v0uiCyn3Nzc3drb2/tyfHx6gDbZpJUrs1qIIM0aIebwMUeRTSSIcnNra+/o6MvpKYa2jph5nyYZJbKdmdcDgLk0HLYMmZxyb+/oC9nUmc2gfJT8duCOTpMjUyajxDJtlnWyKdepOphnkMRIp+ZzkjkwZcaIUmCmyzoO2rxU+3YPU0mI7HaAYT7WWWdaZBqYOZIp02HT7bJQskPzGbTmcDgSMjc3MzELJk4gwgxJJtOErBXw62wEMpf4mM1sQmZjwClk4gTC1pRKJt2/GpRl1FlvIaZF5maMbOKyyTOLrRmS6brLHWVXk7WCUWoLMruk0gYokdndZDLJJmJe88x65cqsoERQtFlTsTV9hsxYjGWWMEHmdYoyG5Jqa7DMKJETGLtdwBxAZpcGpkyeWYGZTlFm5TqCBa2R7ZYBtYbLySMewJLUmTEDkybQdYoyG5LrItoFmDWe1263DDbriNniMjNEKQYttCbKhMz6JDtPB5lMBIXEdgtlXDWXaGtgDqCYRSYbQLLd6C0bMgGyDKS0apoDiE+g3a2toz0mkwaQbLcG3jNTJl43F2qwaj6yzH7N8Dkbo8OmpTOlu7f0RO/ElAXKbrdah1UTB1AyaZGJrXl0ZKwmPune+dIWWWi7jBKOWDCBRiTz2IK5xTFhAKnneQmvLZd5bxIlhFaFzMIASvI5a7YmZPY/1zBmW6N/uaWjdGhRZpNjwh7o0ZebHkDcJsrU64PRd6+48JyF8vjlUOuy2izkYA80ml5NOCUNoD8H//6Op2nNG2jxGgWkeEdIWwTMKqPsVnMwgeopyuxuZkomrCYpXW1973gcitcVHfBC0j88Ehj11muFakHYbPl4ZjMZCyZeXZ5e639efu+sOLTAQKWqwy+BjmZ5uypu7ZPH69HeYfe6l3OFKteJ60nLuByJmctJAmXm1Hbnye+J4gsXvBAUMNv4jgK0a9AVVQdqNLq4/OndCdZcNcEJZ2qfijLZHZDlEAYy/6u22k9Pf0TxIb0oBG212u3OilvzugZomNFHg+73xwmpBcg0LJujkXigsGlZTvYSIPPPS6DsqHV63UJP6VVdR1DE7Dw9rQSYZcGvLn56f5w66Szr6uj14QRbM3F6/RMj21ERMsWqWgXSunqJlE+XBqOeQ/56/f1xuomzDKN0pJq3s5bWPOYygRL40tf4kB6qXNVzDPOSv1VTpdIRVF30vL85hJzVnPo6s9iaX06v/0KZl/gk8DqJlaYH9Ck9xyWzKFf1VBk/jD/w7lZUxbsIFnIDNme/ZqyYMICYzA49vIbt7ukpf0Cf0h9QpogyAKZTqBmEPqjt9vv78xUFGlTPDQZvLiesMzsPSHl6TPX14OvBQTr18+/f7Y4q2pVeqsEfsgz8n2FLGAwGYSlV3lFwc4OceHAbiwlOHEDpv0BmGymBMAF1nKAXERCz85v6Nc2STNVN5R5+Y5hbYrcUDb6blVTx1AdGa8amM/uAMsllAh9cAyhipn8CTTuH92NJfJ3mIHmQPgDY1M+Hv+EftPl2CTdLg/+1dz6vaWxRHA/iODUkdREeQXBR1HGhRklR8ddEatqs3oMnvAnSIEQ3ohKh///mnZ937mhK0lWvZU7blIQu8un3e849c++5k9KFMyupVzKHfYqJh/ED8uxCKNttPJ8HOVnMxYbyVSaHIK+Bs7UDkVcb0y4xqTsV6frgGQzUBOmmra9QaHYt1hKPGUhOwAQxt0ugx4TFySH4BbqSlVcAmeiW1mtnNleuj1KzWWuyZ1FMoqRz6yZi3qKYStkY0IgUYJKVTbs0pkUU+6J1yZF9Tz+T3OtCMZuAiZ7doGURkjkbDRRzs93CUxtXJeT8/OULiblYbAiy1cLf/1JfCJwZN2ybvZI5IDJtwJ5tcmpiZrKYiAlQnyNQbbujhGUfo543krDjsSww2Cz9DaDI6Yic+XHc6QWqJqyau9lqi5kJ0lZVzMFNBDxbpGxTdKX6gsaLLTYSsrzcaluI/bwbj9iK2WMxDeZ2sYsoM2UKgTDRsyhmw2CibUnMXasV3STmNpET5My7U4F6xrNlSs0pFNRYTB6dacAD6HLDX260a4IJZSlCMTe4NzjlZklBiXOdc6cCUaHtBWXFDFub7QbLbLvWlDNAxdygxvApHdk3uoPBDVbf7RK0HFC/ROvMDc9topwZFzCvDh5PBBO+812EYlZxEKrJmGEEnl2imDUWs6tOhoYBKZuy7sh4KnDiw5nvTKGl1AxszN2mhZmJkLSZAAbFr2IBwraIJ8BATnHyUqxcU84vLCdglgoOFdqgZ6nZQN0izsyqMS0B7QSHPGswQcwp0yMnNfnYAdIz6FPOFUxSMwiMnEi01DKrlRY8C0CoMXS4Ylo6f0AnUyMBlE2Wkx9mWM0nB5KzYNaTAEH5cRNdG4mYspugmKhxm0Wjw2zABCdTZjawj6jyCistIKuZ+f3J6Zn5WUjNIO4PBiH17LwF1qRvnjCXpv1j0yImi0mUuvY0qDlSNX//yumNb2mwgkpQYHMaSrNvC5g7SkGD2QFMcnLECStprE/giPnf+qnkhJoywF8ux9mJZYjKzyHmMsImt2nE7HYwNaFdwr4ItbTVhAUF1s2nJwdKbW6smJSbgaZntcozbab64vYQJWzDdLmkJi49yygkzKqsPW1pdW8pNV3ALJgRfspN9W0cgTaA4ONpGDKlGY4iTBRzQJQ10zANUE1MTTw/yzqE2RM1bU79nF08GEylL9KR4m4XC+1SltKq9IXS0BPmh4Ubal5xqSU5e4EFquIGcaeLAZg90zFQod2BZWmRiQfH9VbH+OsaMX9/pfWtiyfIVgkSUYk5WdEeD7vFnFCXwrjMyqgxY2KdXQBmxoH9vYxcCUPMXnAAiRHbmNSKdzk5O7ks8YNMPFGNV5Gwzq4J04HePUd3wqQRkmysJOOoLOnePK8yIT6XCWWzpg09To6PQUzAdGF3z/tqubanVj3iDMoGNdDNFOQEoEEb8jXu8XEx7YiYsxVQPjnxXP31gc6qRU6l5N82ZxDXpMB4GNeZpj7HSFOInsWxKSizK8B8KTlxGJh5uLPWlPKxmPx5MmvLFigjlqkAN4mS5jZbYNnVYvHy4sbs5vWQMOliWO/15DSa2iZ+rSwZTBz1A8uugPIfNzbevaElJ+4HVY4pA6OpGjqRrTFljSlDFBMsu5q/fHNkRNUvIWZ0w3JKsa28FcEr5ZcpcTgsjMiyIKYzF678DMoZ4fylVW3fYKwcZKs5ShMxwbKLH6v5+cs3Z4bHc0OWczpoSAdfCSrBm2omSdm0PB0fhrctpETLuvPWi+yQ5Ix+QU6rAles9r4m2yZRa7cCyvNzp66cXw0fHvBkYDoYmPSsvA0amA8VFLMnmPWwH21+oJbn3516TcL1cDjG7ETb9uxm6L2g4lnqcev18H65Wf1gSpdG5L0SuraFPTg8Nf9CuTWgZeNZoIyWy91CKF2aEvKvKDvv4blR9Sy/Mz8tMXFiASxb7/eXy+GH83P3Xlh3/UzZeROFoeF8r55Uivjwl8Xs91uA+fT9+1+uzVAXSiJnn/Rs9qrK+Z4+oRLovZUOY94/DD+szz86NxLvZ1BO4OyHzNmsKuibS6hSipho2jvAfHLxSlnhETjvkBP0pI1omrh4s+DGrQE9TyNl2L8nTBcv1ftXj7SoICbo2SDOqu57/UzPQHcWtGdHSsUcFRyUM/dItr23OM2eu/Wk/ZqYZa0/NuZsMnLxhRf5K7Ytc9aZ09zXiEEDu9OLe9ka3UFiSsR8BsyMi669nj0OY85w2hFBq/a+dMCFVR84zWaJbOdxamKhfZ6N9kUXr0LmM7Pnoa1nB09rLeuWg6NIbGV2mBI9ezd8noz2cxdrLcpJ6amc9U4H9yUtRbUilQM5WdFNEtbS8uzwETGdvPLplw45pwBqkxpZD3dreWfEeFYx3Xz5aW5yyAmCdunY0uxQVg83f8wJYOxZKbT7+Scn78v5mYmUIZuz0+12mbSqqLRbWY3PEhKUlJqAuZ/P525e+iyMJlSGRE8GRUW7NJ8HusmUkJ78WYMWnbqdmlhoAdPRW+cXE9aTOAm0rqBC2q7FoTMzHcbUzDSpOZ87+qaEPNj2gNMC7SosCsuMbWEESOTss2ddxzzzihNTh2zjUpIqKuHyXx0TKKURE3ugucOYZxcj5kwIKqR1BkK6I0RTf2Ix9w5jZi8nFicLioomSWNAgdTyw5Z9Fs/O3X3xRf5ylOQUQZVToDrmQ70Ta0mWBTFngunwPfNCkTgPQH9GWjeGFUrJTEpNp1+W4B1w2qAJVJsRIZWSxQQ5Pzl9mZ442bhJUEUNqaxybQ2VESCJksUkzzr+HjdvRJwKKta1SfvyxzAKJFKSmK6nJjW3lJ/q3FhRJT2Oe6K8U0oW0/0XSeYzKqgBVU2PYO+F0WhJYgLoCfyELlhXbOeqpIZU404ZCVIo2bMn8YpX/4I5jaLDB0SNYe+MigyJUsaU+/mJvHrH98i4MwFVTbkiEa9CPzAjSImUIuank3n1V/ajCEqgRMqJyrQawwf6HzCQQLmfF0/oBWe+xxk6i0kR9Zm5+OOQdAS7GkrEvDyt17j5uYwqiqSCyg5mG9OnyIiQQjm6OLn3m2VzqKiNiqzJmDEjQ472l7lT/KkMYN3iyEZlWA39Gv+T0b6Yy5+dZvj53BFpIkYaxY/e2SkHkF5kRnFMkHiUiOLlhZf3z04+/IJ3cZkpjg5iD4BAWPgTEC1Zs56Xo9ftYeQ8r5DN/kmAR8BnaaSRRhpppJFGGmmkkUYaaaSRRhpppJFGGmmkkcZJxP9JyFv+VZPJZwAAAABJRU5ErkJggg=="
            alt
          />
        </span>
        <span class="about-snap-floatImg-4">
          <img
            src="https://lf1-cdn-tos.bytegoofy.com/goofy/ies/douyin_home_web/imgs/3_4.04a57b8b.png"
            alt
          />
        </span>
        <div class="about-video-bar">
          <video
            id="video"
            data-autoplay="true"
            loop
            autoplay
            data-object-fit="true"
            muted
          >
            <source
              src="https://lf1-cdn-tos.bytegoofy.com/goofy/ies/douyin_home_web/medias/3.03d4fdee.mp4"
              type="video/mp4"
            />
            抱歉，你的浏览器不支持内嵌视频
          </video>
        </div>
      </div>
    </section>
    <section :style="{ opacity: leaveThree }">
      <div class="about-snap-info">
        <h1>{{ snapList[2].title_1 }}</h1>
        <h2>{{ snapList[2].title_2 }}</h2>
        <p style="width: 40%; margin-top: 18%">
          我们
          <b>6</b>人通过 <font style="color: #54d0ff">字节跳动青训营</font>相遇于
          <font style="color: #fe5234">1月14日</font>。历时 <b>26</b>天，经历了
          <b>221</b>次 <font style="color: #ffab00">commit</font>，以及无数次的
          <font style="color: red">bug</font>调试，最终完成了
          <font style="color: #fe5234">汪汪视频</font>。
        </p>
        <div class="about-snap-star">
          <img src="../assets/img/star.png" alt />
        </div>
        <div class="about-snap-sun">
          <img src="../assets/img/sun.png" alt />
        </div>
        <div class="about-snap-moon">
          <img src="../assets/img/moon.png" alt />
        </div>
      </div>
      <div class="about-snap-cards">
        <ul>
          <li>
            <div></div>
          </li>
          <li>
            <div></div>
          </li>
          <li>
            <div></div>
          </li>
          <li>
            <div></div>
          </li>
        </ul>
      </div>
    </section>
    <section :style="{ opacity: leaveFour }">
      <div class="about-welcome-bar">
        <div class="about-snap-info">
          <h1>{{ snapList[3].title_1 }}</h1>
          <h2>{{ snapList[3].title_2 }}</h2>
        </div>
        <div class="el-icon-caret-right begin" @click="begin"></div>
        <div class="begin_word" @click="begin">点击体验</div>
        <div class="about-welcome-video">
          <video
            src="https://wangwang-video.oss-cn-beijing.aliyuncs.com/2022-11-9/%E5%9F%8E%E5%8C%97%E5%BE%90%E5%85%AC/QQ%E8%A7%86%E9%A2%9120220209200106.mp4"
            controls
          ></video>
        </div>
      </div>
    </section>
  </main>
</template>
<script>
export default {
  data() {
    return {
      scrollCnt: 0,
      threeIdx: 0,
      snapLast: false,
      snapList: [
        {
          id: 0,
          title_1: "幕后揭秘",
          title_2: `本项目网页视觉与应用LOGO由曹珑设计
`,
        },
        {
          id: 1,
          title_1: "灵感来自抖音",
          title_2: "汪汪视频，也记录美好生活(手动狗头)",
        },
        {
          id: 2,
          title_1: "项目历程",
          title_2: "有一种缘分是天注定的，感谢相遇，江湖再见！",
        },
        {
          id: 3,
          title_1: "项目演示",
          title_2: "带你畅游汪汪视频",
        },
      ],
      colors: [
        { id: 0, no: "first", val: "#fdc463" },
        { id: 1, no: "second", val: "#fe8d2f" },
        { id: 2, no: "third", val: "#ff773b" },
        { id: 3, no: "forth", val: "#fedc2a" },
      ],
    };
  },
  computed: {
    leaveOne() {
      return this.scrollCnt === 2 ? 1 : 0;
    },
    leaveTwo() {
      return this.scrollCnt === 3 ? 1 : 0;
    },
    leaveThree() {
      return this.scrollCnt === 4 ? 1 : 0;
    },
    leaveFour() {
      return this.scrollCnt === 5 ? 1 : 0;
    },
  },
  methods: {
    begin() {
      this.$router.push("/main");
    },
    finishThree(state) {
      let len = this.colors.length;
      if (this.threeIdx === 0 && state > 0) return true;
      else if (this.threeIdx === len - 1 && state < 0) {
        setTimeout(this.clearThree, 550);
        return true;
      }
      this.threeIdx -= state / Math.abs(state);
      let el = document.querySelector(".about-snap-cards>ul");
      el.style.top = `-${this.threeIdx * 100}%`;
      return false;
    },
    clearThree() {
      let el = document.querySelector(".about-snap-cards>ul");
      el.style.top = 0;
      this.threeIdx = 0;
    },
    devOn(no) {
      let dev = document.querySelector(".about-snap-dev>ul");
      dev.className = `${no}-dev-hover`;
    },
    devLeave() {
      let dev = document.querySelector(".about-snap-dev>ul");
      dev.className = ``;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/assets/about-public";
.begin {
  position: absolute;
  width: 100px;
  box-sizing: border-box;
  height: 100px;
  border-radius: 50%;
  line-height: 100px;
  top: 45%;
  transform: translateX(37%);
  text-align: center;
  background-color: #ff7d43;
  font-size: 50px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s;
}
.begin_word {
  top: calc(45% + 105px);
  width: 150px;
  transform: translateX(9%);
  text-align: center;
  position: absolute;
  font-size: 30px;
  font-weight: 600;
  cursor: pointer;
}
.begin:hover {
  border: 1px solid #ff7d43;
  background-color: #fff;
  color: #ff7d43;
}
.begin_word:hover {
  color: #ff7d43;
}
.begin:hover ~ .begin_word {
  color: #ff7d43;
}
.now-last {
  width: 100vw;
  min-width: $minWid;
}
.not-last {
  width: calc(100vw - 240px);
  min-width: calc($minWid - 240px);
}
.about-snap {
  position: relative;
  margin: 0 auto;
  transition: top, 0.5s;
  top: 100%;
  section {
    width: 100%;
    height: 100vh;
    position: relative;
    transition: opacity, 0.5s;
    .about-snap-info {
      position: absolute;
      top: 15%;
      h1 {
        color: $theme;
        font-size: 2.95vw;
      }
      h2 {
        color: #777e87;
        font-size: 1.5vw;
        font-weight: lighter;
      }
      p {
        color: #000;
        font-size: 1.2vw;
        font-weight: lighter;
      }
      div {
        position: absolute;
        width: 10%;
        z-index: -1;
        img {
          width: 100%;
        }
      }
      .about-snap-star {
        opacity: 0.2;
        top: 8%;
        left: 18%;
      }
      .about-snap-sun {
        opacity: 0.2;
        top: 60%;
        left: -5%;
      }
      .about-snap-moon {
        opacity: 0.2;
        top: 80%;
        left: 25%;
      }
    }
    .about-snap-cards {
      position: absolute;
      top: 0;
      right: 0;
      width: 53%;
      height: 100vh;
      overflow: hidden;
      ul {
        position: relative;
        width: 100%;
        height: 100%;
        top: 0;
        transition: top, 0.5s;
        li {
          display: block;
          width: 100%;
          height: 100%;
          position: relative;
          background-repeat: no-repeat;
          background-size: cover;
          div {
            position: absolute;
            width: 100%;
            height: 20%;
            top: 13%;
            background-repeat: no-repeat;
          }
        }
        li:first-child {
          background-image: url("../assets/img/paint.png");
          background-position: 5% 10%;
          div {
            background-image: url("../assets/img/siHua.png");
          }
        }
        li:nth-child(2) {
          background-image: url("../assets/img/themeBg.png");
          div {
            background-image: url("../assets/img/duoZhuTi.png");
          }
        }
        li:nth-child(3) {
          background-image: url("../assets/img/duoPingTai.png");
          div {
            background-image: url("../assets/img/xiangYingShi.png");
          }
        }
        li:last-child {
          background-image: url("../assets/img/creator.png");
          div {
            background-image: url("../assets/img/chuangZuo.png");
          }
        }
      }
    }
    &:first-child {
      ul {
        position: absolute;
        top: 36vh;
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 62%;
        min-height: 268px;
        .about-snap-dev-item {
          border-radius: 3vw;
          transition: width, height, 0.5s;
          div {
            width: 90%;
            overflow: hidden;
            .about-snap-devInfo {
              display: block;
              position: relative;
              .about-snap-txBox {
                display: block;
                width: 9vw;
                min-width: 100px;
                height: 9vw;
                min-height: 100px;
                border-radius: 50%;
                transition: opacity, 0.5s;
                background-size: cover;
              }
              span {
                display: block;
                position: absolute;
                width: 125%;
                font-size: 1.25vw;
                color: #fff;
                transition: left, right, top, bottom, 0.5s;
                transition-timing-function: ease;
              }
            }
          }
        }
        & > .about-snap-dev-item {
          &:first-child {
            p:nth-child(2) {
              opacity: 0;
              transition: opacity, 0.5s;
            }
            div {
              margin: 2vh auto;
              height: 85%;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              align-items: center;
            }
            p {
              font-size: 1.35vw;
            }
            span {
              display: block;
            }
            span:first-child p {
              font-size: 2.75vw;
              color: #e5f6f3;
              font-weight: 5vw;
              text-align: center;
            }
            span:nth-child(2) {
              color: #fff;
            }
            span:nth-child(3) {
              color: #fff;
            }
          }
          &:nth-child(2) {
            div {
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
              align-items: center;
              height: 100%;
              margin: 0 auto;
            }
            .about-snap-devInfo {
              &:first-child {
                span {
                  top: 5%;
                  left: calc(100% + 10vw);
                }
                i {
                  background-image: url(https://wangwang-video.oss-cn-beijing.aliyuncs.com/2022-11-7/nets/1644224252462_8ce37048.jpg);
                }
              }
              &:nth-child(2) {
                span {
                  top: 5.2vh;
                  right: calc(100% + 10vw);
                }
                i {
                  background-image: url(https://wangwang-video.oss-cn-beijing.aliyuncs.com/2022-11-7/nets/1644224286550_63640a4f.jpg);
                }
              }
            }
          }
        }
        li {
          height: 100%;
          &:first-child {
            width: calc(100% * 2 / 5 - 0.75vw);
          }
          &:nth-child(2) {
            width: calc(100% * 1 / 5 - 0.75vw);
            div {
              width: 80%;
            }
          }
          &:last-child {
            width: calc(100% * 2 / 5 - 0.75vw);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition: width, height, 0.5s;
            .about-snap-dev-item {
              width: 100%;
              height: calc(100% / 2 - 0.5vw);
              & > div {
                display: flex;
                justify-content: space-around;
                align-items: center;
                width: 90%;
                height: 100%;
                margin: 0 auto;
              }
              &:first-child {
                .about-snap-devInfo:first-child {
                  i {
                    background-image: url(http://wangwang-video.oss-cn-beijing.aliyuncs.com/2022-11-9/admin/1644413212848_38d094f2.jpg);
                  }
                  span {
                    bottom: calc(100% + 10vh);
                  }
                }
                .about-snap-devInfo:nth-child(2) {
                  i {
                    background-image: url(https://wangwang-video.oss-cn-beijing.aliyuncs.com/2022-11-7/nets/1644224199480_52ab0c65.jpg);
                  }
                  span {
                    top: calc(100% + 10vh);
                  }
                }
              }
              &:nth-child(2) {
                .about-snap-devInfo:first-child {
                  i {
                    background-image: url(https://wangwang-video.oss-cn-beijing.aliyuncs.com/2022-11-7/nets/1644224006881_1cfab1b3.jpg);
                    margin: 0;
                  }
                  span {
                    top: calc(100% + 10vh);
                  }
                }
                .about-snap-devInfo:nth-child(2) {
                  i {
                    background-image: url(https://wangwang-video.oss-cn-beijing.aliyuncs.com/2022-11-7/nets/1644224092644_09b39894.jpg);
                    margin: 0;
                  }
                  span {
                    bottom: calc(100% + 10vh);
                  }
                }
              }
            }
          }
        }
      }
      .first-dev-hover {
        li:first-child {
          width: calc(100% * 5 / 11 - 0.75vw);
          p:nth-child(2) {
            opacity: 1;
          }
        }
        li:nth-child(2) {
          width: calc(100% * 2 / 11 - 0.75vw);
        }
        li:last-child {
          width: calc(100% * 4 / 11 - 0.75vw);
        }
      }
      .second-dev-hover {
        li:first-child {
          width: calc(100% * 3 / 8 - 0.75vw);
        }
        li:nth-child(2) {
          width: calc(100% * 2 / 8 - 0.75vw);
          .about-snap-devInfo:first-child {
            i {
              opacity: 0;
            }
            span {
              left: -8%;
            }
          }
          .about-snap-devInfo:nth-child(2) {
            i {
              opacity: 0;
            }
            span {
              right: -18%;
            }
          }
        }
        li:last-child {
          width: calc(100% * 3 / 8 - 0.75vw);
        }
      }
      .third-dev-hover li:last-child > div {
        &:first-child {
          height: calc(100% * 3 / 5 - 0.5vw);
          .about-snap-devInfo {
            i {
              opacity: 0;
            }
            &:first-child span {
              bottom: 25%;
            }
            &:nth-child(2) span {
              top: 20%;
            }
          }
        }
        &:last-child {
          height: calc(100% * 2 / 5 - 0.5vw);
        }
      }
      .forth-dev-hover li:last-child > div {
        &:first-child {
          height: calc(100% * 2 / 5 - 0.5vw);
        }
        &:last-child {
          height: calc(100% * 3 / 5 - 0.5vw);
          .about-snap-devInfo {
            i {
              opacity: 0;
            }
            &:first-child span {
              top: 25%;
            }
            &:nth-child(2) span {
              bottom: 22%;
            }
          }
        }
      }
    }
    &:nth-child(2) {
      background-image: url("../assets/img/header-illustration-light.png");
      background-size: cover;
      background-repeat: no-repeat;
      background-position-x: 100%;
      .about-snap-info {
        left: 6%;
        top: 42%;
      }
      .about-snap-single {
        position: absolute;
        top: 14%;
        right: 7%;
        width: 45%;
        span {
          position: absolute;
          z-index: 1000;
          img {
            width: 100%;
          }
        }
        .about-snap-floatImg-1 {
          width: 38%;
          top: -15%;
          left: -8%;
        }
        .about-snap-floatImg-2 {
          width: 20%;
          right: -6%;
          top: 5%;
        }

        .about-snap-floatImg-3 {
          width: 23%;
          left: -10%;
          bottom: 25%;
        }

        .about-snap-floatImg-4 {
          width: 30%;
          bottom: 5%;
          right: 2%;
        }

        .about-video-bar {
          border-radius: 2vw;
          width: 67%;
          overflow: hidden;
          margin: 0 auto;
          video {
            width: 100%;
            height: auto;
          }
        }
      }
    }
    &:last-child {
      .about-welcome-bar {
        position: relative;
        width: calc(100vw - 240px);
        min-width: calc($minWid - 240px);
        height: 100%;
        margin: 0 auto;
        .about-welcome-video {
          width: 82%;
          height: 100%;
          margin-left: 18%;
          video {
            width: 100%;
            padding-bottom: 8vh;
          }
        }
      }
    }
  }
}
</style>
