function setHighLight(dealData, dataMap, replaceKeyword) {
    try {
        if (typeof dealData == "string") {
            dealData = dealData.toLowerCase();
            dealData = dealData.replace(replaceKeyword, function (matched) {
                return dataMap.map[matched];
            });
            dealData = dealData;
        } else if (typeof dealData == "object" && dealData != null) {
            for (let i = 0; i < dealData.length; i++) {
                dealData[i] = dealData[i].toLowerCase();
                dealData[i] = dealData[i].replace(replaceKeyword, function (matched) {
                    return dataMap.map[matched];
                });
                dealData[i] = dealData[i];
            }
        }
    } catch (ex) {
        console.log(ex);
    }

    return dealData;
}

function replaceSpecialSymbol(str) {
    let re = "";
    let dst = "";

    re = new RegExp('\\*', 'gi');
    dst = "^~";
    str = str.replace(re, dst);

    re = new RegExp('\\+', 'gi');
    dst = "^!";
    str = str.replace(re, dst);

    re = new RegExp('\\$', 'gi');
    dst = "^@";
    str = str.replace(re, dst);

    re = new RegExp('\\|', 'gi');
    dst = "^#";
    str = str.replace(re, dst);

    re = new RegExp('\\?', 'gi');
    dst = "^^";
    str = str.replace(re, dst);

    re = new RegExp('\\^\\$', 'gi');
    dst = "-";
    str = str.replace(re, dst);

    return str;
}
function unReplaceSpatialSymbol(str) {
    let re = "";
    let dst = "";

    re = new RegExp('\\^\\~', 'gi');
    dst = "*";
    str = str.replace(re, dst);

    re = new RegExp('\\^\\!', 'gi');
    dst = "+";
    str = str.replace(re, dst);

    re = new RegExp('\\^\\@', 'gi');
    dst = "$";
    str = str.replace(re, dst);

    re = new RegExp('\\^\\#', 'gi');
    dst = "|";
    str = str.replace(re, dst);

    re = new RegExp('\\^\\^', 'gi');
    dst = "?";
    str = str.replace(re, dst);

    re = new RegExp('\\^\\$', 'gi');
    dst = "-";
    str = str.replace(re, dst);

    return str;
}

function Map() {
    this.map = new Object();
};
Map.prototype = {
    put: function (key, value) {
        this.map[key] = value;
    },
};
export {
    setHighLight,
    Map,
    replaceSpecialSymbol,
}