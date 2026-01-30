GM_addStyle(GM_getResourceText('common_css'));
GM_addStyle(GM_getResourceText('sohu_css'));

ready('.main-box.house-news .main-right.right', () => {
    reset_layout(
        '.main-box.business-news .main-right.right',
        '.main-box .focus-news',
        '.main-box.yule-news .main-right.right',
        '.main-box.it-news .main-right.right',
        '.main-box.sports-news .main-right.right',
        '.main-box.house-news .main-right.right',
    );

    document.querySelector('.icon.icon-video').style.display = 'none'
    document.querySelector('[data-spm="top-news1"]').style.display='none'

    document.querySelectorAll('.textAd').forEach(e => e.style.display = 'none')
    setTimeout(_=>document.querySelectorAll('.textAd').forEach(e => e.style.display = 'none'),1000)
})
