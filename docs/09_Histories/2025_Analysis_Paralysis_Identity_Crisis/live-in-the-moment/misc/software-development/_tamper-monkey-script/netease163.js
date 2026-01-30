// ==UserScript==
// @name         网易
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.163.com/

// @icon         https://www.google.com/s2/favicons?sz=64&domain=163.com


// @require      file:///C:\wkspace\monkey.script/util.js
// @require      file:///C:\wkspace\monkey.script/ready.js
// @require      file:///C:\wkspace\monkey.script/netease163.js

// @resource     common_css file:///C:\wkspace\monkey.script\util.css
// @resource     netease_css file:///C:\wkspace\monkey.script\netease163.css

// @grant       GM_getResourceText
// @grant        GM_addStyle
// ==/UserScript==
// GM_addStyle(GM_getResourceText('common_css'));
// GM_addStyle(GM_getResourceText('netease_css'));


ready('.ns_area_money',()=>{
  console.log('======================reader');
  // document.querySelectorAll('.cm_area.ns_area_top,.cm_area .col_r,.ns_area_textlink.mod_js_ad, .mod_index_ad, .common_nav ,.ntes_nav_wrap,.post_side,.col_l').forEach(e => e.remove())
  if(!document.URL.endsWith('.com')){
    setTimeout(()=>reset_layout(
      '.ns_area_money',
        '.news_default_yw .cm_ul_round:nth-child(3)',
        '.ns_area_tech',
        ),100)

  }
})
