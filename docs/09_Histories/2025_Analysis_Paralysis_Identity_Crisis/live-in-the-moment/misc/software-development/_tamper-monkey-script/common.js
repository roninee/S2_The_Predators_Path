console.warn('\t\t\t\t\t*************** 开始加载脚本 ***************')
const remoteIp = 'http://admin:1@127.0.0.1:5984/'

function sample_snack(txt) {
    appendSnackbar(txt);
    // append_css(snackbar_css);
    start_snack();
}

function start_snack() {
    var x = document.getElementById('snackbar');
    // Add the "show" class to DIV
    x.className = 'show';
    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
        x.className = x.className.replace('show', '');
    }, 3000);
}

function appendSnackbar(txt) {
    let mm = document.createElement('div');
    mm.setAttribute('id', 'snackbar');

    tipnode = document.createTextNode(txt);
    mm.appendChild(tipnode);
    document.body.appendChild(mm);
}

function reset_layout() {
    let ch = document.body.children;
    for (let i = 0; i < ch.length; ++i) {
        ch[i].style.display = 'none';
    }

    let mm = document.createElement('div');
    document.body.insertBefore(mm, document.body.firstChild);
    mm.style.display = 'grid';
    mm.style.fontSize = '16px';
    mm.style.gridTemplateColumns = '1fr 1fr 1fr';

    window.mm = mm;

    for (let i = 0; i < arguments.length; i++) {
        const el = document.querySelector(arguments[i]);
        console.log('--reset layout', el, arguments[i])
        mm.appendChild(el);
        // mm.prepend(document.querySelector('.main-box .focus-news'))
    }
    //第2个div是主窗口，独占
    mm.children[1].style.gridRowStart = 'span  10';
}

function append_css(css) {
    if (typeof GM_addStyle !== 'undefined') {
        GM_addStyle(css);
    } else {
        let css_node;
        css_node = document.createElement('style');
        css_node.type = 'text/css';
        css_node.appendChild(document.createTextNode(css));

        let head = document.querySelector('head');
        if (head) {
            head.appendChild(css_node);
        } else {
            document.documentElement.appendChild(css_node);
        }
    }
}

async function allDocs(table) {
    try {
        if(typeof table === 'string'){
            table = new PouchDB(table)
        }
        const result = await table.allDocs({
            include_docs: true,
        });
        const docs = result.rows.map(r => r.doc)
        return docs
    } catch (err) {
        return [err]
    }
}

function set_deleted(docs){
    docs.map( o  => o._deleted = true )
    //批量更新删除rs = await weibotable.bulkDocs(ss);
}

async function saveDocs(table, docs){
    let rs = await table.bulkDocs(docs)
    console.log(rs.filter(r => !('ok' in r)));
    sample_snack(rs)
}

let replicate2Remote = (table) => table.replicate.to(remoteIp + table.name).on('complete', function (info) {
    appendInfo(`sync 2 remote ${table.name} ok!!!`, )
    // if(onComplete){
    //     // handle complete
    // }
}).on('error', function (err) {
    appendInfo(`sync 2 remote ${table.name} error`, err)
});

let replicateFromRemote = (table) =>
    table.replicate.from(remoteIp + table.name);

let sleep = ms => new Promise((r) => setTimeout(r, ms));


let weibotable = new PouchDB('weibo');
let wxtable = new PouchDB('wx');
let cellstable = new PouchDB('cells');


async function export2remoteCells(org){
    const dd = await allDocs(org)
    dd.map(o => {
        delete o._id;// href
        delete o._rev;
        o._id = o.c_id;
        o.updated = '2024';
        delete o.c_id
    });
    await saveDocs(cellstable, dd)
    await sleep(100)
    replicate2Remote(cellstable)
}

//微博没有秒，可能有重复的分钟，这样最终生成cell id会有重复，加上一个随机秒
// 不直接赋值_id, id是href可以防止重复插入，
// 最终导入cells库的时候使用c_id
let make_id = d => {
    let v = new Date(d)
    v.setTime(v.getTime() + (8 * 60 * 60 * 1000))
    return 'calendar/' + v.toISOString().substring(0, 19) + '+08:00'
}

unsafeWindow.make_id = make_id;
unsafeWindow.sleep = sleep;
unsafeWindow.export2remoteCells = export2remoteCells;
unsafeWindow.PouchDB = PouchDB;
unsafeWindow.replicate2Remote = replicate2Remote;
unsafeWindow.replicateFromRemote = replicateFromRemote;

unsafeWindow.allDocs=allDocs
unsafeWindow.saveDocs=saveDocs
unsafeWindow.sample_snack=sample_snack
