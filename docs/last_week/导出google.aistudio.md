## 注入 turndown.js, 建立 Trusted Types 策略

```javascript
// ============================================================
// 步骤 1: 建立 Trusted Types 策略 (这是解决报错的关键)
// ============================================================
(function() {
    if (window.trustedTypes && window.trustedTypes.createPolicy) {
        try {
            // 尝试创建一个名为 'default' 的策略，这能让大部分 innerHTML 操作自动获得许可
            if (!window.trustedTypes.defaultPolicy) {
                window.trustedTypes.createPolicy('default', {
                    createHTML: (string) => string,
                    createScript: (string) => string,
                    createScriptURL: (string) => string,
                });
            }
        } catch (e) {
            console.warn("⚠️ 创建默认策略失败（可能已被占用），将尝试直接运行。", e);
        }
    }
})();

// ============================================================
// 步骤 2: 手动定义 TurndownService (完整压缩版)
// ============================================================
var TurndownService = (function() {
    'use strict';
    function extend(destination) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (source.hasOwnProperty(key)) destination[key] = source[key];
            }
        }
        return destination;
    }
    function repeat(character, count) {
        return Array(count + 1).join(character);
    }
    var blockElements = ['address', 'article', 'aside', 'audio', 'blockquote', 'body', 'canvas', 'center', 'dd', 'dir', 'div', 'dl', 'dt', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr', 'html', 'isindex', 'li', 'main', 'menu', 'nav', 'noframes', 'noscript', 'ol', 'output', 'p', 'pre', 'section', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul'];
    function isBlock(node) {
        return is(node, blockElements);
    }
    function isVoid(node) {
        return is(node, ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
    }
    function is(node, tagNames) {
        return node.nodeType === 1 && tagNames.indexOf(node.nodeName.toLowerCase()) > -1;
    }
    var rules = {};
    rules.paragraph = { filter: 'p', replacement: function (content) { return '\n\n' + content + '\n\n'; } };
    rules.lineBreak = { filter: 'br', replacement: function (content, node, options) { return options.br + '\n'; } };
    rules.heading = { filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'], replacement: function (content, node, options) { var hLevel = Number(node.nodeName.charAt(1)); if (options.headingStyle === 'setext' && hLevel < 3) { var underline = repeat((hLevel === 1 ? '=' : '-'), content.length); return '\n\n' + content + '\n' + underline + '\n\n'; } else { return '\n\n' + repeat('#', hLevel) + ' ' + content + '\n\n'; } } };
    rules.blockquote = { filter: 'blockquote', replacement: function (content) { content = content.replace(/^\n+|\n+$/g, ''); content = content.replace(/^/gm, '> '); return '\n\n' + content + '\n\n'; } };
    rules.list = { filter: ['ul', 'ol'], replacement: function (content, node) { var parent = node.parentNode; if (parent.nodeName === 'LI' && parent.lastElementChild === node) { return '\n' + content; } else { return '\n\n' + content + '\n\n'; } } };
    rules.listItem = { filter: 'li', replacement: function (content, node, options) { content = content.replace(/^\n+/, '').replace(/\n+$/, '').replace(/\n/gm, '\n    '); var prefix = options.bulletListMarker + ' '; var parent = node.parentNode; if (parent.nodeName === 'OL') { var start = parent.getAttribute('start'); var index = Array.prototype.indexOf.call(parent.children, node); prefix = (start ? Number(start) + index : index + 1) + '. '; } return prefix + content + (node.nextSibling && !/\n$/.test(content) ? '\n' : ''); } };
    rules.indentedCodeBlock = { filter: function (node, options) { return options.codeBlockStyle === 'indented' && node.nodeName === 'PRE' && node.firstChild && node.nodeName === 'CODE'; }, replacement: function (content, node, options) { return '\n\n    ' + node.firstChild.textContent.replace(/\n/g, '\n    ') + '\n\n'; } };
    rules.fencedCodeBlock = { filter: function (node, options) { return options.codeBlockStyle === 'fenced' && node.nodeName === 'PRE' && node.firstChild && node.nodeName === 'CODE'; }, replacement: function (content, node, options) { var className = node.firstChild.className || ''; var language = (className.match(/language-(\S+)/) || [null, ''])[1]; var code = node.firstChild.textContent; var fenceChar = options.fence.charAt(0); var fenceSize = 3; var fenceInCodeRegex = new RegExp('^' + fenceChar + '{3,}', 'gm'); var match; while ((match = fenceInCodeRegex.exec(code))) { if (match[0].length >= fenceSize) { fenceSize = match[0].length + 1; } } var fence = repeat(fenceChar, fenceSize); return '\n\n' + fence + language + '\n' + code.replace(/\n$/, '') + '\n' + fence + '\n\n'; } };
    rules.horizontalRule = { filter: 'hr', replacement: function (content, node, options) { return '\n\n' + options.hr + '\n\n'; } };
    rules.inlineLink = { filter: function (node, options) { return options.linkStyle === 'inlined' && node.nodeName === 'A' && node.getAttribute('href'); }, replacement: function (content, node) { var href = node.getAttribute('href'); var title = node.title ? ' "' + node.title + '"' : ''; return '[' + content + '](' + href + title + ')'; } };
    rules.referenceLink = { filter: function (node, options) { return options.linkStyle === 'referenced' && node.nodeName === 'A' && node.getAttribute('href'); }, replacement: function (content, node, options) { var href = node.getAttribute('href'); var title = node.title ? ' "' + node.title + '"' : ''; var replacement; var reference; switch (options.linkReferenceStyle) { case 'collapsed': replacement = '[' + content + '][]'; reference = '[' + content + ']: ' + href + title; break; case 'shortcut': replacement = '[' + content + ']'; reference = '[' + content + ']: ' + href + title; break; default: var id = this.references.length + 1; replacement = '[' + content + '][' + id + ']'; reference = '[' + id + ']: ' + href + title; } this.references.push(reference); return replacement; }, references: [], append: function (options) { var references = ''; if (this.references.length) { references = '\n\n' + this.references.join('\n') + '\n\n'; this.references = []; } return references; } };
    rules.emphasis = { filter: ['em', 'i'], replacement: function (content, node, options) { if (!content.trim()) return ''; return options.emDelimiter + content + options.emDelimiter; } };
    rules.strong = { filter: ['strong', 'b'], replacement: function (content, node, options) { if (!content.trim()) return ''; return options.strongDelimiter + content + options.strongDelimiter; } };
    rules.code = { filter: function (node) { var hasSiblings = node.previousSibling || node.nextSibling; var isCodeBlock = node.parentNode.nodeName === 'PRE' && !hasSiblings; return node.nodeName === 'CODE' && !isCodeBlock; }, replacement: function (content) { if (!content.trim()) return ''; var delimiter = '`'; var matches = content.match(/`+/gm) || []; while (matches.indexOf(delimiter) !== -1) delimiter = delimiter + '`'; var extraSpace = delimiter.length > 1 ? ' ' : ''; return delimiter + extraSpace + content + extraSpace + delimiter; } };
    rules.image = { filter: 'img', replacement: function (content, node) { var alt = node.alt || ''; var src = node.getAttribute('src') || ''; var title = node.title || ''; var titlePart = title ? ' "' + title + '"' : ''; return src ? '![' + alt + '](' + src + titlePart + ')' : ''; } };
    function Rules(options) { this.options = options; this._keep = []; this._remove = []; this.blankRule = { replacement: options.blankReplacement }; this.keepReplacement = options.keepReplacement; this.defaultRule = { replacement: options.defaultReplacement }; this.array = []; for (var key in rules) this.array.push(rules[key]); }
    Rules.prototype = { add: function (key, rule) { this.array.unshift(rule); }, keep: function (filter) { this._keep.unshift({ filter: filter, replacement: this.keepReplacement }); }, remove: function (filter) { this._remove.unshift({ filter: filter, replacement: function () { return ''; } }); }, forNode: function (node) { if (node.isBlank) return this.blankRule; var rule; if ((rule = findRule(this.array, node, this.options))) return rule; if ((rule = findRule(this._keep, node, this.options))) return rule; if ((rule = findRule(this._remove, node, this.options))) return rule; return this.defaultRule; }, forEach: function (iterator) { for (var i = 0; i < this.array.length; i++) iterator(this.array[i], i); } };
    function findRule(rules, node, options) { for (var i = 0; i < rules.length; i++) { var rule = rules[i]; if (filterValue(rule, node, options)) return rule; } return void 0; }
    function filterValue(rule, node, options) { var filter = rule.filter; if (typeof filter === 'string') { if (filter === node.nodeName.toLowerCase()) return true; } else if (Array.isArray(filter)) { if (filter.indexOf(node.nodeName.toLowerCase()) > -1) return true; } else if (typeof filter === 'function') { if (filter.call(rule, node, options)) return true; } else { throw new TypeError('`filter` needs to be a string, array, or function'); } return false; }
    function collapse(string) { var isBlock = /(^|[\n\r])\s*$/; if (isBlock.test(string)) return string; return string.replace(/^\s+|\s+$/g, function (match) { return match.length > 1 ? '\n' : match; }); } // Simplified collapse
    function RootNode(input, options) { var root; if (typeof input === 'string') { var doc = new DOMParser().parseFromString(input, 'text/html'); root = doc.body; } else { root = input.cloneNode(true); } var walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, null, false); var node; while ((node = walker.nextNode())) { if (isBlock(node)) node.isBlock = true; if (isVoid(node)) node.isVoid = true; } return root; } // Adjusted
    function Node(node) { node.isBlock = isBlock(node); node.isVoid = isVoid(node); node.isBlank = !isVoid(node) && !node.textContent.trim(); return node; }
    function TurndownService(options) { if (!(this instanceof TurndownService)) return new TurndownService(options); var defaults = { headingStyle: 'setext', hr: '* * *', bulletListMarker: '*', codeBlockStyle: 'indented', fence: '```', emDelimiter: '_', strongDelimiter: '**', linkStyle: 'inlined', linkReferenceStyle: 'full', br: '  ', preformattedCode: false, blankReplacement: function (content, node) { return node.isBlock ? '\n\n' : ''; }, keepReplacement: function (content, node) { return node.isBlock ? '\n\n' + node.outerHTML + '\n\n' : node.outerHTML; }, defaultReplacement: function (content, node) { return node.isBlock ? '\n\n' + content + '\n\n' : content; } }; this.options = extend({}, defaults, options); this.rules = new Rules(this.options); }
    TurndownService.prototype = { addRule: function (key, rule) { this.rules.add(key, rule); return this; }, keep: function (filter) { this.rules.keep(filter); return this; }, remove: function (filter) { this.rules.remove(filter); return this; }, use: function (plugins) { if (!Array.isArray(plugins)) plugins = [plugins]; for (var i = 0; i < plugins.length; i++) plugins[i](this); return this; }, turndown: function (input) { if (!canConvert(input)) { throw new TypeError(input + ' is not a string, or an element/document/fragment node.'); } var output = ''; var root = new RootNode(input, this.options); var rules = this.rules; (function reduce(node) { var parent = node.parentNode; if (parent && parent.nodeName === 'PRE' && node.nodeName === 'CODE') {} else if (node.nodeType === 3) { output += node.nodeValue; } else if (node.nodeType === 1) { var rule = rules.forNode(node); var content = ''; if (node.hasChildNodes()) { var previousOutput = output; output = ''; for (var i = 0; i < node.childNodes.length; i++) { reduce(node.childNodes[i]); } content = output; output = previousOutput; } output += rule.replacement(content, node, rules.options); } })(root); return output.trim(); } };
    function canConvert(input) { return input != null && (typeof input === 'string' || (input.nodeType && (input.nodeType === 1 || input.nodeType === 9 || input.nodeType === 11))); }
    return TurndownService;
}());

console.log("✅ TurndownService 已成功注入！可以执行下一步。");
```



## 初始化全局变量与依赖

（这一步定义数据仓库、加载转换库、锁定滚动条）

``` javascript
// 1. 初始化全局变量
window.GLOBAL_MESSAGES = [];   // 📦 存放最终数据
window.VISITED_IDS = new Set(); // 🛡️ 全局去重集合
window.STOP_SIGNAL = false;    // 🛑 暂停信号 (置为 true 停止)

// 2. 锁定滚动容器
window.SCROLLER = document.querySelector('ms-autoscroll-container') || document.querySelector('ms-chat-session')?.parentElement;
if (window.SCROLLER) {
    window.SCROLLER.style.border = "5px solid red"; // 红框标记
    console.log("✅ 容器已锁定，准备就绪。");
} else {
    console.error("❌ 未找到滚动容器！");
}

// 3. 加载 Turndown (如果之前没加载过)
if (typeof TurndownService === 'undefined') {
    (function() {
        if (window.trustedTypes && window.trustedTypes.createPolicy && !window.trustedTypes.defaultPolicy) {
            try { window.trustedTypes.createPolicy('default', { createHTML: s=>s, createScript: s=>s, createScriptURL: s=>s }); } catch(e){}
        }
        var s = document.createElement('script');
        s.src = "https://unpkg.com/turndown/dist/turndown.js";
        s.onload = () => console.log("✅ Turndown 库加载完成！");
        document.head.appendChild(s);
    })();
} else {
    console.log("✅ Turndown 库已存在。");
}
```



### 第二步：定义工具函数

（定义节点清洗、HTML转Markdown配置、思考节点检测）

```javascript
// 4. 配置 Turndown
window.ts = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });
window.ts.remove(['script', 'style', 'button', 'mat-icon', 'mat-tooltip-component']);
window.ts.addRule('angularComponents', {
    filter: ['ms-cmark-node', 'ms-text-chunk', 'ms-prompt-chunk', 'p'],
    replacement: content => '\n\n' + content + '\n\n'
});

// 5. 节点清洗函数
window.cleanNode = function(originalNode, role) {
    const clone = originalNode.cloneNode(true);
    // 移除干扰元素
    const trash = ['.actions-container', '.turn-header', 'ms-chat-turn-options', '.turn-information', '.run-button-container', 'button', 'mat-icon', 'svg', '.virtual-scroll-spacer', 'ms-safety-pills', 'mat-expansion-panel'];
    trash.forEach(sel => clone.querySelectorAll(sel).forEach(el => el.remove()));
    // 只取内容层
    if (role === 'model' || role === 'user') {
        const contentDiv = clone.querySelector('.turn-content');
        if (contentDiv) return contentDiv;
    }
    return clone;
};

// 6. 思考节点检测
window.isThinkingNode = function(turn) {
    const text = turn.innerText.trim().toLowerCase();
    return text.startsWith('model') && (text.includes('thoughts') || text.includes('thinking'));
};
```



### 第三步：定义核心提取函数 `extractCurrentScreen`

（这是你的逻辑核心：**扫描 -> 去重 -> 提取 -> 存入数组 -> 打印日志**）

```javascript
// 7. 定义屏幕提取函数
window.extractCurrentScreen = function() {
    const turns = document.querySelectorAll('ms-chat-session .chat-session-content > ms-chat-turn');
    let addedCount = 0;

    turns.forEach((turn) => {
        // A. ID 生成与去重
        let id = turn.id;
        if (!id) id = 'gen-' + turn.innerText.substring(0, 35).replace(/\s/g, ''); // 兜底ID

        // 🛑 核心去重：检查 VISITED_IDS (不仅仅是最后一条，而是历史所有)
        if (window.VISITED_IDS.has(id)) {
            return; // 如果已存在，直接跳过
        }

        // B. 预处理
        const rawText = turn.innerText; // 原生 innerText
        const rawTextLower = rawText.trim().toLowerCase();
        
        // 过滤纯占位符
        if (rawTextLower === 'model') return;

        // C. 角色判断
        let role = 'user';
        if (turn.getAttribute('data-turn-role') === 'Model' || 
            turn.querySelector('.model-prompt-container') || 
            rawTextLower.startsWith('model')) {
            role = 'model';
        }

        // D. 过滤思考节点
        if (role === 'model' && window.isThinkingNode(turn)) {
            console.log(`⏭️ [Skip] 思考节点`);
            window.VISITED_IDS.add(id); // 标记为已访问，下次不再检查
            return;
        }

        // E. 转换 Markdown
        const cleanEl = window.cleanNode(turn, role);
        const md = window.ts.turndown(cleanEl.outerHTML).trim();

        if (md) {
            // F. ✅ 存入数据 (包含你要求的4个属性)
            const message = {
                sequence: window.GLOBAL_MESSAGES.length, // 当前序号
                role: role,
                content: md,
                innertext: rawText // 原生 innerText
            };

            window.GLOBAL_MESSAGES.push(message);
            window.VISITED_IDS.add(id); // 标记 ID
            addedCount++;

            // G. 打印日志 (包含 innerText 前20字符)
            const logText = rawText.substring(0, 20).replace(/\n/g, ' ');
            console.log(`✅ [Add] seq:${message.sequence} | ${role} | "${logText}..."`);
        }
    });

    if (addedCount > 0) console.log(`📊 本次新增: ${addedCount} 条`);
};
```

### 第四步：定义循环控制函数 `startScraper`

（按照你的要求：**滚动 810px或者`window.innerHeight * 0.8` -> 等待 1200ms -> 插入 -> 循环**）

```javascript
// 8. 定义自动化循环
window.startScraper = async function() {
    window.STOP_SIGNAL = false;
    console.log("🚀 脚本启动！输入 window.STOP_SIGNAL = true 停止。");
    
    // 首次运行前先抓取第一屏 (防止第一屏被滚过去)
    console.log("📸 抓取初始屏幕...");
    window.extractCurrentScreen();

    while (true) {
        // 1. 检查暂停信号
        if (window.STOP_SIGNAL) {
            console.warn("🛑 循环已由用户终止。");
            break;
        }

        // 2. 滚动固定距离 (810px)
        if (window.SCROLLER) {
            window.SCROLLER.scrollBy({ top: 810, behavior: 'smooth' });
            // console.log("⬇️ 滚动 810px...");
        }

        // 3. 等待固定时间 (1200ms)
        await new Promise(r => setTimeout(r, 1200));

        // 4. 提取当前屏幕内容
        window.extractCurrentScreen();
        
        // 5. (可选) 简单的触底检查日志，但不停止循环，除非你手动停
        if (window.SCROLLER && (window.SCROLLER.scrollTop + window.SCROLLER.clientHeight >= window.SCROLLER.scrollHeight - 50)) {
            console.log("⚓️ 似乎到底了，但我会继续尝试...");
        }
    }
    
    console.log(`🏁 任务结束。共收集 ${window.GLOBAL_MESSAGES.length} 条数据。`);
    console.log("👉 输入 copy(window.GLOBAL_MESSAGES) 复制结果。");
};
```



### 如何使用：

1. **按顺序**复制上面的代码块并在控制台执行。
2. 输入 `startScraper()` 并回车，脚本开始工作。
3. 你会看到日志不断跳动：`✅ [Add] seq:5 | model | "当然可以..."`。
4. 当页面滚到底部不再有新数据增加时，输入 `window.STOP_SIGNAL = true` 停止。
5. 输入 `copy(window.GLOBAL_MESSAGES)` 复制所有数据。