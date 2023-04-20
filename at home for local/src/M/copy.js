function Command_1(v) {
    let oInput = document.createElement('textarea');
    oInput.innerHTML = v.textContent;
    document.body.appendChild(oInput);
    oInput.select();
    document.execCommand("Copy");
    oInput.style.display = 'none'
    document.body.removeChild(oInput);
}

function Commandtext_1(v) {
    // console.log(v)
    let oInput = document.createElement('textarea');
    oInput.innerHTML = v;
    document.body.appendChild(oInput);
    oInput.select();
    document.execCommand("Copy");
    oInput.style.display = 'none'
    document.body.removeChild(oInput);
}

function Commandid_1(v) {
    // console.log(v)
    let oInput = document.createElement('textarea');
    oInput.innerHTML = v;
    document.body.appendChild(oInput);
    oInput.select();
    document.execCommand("Copy");
    oInput.style.display = 'none'
    document.body.removeChild(oInput);

    if (document.querySelector("#dealname").value == "") {
        document.querySelector("#dealname").value = v;

    } else {
        document.querySelector("#dealname").value = document.querySelector("#dealname").value + "\r\n" + v
    }

}

export {
    Command_1,
    Commandid_1,
    Commandtext_1,
}