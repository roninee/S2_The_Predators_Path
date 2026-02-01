// ==UserScript==
// @name         微信公众号
// @namespace    http://tampermonkey.net/
// @version      2024-07-21
// @description  try to take over the world!
// @author       You
// @match        https://mp.weixin.qq.com/s*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @require      file:///D:\Google Drive\My Drive\Software.Develop\_Tamper.Monkey.Script/common.js
// @require      file:///D:\Google Drive\My Drive\Software.Develop\_Tamper.Monkey.Script/pouchdb.min.js
// @require      file:///D:\Google Drive\My Drive\Software.Develop\_Tamper.Monkey.Script/ready.js
// @resource     common_css file:///D:\Google Drive\My Drive\Software.Develop\_Tamper.Monkey.Script\common.css


// @grant       GM_getResourceText
// @grant       GM_addStyle
// @grant       unsafeWindow
// @version     1.0
// @author      -
// @description 12/19/2023, 11:53:20 AM
// ==/UserScript==

/*
* 加载泛舟 红周刊周末文章
* */

GM_addStyle(GM_getResourceText("common_css"));

//qq 微信纯文本内容
//url 与weibo不用，所以不是同一个库，暂时不用此函数直接导入库。
ready('#js_content.rich_media_content', async function (element) {
    if(!  window.location.href.startsWith('https://mp.weixin.qq.com/s')){
        console.warn('\t\t******* 非周刊, return ********')
        return ;
    }else{
        console.warn('\t\t******* 开始分析网页********')
    }

    document.querySelector('#publish_time').style.backgroundColor='black'
    document.querySelector('#publish_time').style.color='yellow'

    document.querySelectorAll('.js_article_create_time.album__item-info-item').forEach(e=>{
        e.style.backgroundColor='black'
        e.style.color='yellow'

    })

    const titleNode = document.querySelector('.rich_media_title');
    if(!titleNode || !titleNode.innerText.startsWith('泛舟 |')){
        console.log('title not startswit: 泛舟 |')
        return ;
    }

    let doc = {};
    doc.classNames =['tweet-fanzhou-weekly','tweet-fanzhou']

    doc.title = titleNode.innerText.replace('泛舟 |','').trim()

    //微博没有秒，可能有重复的分钟，这样最终生成cell id会有重复，加上一个随机秒
    let timeTxt = document.querySelector('.rich_media_area_primary_inner #meta_content #publish_time').innerText.replace(/[年月]/ig,'-').replace('日','')
    let d = new Date(timeTxt)

    d.setSeconds(Math.round(Math.random()*56)+1)
    doc.start = d
    // If the date object is invalid it
    // will return 'NaN' on getTime()
    // and NaN is never equal to itself
    if(d.getTime() !== d.getTime()){
        console.error('❌❌❌❌❌❌❌❌❌没有start timexxxxx❌❌❌❌❌❌❌❌❌')
    }

    doc.c_id = make_id(doc.start)
    doc._id = window.location.href
    doc.url = window.location.href
    // doc.updated = new Date()

    await sleep(1000)
    let t = document.querySelector('#js_content.rich_media_content').innerText;
    let ii = t.indexOf('送人玫瑰\n手有余香');
    if (ii > 0) {
        t = t.substring(0, ii)
    }
    ii = t.indexOf('送人玫瑰，手有余香');
    if (ii > 0) {
        t = t.substring(0, ii)
    }
    ii = t.indexOf('免责声明：本文内容仅');
    if (ii > 0) {
        t = t.substring(0, ii)
    }
    t = '<p>' + t.replace('为避免错过红刊投服平台的精彩内容，请将我们的公众号「设为星标」，及时获取更新内容！', '')
        .replace('点击“在看”鼓励嘉宾分享更好的原创观点，感谢您的支持！', '')
        .trim().replace('点击↑红刊投服平台 关注我 设星标 不迷路', '').trim().replace('（注：ios系统用户暂不支持小程序内购买）', '')
        .trim().replace('点击在看，涨停不断', '').trim().replace('知股汇小程序现已开通，读文章、看直播，快人一步！点此进入小程序！', '').trim()
        .replace(/\n+\s*\n+/g, '</p><hr><p>') + '</p>'

    doc.content = t

    console.table(doc)
    console.log(doc.content)
    console.log('********** start put doc ************');
    wxtable.put(doc).then(function (response) {
        console.log('****** ✅✅✅✅✅✅✅✅✅add to doc😉✅✅✅✅✅✅✅✅✅' + response.ok)
    }).catch(function (err) {
        console.warn('\t\t\t❌❌❌❌❌❌❌❌❌ add to doc❌❌❌❌❌❌❌❌❌ ' + err.name );
    });
});

appendButtonTip = _=>{
    const el = document.createElement('div');
    el.className='my-extension-panel'
    el.innerHTML = `<div>你需要手动推送到远程</div><hr>
        <button id="my-db2remote">推送到远程</button>
        <hr>
        <div id="my-extension-output"></div>
        <hr>
        <h1 style="color: blue;background-color: yellow;text-align: center"></h1>`;

    let titleBar = document.querySelector('.rich_media_area_primary_inner ');
    if (titleBar === null) {
        alert('titlebar ，不能添加提示');
    } else {
        titleBar.insertBefore(el, titleBar.children[0]);
    }

    document.querySelector('#my-db2remote').addEventListener('click',_=> export2remoteCells(wxtable))
}

setTimeout(  appendButtonTip(), 300)
