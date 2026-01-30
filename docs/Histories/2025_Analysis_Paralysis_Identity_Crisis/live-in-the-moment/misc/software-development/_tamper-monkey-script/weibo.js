GM_addStyle(GM_getResourceText("common_css"));


let lastestWindowsY = -1;

let commentSelector =
    'div[transform-text] div[class*=RepostCommentList_mar1]>div[class*=Scroll_container]>div[class*=Scroll_wrap]';

//微博、推特等等每次滚动条目顺序的class也就是vue-scroll，transform都在变，甚至可能会主动回滚，所以记忆一下实际的srollypos
let scrollDown = (y) => {
    //scroll有时候是负数
    if (y > 800) y = 600;
    if (y < 0) {
        console.log(y);
        y = 300;
    }
    /* lastestWindowsY 存在是因为长时间scroll后会导致页面刷新,
    需要重新scroll时用到, 现在考虑注释掉
    *
    if (lastestWindowsY < 0) {
        lastestWindowsY = window.scrollY;
    }
*/
    lastestWindowsY = window.scrollY;

    console.warn('scroll: ' + lastestWindowsY + '---'+y)
    lastestWindowsY += y;
    console.warn('scroll: ' + lastestWindowsY)
    window.scroll({top: lastestWindowsY, behavior: 'smooth'});
};


let allNodes = (_) =>
    document.querySelectorAll(
        '.vue-recycle-scroller__item-wrapper>.vue-recycle-scroller__item-view',
    );

function getOnScreenTweetNodes() {
    let tweets = [];
    // 0<y<900
    allNodes().forEach((el) => {
        let top = el.getBoundingClientRect().y;
        if (top > 0 && top < 900) {
            tweets.push(el);
        }
    });

    tweets.sort(function (a, b) {
        return a.getBoundingClientRect().y - b.getBoundingClientRect().y;
    });
    return tweets;
}

let getTweetHeader = (el) =>
    el.querySelector(
        'article>.Feed_body_3R0rO>header a[href^="https://weibo.com/"][title][class^="head-info_time"]',
    );

async function expandTweet(el) {
    const expand = el.querySelector('span.expand');
    if (expand && expand.innerText.trim() === '展开') {
        expand.click();
        await sleep(1500);
    }
}

/*
unsafeWindow.REMOVE_LATEST_WEIBO = async (count) => {
    try {
        const result = await weibotable.allDocs({
            include_docs: true,
        });

        let weibos = result.rows.map(r => r.doc)
        weibos.sort((a, b) => a.updated.localeCompare(b.updated))
        let cells = weibos.slice(weibos.length - count ? count : 1)
        // cells.map(d=> {delete d.content; delete d.content; delete d._rev})
        cells.map(d => d._deleted = true)
        let rs = await weibotable.bulkDocs(cells);
        console.table(cells)
        console.table(rs.filter(d => !d.ok))
        replicate2Remote(weibotable);
    } catch (err) {
        console.log(err);
    }
}
unsafeWindow.listLatestWeibo = async (count) => {
    try {
        const result = await weibotable.allDocs({
            include_docs: true,
        });

        let weibos = result.rows.map(r => r.doc)
        weibos.sort((a, b) => a.updated.localeCompare(b.updated))
        let cells = weibos.slice(weibos.length - count - count ? count : 5)
        // cells.map(d=> {delete d.content; delete d.content; delete d._rev})
        console.table(cells)
    } catch (err) {
        console.log(err);
    }
}
*/

function makeWeiboDoc(el) {
    let doc = {classNames:['tweet-fanzhou']};
    const contentEl = el.querySelector(
        'article>.Feed_body_3R0rO>.wbpro-feed-content',
    );

    //转义link特殊字符
    const links = contentEl.querySelectorAll('a');
    Array.from(links).map((a) => (a.href = decodeURIComponent(a.href)));
    //img的style会限制大小
    const images = contentEl.querySelectorAll('img');
    Array.from(images).map((img) => img.removeAttribute('style'));
    if(contentEl.querySelector('div[class^="picture_payTag_"]') || contentEl.innerHTML.includes('pay')){
        doc.classNames.push('tweet-fanzhou-pay');
    }

    contentEl.querySelectorAll('a[href*="s.weibo.com/weibo?q"]').forEach(x=> x.remove())
    contentEl.querySelectorAll('a[href*="stock.weibo.cn/page"]').forEach(x=> x.remove())
    contentEl.querySelectorAll('a[href*="stock.weibo.cn/page/detail"]').forEach(x=> x.remove())
    if (contentEl.querySelector('img.picture_focusImg_1z5In,img.picture-viewer_pic_37YQ3,img.woo-picture-img')){
        doc.classNames.push('tweet-fanzhou-has-img');
    }

    doc.content = contentEl.innerHTML
        .replaceAll('<!---->', '')
        .replaceAll(' style="color: var(--w-off-border);"', '')
        .replace('<div class="content_placebox_1QXn-"></div>', '')
        //微博里面style="width 一般都是图片
        .replaceAll(/ style="width:[a-zA-Z0-9;:%\.\s\"]+?;"/g, '')
        .replaceAll('<div class="woo-picture-cover"></div>', '')
        .replaceAll('<div class="woo-picture-hoverMask"></div>', '')
        .replace('<span class="collapse">收起</span>', '');
    //不能删除style和class，会有粗体等等 .replace(/class="[a-zA-Z0-9_\s\-]*"/g,'')

    // append retweet
    const retweetEl = contentEl.nextElementSibling;
    if(retweetEl && retweetEl.className && retweetEl.className.includes('Feed_retweet_')){
        const rw = `<div class="Feed_retweet">`+retweetEl.innerText.substring(0, 100)+'</div>'
        doc.content += rw;
        doc.classNames.push('tweet-fanzhou-retweet');
        // console.warn(doc.content)
    }

    /*
    不需要footer的评论,因为 1 评论都是作者自己评论, 2, 后面的retweet 作者有转推原文的tweet
    let footer = el.querySelectorAll(
        'footer[aria-label] .woo-box-alignCenter .toolbar_num_JXZul',
    );
    if (footer.length === 2) {
        let cnt = footer[1].innerText.trim();
        if (cnt !== '评论') doc.commentCount = cnt;
    }
    */
    doc.title = contentEl.innerText.split('\n')[0];
    if(doc.title){
        doc.title = doc.title.replace(/泛舟\s*\|/g, '').trim()
        // remove Zero-Width Space
        doc.title = doc.title.replace(/[\u200B-\u200D\uFEFF]/g, '').trim()
    }

    const headerEl = getTweetHeader(el);
    //同意headerEl在不同页面格式不同，
    if (headerEl.title) {
        //个人主页的格式如下
        //<a title="2022-08-10 17:01"> 8分钟前 </a>
        doc.start = new Date(headerEl.title);
    } else {
        //在单独一条微博格式如下
        // <a title=""> 22-8-10 17:01 </a>
        doc.start = new Date('20' + headerEl.innerText);
    }

    //微博没有秒，可能有重复的分钟，这样最终生成cell id会有重复，加上一个随机秒
    doc.start.setSeconds(Math.round(Math.random() * 56) + 1);

    //  https://weibo.com/6085972203/LDsrTeyZ5
    doc._id = headerEl.href;
    doc.c_id = make_id(doc.start);
    doc.updated = '2024';

    // cell table 需要url字段
    doc.url = headerEl.href;

    // if (headerEl.parentNode){
    //     doc.platform = headerEl.parentNode.querySelector('div[class*=head-info_from]',).innerText;
    // }

    // console.table(doc)
    contentEl.classList.add('my-work-done');
    return doc;
    // try {
    //   if (contentEl.innerText.endsWith('展开')) {
    //     await errtb.put({_id: doc._id, start: doc.start, content: doc.content, updated: new Date()})
    //   }
    //
    //   idList.add(doc._id)
    //   const response = await weibotable.put(doc);
    //   console.log(response);
    // } catch (err) {
    //   console.log(err);
    // }
}
async function bulkDocs(table, docs){
    let rs = await table.bulkDocs(docs);
    const fails = rs.filter((r) => !r.ok)
    if(fails.length>0){
        console.log(`🎈🎈🎈🎈🎈🎈 Failed ${fails.length}/${rs.length}`);
        console.table(fails);
    }else{
        console.log('✅✅✅✅✅✅✅✅✅ All Success : ' + rs.length);
    }
}

//打开泛舟微博主页，加载最近6条微博的地址，然后打开这6条。
// 注意 chrome 的debug窗口不要太宽，否则 不能自动滚动
async function fetchWeibo(size) {

    if (window.location.href !== 'https://weibo.com/u/6085972203') {
        console.log('🎈🎈🎈🎈🎈🎈 not 泛舟 微博, Return');
        return;
    }
    console.warn('🎈🎈🎈🎈🎈🎈 如果没用自动scroll，把Chrome的debug窗口调窄一些🎈🎈🎈🎈')

    let count;
    if(size === undefined){
        count = document.querySelector('#my-load-weibo-count').value.trim();
    }else{
        count = size
    }
    console.warn('scroll times: '+count)
    await sleep(1000);

    //不要移到顶部再 scrollDown(getOnScreenTweetNodes()[0].getBoundingClientRect().top - 120);

    let newDocs = [];
    for (let n = 0; n < count; ++n) {
        var tweetNodes = getOnScreenTweetNodes();

        if (tweetNodes.length > 0) {
            let el0 = tweetNodes[0];
            let id = getTweetHeader(el0).href;
            await expandTweet(el0);
            //"展开"之后，重新获取tweets。
            tweetNodes = getOnScreenTweetNodes();
            el0 = tweetNodes[0];
            // newDocs.push({_id:id,updated:new Date()})
            if (id.startsWith('https://weibo.com/6085972203')) {
                let doc = makeWeiboDoc(el0);
                doc.author = 'fanzhou';
                newDocs.push(doc);
                console.log(doc.title);
            }
            scrollDown(el0.getBoundingClientRect().bottom - 120);
        } else {
            scrollDown(600);
        }

        if (newDocs.length % 20 === 0) {
            bulkDocs(weibotable, newDocs);
            newDocs = []
        }
        await sleep(1000);
    }

    // console.log(newDocs)
    bulkDocs(weibotable, newDocs);
    sample_snack('导入完成');
}
unsafeWindow.fetchWeibo = fetchWeibo;

function appendInfo(txt){
    const output = document.querySelector('#my-extension-output');
    output.innerText += '-'+txt;
}
unsafeWindow.appendToolPanel = _=>{
    const el = document.createElement('div');
    el.className='my-extension-panel'
    el.innerHTML = `<div>添加完全部weibo后，你需要手动在控制台把weibo推送到远程</div><hr>
        <button id="my-analyze-weibo">读取微博</button>
        <input  id="my-load-weibo-count" type="text" placeholder="scroll times" value="9">
        <hr>
        <button id="my-db2remote">推送到远程</button>
        <hr>
        <div id="my-extension-output"></div>
        <hr>
        <h1 style="color: blue;background-color: yellow;text-align: center"></h1>`;

    // console.log(weibotable);
    // replicate2Remote(weibotable);
    let titleBar = document.querySelector('.Nav_main_32v4H');
    if (titleBar === null) {
        alert('titlebar ，不能添加提示');
    } else {
        titleBar.insertBefore(el, titleBar.children[0]);
    }

    document.querySelector('#my-db2remote').addEventListener('click',_=> export2remoteCells(weibotable))
    document.querySelector('#my-analyze-weibo').addEventListener('click',_=> fetchWeibo())

}
setTimeout(  appendToolPanel(), 1000)

