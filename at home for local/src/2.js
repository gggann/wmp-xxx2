function Commandtext(v) {
    console.log(v)
    let oInput = document.createElement('textarea');
    oInput.innerHTML = v;
    document.body.appendChild(oInput);
    oInput.select();
    document.execCommand("Copy");
    oInput.style.display = 'none'
    document.body.removeChild(oInput);
}
function outtest(v){
    console.log('outtset:',v)
}

export {
    Commandtext,
    outtest,
}