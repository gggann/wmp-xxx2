function setHighLight(dealData, dataMap, replaceKeyword) {
    try {
        if (typeof dealData == "string") {
            dealData = replaceSpecialSymbol(dealData.toLowerCase());
            dealData = dealData.replace(replaceKeyword, function (matched) {
                return dataMap.map[matched];
            });
            dealData = unReplaceSpatialSymbol(dealData);
        } else if (typeof dealData == "object" && dealData != null) {
            for (let i = 0; i < dealData.length; i++) {
                dealData[i] = replaceSpecialSymbol(dealData[i].toLowerCase());
                dealData[i] = dealData[i].replace(replaceKeyword, function (matched) {
                    return dataMap.map[matched];
                });
                dealData[i] = unReplaceSpatialSymbol(dealData[i]);
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
Map = function () {
    this.map = new Object();
};
Map.prototype = {
    put: function (key, value) {
        this.map[key] = value;
    },
    get: function (key) {
        return this.map[key];
    },
    containsKey: function (key) {
        return key in this.map;
    },
    containsValue: function (value) {
        for (var prop in this.map) {
            if (this.map[prop] == value) return true;
        }
        return false;
    },
    isEmpty: function (key) {
        return (this.size() == 0);
    },
    clear: function () {
        for (var prop in this.map) {
            delete this.map[prop];
        }
    },
    remove: function (key) {
        delete this.map[key];
    },
    keys: function () {
        var keys = new Array();
        for (var prop in this.map) {
            keys.push(prop);
        }
        return keys;
    },
    values: function () {
        var values = new Array();
        for (var prop in this.map) {
            values.push(this.map[prop]);
        }
        return values;
    },
    size: function () {
        var count = 0;
        for (var prop in this.map) {
            count++;
        }
        return count;
    }
};
export {
    setHighLight,
    replaceSpecialSymbol,
    unReplaceSpatialSymbol,
}