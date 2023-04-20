async deallistall(vv) {
    var that = this
    var aaaa = ""
    await axios
        .get('/deal/' + vv.link.value)
        .then(res => {
            let abb = `GV.set('initialData', `
            let abc = `GV.set('assistData'`
            let checkdealtype = eval(getSubstring(res.data, abb, abc).replace(`'));`, `')`))
            if (checkdealtype.prodSimpleList) {
                for (let i of checkdealtype.prodSimpleList) {
                    aaaa = aaaa + (i.prodNm)
                }
            } else if (checkdealtype.dealProdGroups.groups) {
                for (let i of checkdealtype.dealProdGroups.groups) {
                    aaaa = aaaa + (i.groupProds[0].prodNm)
                }
            }
        })
        .catch(function (error) { // 请求失败处理
            console.log(error);
        });
       vv.deal_list_name = aaaa
    if (aaaa.indexOf(document.querySelector("#검색어").value.toLowerCase()) != -1) {
        //console.log("存在")
        return true
    } else {
        this.dealvalue.push(vv.link.value)
        //console.log("没有")
        //console.log(this.dealvalue)
        return false
    }
}

async deallist(VV) {
    this.deallisthtml = [];
    this.deallistimg = []
    this.dealliststorename = "DEAL"
    await axios
        .get('/deal/' + VV)
        .then(res => {
            let abb = `GV.set('initialData', `
            let abc = `GV.set('assistData'`
            //this.dealliststorename = $(res.data).find(".store_name").text()
            let checkdealtype = eval(getSubstring(res.data, abb, abc).replace(`'));`, `')`))
            if (checkdealtype.prodSimpleList) {
                for (let i of checkdealtype.prodSimpleList) {
                    this.deallisthtml.push(i.prodNm)
                    this.deallistimg.push(`<img src="` + i.mainImg.thumb.imgUrl + `" alt="">`)
                }
            } else if (checkdealtype.dealProdGroups.groups) {
                for (let i of checkdealtype.dealProdGroups.groups) {
                    this.deallisthtml.push(i.groupProds[0].prodNm)
                    this.deallistimg.push(`<img src="` + i.groupProds[0].mainImg.thumb.imgUrl + `" alt="">`)
                }
            }
        })
        .catch(function (error) { // 请求失败处理
            console.log(error);
        });
    document.querySelector("#show-modal").click()
},