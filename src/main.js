let xObject = JSON.parse(localStorage.getItem('x'));
let hashMap = xObject || [{
    logo: 'A',
    url: 'https://www.acfun.cn'
}, {
    logo: 'B',
    url: 'https://www.bilibili.com'
}];

let simplifyUrl = url => {
    return url.replace('https://', '').replace('http://', '').replace('www.', "").replace(/\/.*/, '');
}

function render() {
    $('.siteList>li:not(.last)').remove();
    hashMap.forEach((node, index) => {
        let $li = $(` <li>
        <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <svg class="icon close">
                 <use xlink:href="#icon-close"></use>
            </svg>
        </div>
</li>`).insertBefore($('.last'));
        $li.on('click', () => {
            window.open(node.url); //直接使用a标签进行跳转的话会将close的点击事件覆盖，即使通过阻止冒泡的方式也不行
        });
        $li.on('click', '.close', e => {
            e.stopPropagation(); //阻止冒泡，即阻止点击close触发li的点击事件
            hashMap.splice(index, 1);
            render();
        })
    })
}

render();

$('.addButton').on('click', () => {
    let url = window.prompt("你要增加的网站是什么？")
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url;
    }
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        logoType: 'text',
        url: url
    });
    render();
})

window.onbeforeunload = function () {
    let string = JSON.stringify(hashMap);
    localStorage.setItem('x', string);
}

$(document).on('keypress', e => { //经验上讲，监听document比较好
    const {
        key
    } = e;
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})