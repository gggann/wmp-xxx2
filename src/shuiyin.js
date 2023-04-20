

const setWatermark = () => {
    let canvas = document.createElement('canvas');
    canvas.width = 320;
    canvas.height = 170;
    canvas.style.border = '4px solid red';
    let ctx = canvas.getContext('2d');
    ctx.rotate(-25 * Math.PI / 180);
    ctx.font = '25px Vedana';
    ctx.textBaseline = 'Middle'
    ctx.fillStyle = '#444'
    ctx.fillText(document.querySelector("#검색어")?.value, 10, 160);





    let div = document.createElement('div');
    div.style.pointerEvents = 'none';
    div.style.top = '0px';
    div.style.left = '0px';
    div.style.opacity = '0.2';
    div.style.position = 'fixed';
    // div.style.zIndex = '-1';
    div.style.width = document.documentElement.clientWidth + 'px';
    div.style.height = document.documentElement.clientHeight + 'px';
    div.style.background = 'url(' + canvas.toDataURL('image/png') + ') left top repeat';

    let a = document.createElement('a');
    // a.innerText = '参考文档：https://juejin.cn/post/6844904095749242888';
    // a.href = 'https://juejin.cn/post/6844904095749242888';

    let docFragments = document.createDocumentFragment();


    docFragments.appendChild(a);
    for (let i = 0; i < 100; i++) {
        let divs = document.createElement('div');
        // divs.innerText = '我是一个滚动文字' + i;
        //docFragments.appendChild(divs);
    }
    docFragments.appendChild(div);
    document.body.appendChild(docFragments);
}
setTimeout(() => {
    setWatermark();
}, 8000);


