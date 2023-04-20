
import {
    setHighLight,
    replaceSpecialSymbol,
    unReplaceSpatialSymbol,
} from '../M/highlight.js'

import {
    Command_1,
    Commandid_1,
    Commandtext_1,
} from '../M/copy.js'

import { getSubstring } from '../M/getSubstring.js'
import { hotkey, show} from '../M/hotkey.js'

import {
    add_IDB_ids,
    get_IDB_ids,
    put_IDB_ids,
    get_IDB_ids_ctlg,
    put_IDB_cms,
    get_IDB_cms,
} from '../indexdb.js'

export default Vue.component('vnn', {
    props: ['message', 'checkboxmessage', 'alljson'],
    template: `
    <div>

<div id="총디브" v-on="idcate"></div>

<!-- @ -->

<div id="부스팅점수" v-for="(v,i) in boostCategories" :key="i">
{{setalljson(v.categoryCd)+" "}}<span style="color:red">{{v.score}}</span></div>
<div id="카테통계특가">
<div id="부스팅점수" v-for="(v,i) in boostCategories1" :key="i">{{setalljson(v.categoryCd)+" "}}<span
style="color:blue">{{v.score}}</span></div>

<!-- @ -->

<div id="카테통계특가">

<div id="카테상세">
<div v-for="(v,i) in getWordCnt(cate통계)" :key="i">{{i+" >  "+v}}</div>
</div>
<div id="카테코드">
<div v-for="(v,i) in getWordCnt(cate통계코드)" :key="i"><span
@click="Commandid(parseInt(i.slice(0,8)))">{{i.slice(0,8)}}</span><span
@click="InputCateCd=i.slice(10,17);radio='카테고리추출'">{{i.slice(10,33)+" >  "+v}}</span></div>
</div>


<div>
<div v-for="(v,i) in excludedCategoryIds" :key="i" style="color:red">{{setalljson(v)}}</div>
</div>

<div id="상품수" @click="Commandtext(message)">{{message+":"+info1.length}}</div>
<hr>
</div>

<div>
<input id="검색어" type="text" :placeholder="message" v-model="keyword" style="left:0%">

<input type="radio" name="love1" v-model="radio" value="dispNm">딜명포함
<input type="radio" name="love2" v-model="radio" value="seller">셀러
<input type="radio" name="love6" id="디폴트1" v-model="radio" value="디폴트1">디폴트
<input type="radio" name="love3" v-model="radio" value="unclu" id="미포함">미포함
<button id="keylength1" @click="keywordlength++">+</button> <button id="keylength2"
@click="keywordlength--">-</button>
<input type="range" v-model="keywordlength" style="left:0%">{{keywordlength}}
<input type="radio" name="love4" v-model="radio" value="twoword">2글자 {{kw1}} {{kw2}}
<input type="radio" id="블랙리스트c" name="love5" v-model="radio" value="ck1">{{checklisttext1}}
<input type="radio" id="블랙리스트c2" name="love7" v-model="radio" value="ck2">{{checklisttext2}}

<button @click="idididcatalog">아이디추출</button>
<button id="show-vodal" @click="showModal = true">{{"all:"+dealscount}}</button>

<input id="카테고리명" type="text" placeholder="" v-model="InputCateCd" style="left:0%">
<input id="카테고리추출" type="radio" name="love8" v-model="radio" value="카테고리추출">카테
<!--<input id="nosave" type="radio" name="love9" v-model="radio" value="nosave">
<label for="nosave">nosave</label>-->
<button id="btn_nosave2" @click="nosave_filter">nosave</button>
<input id="EP" type="radio" name="love10" v-model="radio" value="EP">
<label for="EP">EP</label>

<span v-for="(vtoken,i) in token[0]" :key="i"> / {{vtoken.token}}</span>
<button id="pricebutton1" @click="upprice"><span v-if="uppriceif">가격↓</span><span v-else>가격↑</span></button>
<button @click="hidecatalog"><span v-if="catalogif">카탈숨기</span><span v-else>카탈보기</span></button>
<button @click="catalonly"><span v-if="catalogonlyif">카탈만보기</span><span v-else>원본보기</span></button>
<vodal :modalstorename="dealliststorename" :modalhtml="deallisthtml" :modalimg="deallistimg" v-if="showModal"
@close="showModal = false">

</vodal>
<button @click="idcate2">⑥</button>
<button @click="idcate3">③</button>
<button @click="alldeal" id="딜리스트">✔</button>
<input id="localkwdlength" type="text" :placeholder="10" v-model="localkwdlength" style="left:0%;width:32px">
<button id="localsave" @click="localStoragesave">🎨</button>
<button id="test" @click="test">test</button>
<button id="remove_opacity" @click="remove_opacity">JPG</button>
</div>

<div v-if="force">네이버는<span style="color:red">{{force}}</span>로 검색</div>
<div v-if="errata">네이버는<span style="color:red">{{errata}}</span>로 검색</div>

<div id="dealtype" :class="v.link.type+checkctlglength(v)" v-for="(v,i) in info1" :key="v.link.value">

<span class="index">{{dealindex[i]}}</span> <span id="브랜드"
v-html="highlightData(v.administrator.product.brandKeyword)"></span>
<!--<a :href='"https://front.wemakeprice.com/" + stype(v.link.type)+"/"+v.link.value' target="_blank"><img-->
<!--<a :href="'https://mfront.wd.wemakeprice.com/catalog/'+v.catalog.catalogNo+'?catalogId='+v.catalog.catalogNo+'&buyingConditionId='+v.catalog.buyingConditionId" target="_blank"><img -->
<a :href='checkimgsrc(v)' target="_blank"><img
class="card-img-top" :src=cimg(v) alt="Card image cap" :style="'opacity:'+v.link.check"></a>


<div id="lastdeal" v-if="i==info1.length-1"></div>
<div id="정보">
<div id="기본정보">

<select name="comment" style="font-size:12px;"class="combo-bx" v-model='CmsoptionValue'>
<option value="카테고리오맵핑">카오</option>
<option value="서치태그과등록">내과</option>
<option value="브랜드과등록">브랜드과등록</option>
<option value="딜네임과등록">딜과</option>
<option value="검색어포함">검포</option>
<option value="직접입력">직접입력</option>
</select>
<button style="font-size:10px;" @click='postmanctlg(v.administrator.product.catalogNo)'>cms</button>

<!--<span id="딜번호" @click="Commandid(v.link.value)">{{v.link.value}}</span>>-->
<span id="딜타입">{{v.catalog.lowestPriceProductType}}</span>
<span id="카탈로그번호" v-if="v.administrator.product.catalogNo"
@click="Commandid(v.administrator.product.catalogNo)">{{" "+v.administrator.product.catalogNo}}</span>
<div>
<div id="딜이름가격"
@click="Commandtext(v.link.value+'\t'+v.dispNm+'\t'+'CATE제외'+'\t'+v.administrator.product.physicsCategoryIds.lcateNm)"
@dblclick="Commandtext(v.link.value+'\t'+v.dispNm)"
v-html="highlightData(v.dispNm)+' : '+v.salePrice+' 원'"></div>

</div>
<button v-if="v.link.type=='DEAL'" @click='deallist(v.link.value)'>🐛</button>
<button v-else @click='deallist2(v.link.value)'>👄</button>
<div id="상세정보">

<div id="카테고리" v-if="v.administrator.product.physicsCategoryIds">
<span @dblclick="Commandtext(v.administrator.product.physicsCategoryIds.lcateCd)"
@click="Command(event.target)">{{v.administrator.product.physicsCategoryIds.lcateNm}}</span> >
<span @dblclick="Commandtext(v.administrator.product.physicsCategoryIds.mcateCd)"
@click="Command(event.target)">{{v.administrator.product.physicsCategoryIds.mcateNm}}</span> >
<span @dblclick="Commandtext(v.administrator.product.physicsCategoryIds.scateCd)"
@click="Command(event.target)">{{v.administrator.product.physicsCategoryIds.scateNm}}</span> >
<span @dblclick="Commandtext(v.administrator.product.physicsCategoryIds.dcateCd)"
@click="Command(event.target)">{{v.administrator.product.physicsCategoryIds.dcateNm}}</span>
<span style="color:rgb(90, 36, 36);font-size:15px"
v-html="highlightData(v.administrator.product.catalogCategoryKeyword)"></span>
</div>
<div id="내부키워드" v-html="highlightData(v.administrator.product.innerKeyword)"></div>
<div id="딜내부키워드" v-html="highlightData(v.administrator.product.dealInnerKeyword)"></div>
<div id="파트너정보" @dblclick='Commandtext("seller:"+v.administrator.product.partnerId+"&"+message)'>
{{v.administrator.product.partnerName}}{{" seller:"+v.administrator.product.partnerId}}</div>
</div>
</div>
</div>
</div>
</div>

<!-- @@@@@@@@@@@@@@@ -->

<div id="삼팔선2" v-if="info2.length>0">-------------------------------</div>

<!-- @@@@@@@@@@@@@@@ -->
<div id="checkarea">
<div id="dealtype" :class="v.link.type+checkctlglength(v)" v-for="(v,i) in info2" :key="v.link.value">

<span class="index">{{dealindex[i]}}</span> <span id="브랜드"
v-html="highlightData(v.administrator.product.brandKeyword)"></span>
<!--<a :href='"https://front.wemakeprice.com/" + stype(v.link.type)+"/"+v.link.value' target="_blank"><img-->
<!--<a :href="'https://mfront.wd.wemakeprice.com/catalog/'+v.catalog.catalogNo+'?catalogId='+v.catalog.catalogNo+'&buyingConditionId='+v.catalog.buyingConditionId" target="_blank"><img -->


<a :href='checkimgsrc(v)' target="_blank"><img
class="card-img-top" :src=cimg(v) alt="Card image cap" :style="'opacity:'+v.link.check"></a>


<div id="lastdeal" v-if="i==info2.length-1"></div>
<div id="정보">
<div id="기본정보">

<select name="comment" style="font-size:12px;"class="combo-bx" v-model='CmsoptionValue'>
<option value="카테고리오맵핑">카오</option>
<option value="서치태그과등록">내과</option>
<option value="브랜드과등록">브랜드과등록</option>
<option value="딜네임과등록">딜과</option>
<option value="검색어포함">검포</option>
<option value="직접입력">직접입력</option>
</select>
<button style="font-size:10px;" @click='postmanctlg(v.administrator.product.catalogNo)'>cms</button>

<!--<span id="딜번호" @click="Commandid(v.link.value)">{{v.link.value}}</span>-->
<span id="딜타입">{{v.catalog.lowestPriceProductType}}</span>
<span id="카탈로그번호" v-if="v.administrator.product.catalogNo"
@click="Commandid(v.administrator.product.catalogNo)">{{" "+v.administrator.product.catalogNo}}</span>
<div>
<div id="딜이름가격"
@click="Commandtext(v.link.value+'\t'+v.dispNm+'\t'+'CATE제외'+'\t'+v.administrator.product.physicsCategoryIds.lcateNm)"
@dblclick="Commandtext(v.link.value+'\t'+v.dispNm)"
v-html="highlightData(v.dispNm)+' : '+v.salePrice+' 원'"></div>

</div>
<button v-if="v.link.type=='DEAL'" @click='deallist(v.link.value)'>🐛</button>
<button v-else @click='deallist2(v.link.value)'>👄</button>
<div id="상세정보">

<div id="카테고리" v-if="v.administrator.product.physicsCategoryIds">
<span @dblclick="Commandtext(v.administrator.product.physicsCategoryIds.lcateCd)"
@click="Command(event.target)">{{v.administrator.product.physicsCategoryIds.lcateNm}}</span> >
<span @dblclick="Commandtext(v.administrator.product.physicsCategoryIds.mcateCd)"
@click="Command(event.target)">{{v.administrator.product.physicsCategoryIds.mcateNm}}</span> >
<span @dblclick="Commandtext(v.administrator.product.physicsCategoryIds.scateCd)"
@click="Command(event.target)">{{v.administrator.product.physicsCategoryIds.scateNm}}</span> >
<span @dblclick="Commandtext(v.administrator.product.physicsCategoryIds.dcateCd)"
@click="Command(event.target)">{{v.administrator.product.physicsCategoryIds.dcateNm}}</span>
<span style="color:rgb(90, 36, 36);font-size:15px"
v-html="highlightData(v.administrator.product.catalogCategoryKeyword)"></span>
</div>
<div id="내부키워드" v-html="highlightData(v.administrator.product.innerKeyword)"></div>
<div id="딜내부키워드" v-html="highlightData(v.administrator.product.dealInnerKeyword)"></div>
<div id="파트너정보" @dblclick='Commandtext("seller:"+v.administrator.product.partnerId+"&"+message)'>
{{v.administrator.product.partnerName}}{{" seller:"+v.administrator.product.partnerId}}</div>
</div>
</div>
<div id="lastdeal" v-if="i==info2.length-1"></div>
</div>
</div>
</div>
  
   `,
    data() {
        return {
            localkeyword: this.message.trim().replace(" ", ""),
            localjson: {},
            IDB_IDS_INFO: [],
            kw: "",
            InputCateCd: "",
            keywordlength: 0,
            radio1: "",
            radio: "unclu",
            keyword: this.message,
            dealid: [],
            info: [],
            areaid: this.message,
            classid: "cateinfo",
            dealurl: [],
            cate통계: [],
            cate통계코드: [],
            checkradio: this.checkboxmessage,
            dealindex: [],
            checkif: true,
            boostCategories: [],
            boostCategories1: [],
            alljson: this.alljson,
            message: this.message,
            token: [],
            an: [],
            showModal: false,
            hightLight: [],
            uppriceif: 0,
            catalogif: 1,
            catalogonlyif: 1,
            dealscount: "",
            excludedCategoryIds: [],
            deallisthtml: [],
            deallistimg: [],
            dealliststorename: "",
            errata: "",
            force: "",
            dealvalue: [],
            checklisttext1: "..ing",
            checklisttext2: "..ing",
            localkwdlength: 60,
            localjsonparsekeyword1: "",
            localjsonparsekeyword2: "",
            CmsoptionValue: "서치태그과등록",
            금지어:['유아','어린이','키즈','주니어','남아','여아','강아지','애견']
            //dealorone:true
        }
    },
    created() {
    },
    methods: {
        cimg(v){
            // if(v.originImgUrl){
            //     return v.originImgUrl
            // }else {
                return v.mediumImgUrl
            // }
        },
        remove_opacity(){
       $("#dealtype > a > img").css("opacity","1")
        },
        test() {
            this.info.forEach((todo) => {
                get_IDB_ids_ctlg(todo, this.keyword)
            })
        },
        Commandtext(v) {
            Commandtext_1(v)
        },
        Commandid(v) {
            Commandid_1(v)
        },
        Command(v) {
            Command_1(v)
        },
        checkimgsrc(v){
            if(v.catalog?.lowestPriceProductType==="EP"){
                return 'https://mfront.wd.wemakeprice.com/catalog/'+v.catalog.catalogNo+'?catalogId='+v.catalog.catalogNo+'&buyingConditionId='+v.catalog.buyingConditionId
            }else  if(v.catalog?.lowestPriceProductType==="WMP"){
                return "https://front.wemakeprice.com/" + this.stype(v.link.type)+"/"+v.link.value
            }
        },
        checkctlglength(v) {
            //if(v.administrator.product.productList.length==0){
            if (v.catalog.partnersCount == 0) {
                return " zerocatal"
            } else if(v.catalog?.lowestPriceProductType=="EP"){
                console.log(v.catalog?.lowestPriceProductType)
                return " EP"
            }else{
                return ""
            }
        },
        async postmanctlg(id, dealname) {
            console.log(id)  //WST000공통 NKT002위메프딜아이디 comment 제외유형
            let 대표키워드 = await axios.get('/keyword/check?keyword=' + this.message + '&sid=adplus').then((res) => {
                if (res.data.exists) {
                    return (res.data.keywords)
                }
                else {
                    return this.message.replace(/\s+/g, "");
                }
            })
            let poststr = 'createdRows=[{"rep_keyword":"' + 대표키워드 + '","keywords":"","wst_cd":"WST000","type_cd":"NKT004","ban_keyword":' + id + ',"comment":"' + this.CmsoptionValue + '","use_yn":"Y","rowKey":1}]'
            axios.post('/adplus2/ban/keyword/save',
                poststr,
            ).then(res => {
                if (document.querySelector("#dealname").value == "") {
                    document.querySelector("#dealname").value = id;
                } else {
                    document.querySelector("#dealname").value = document.querySelector("#dealname").value + "\r\n" + id
                }
                put_IDB_cms(dealname)
            })
        },
        async alldeal() {
            var that = this
            async function an() {
                for (let i of that.info)
                    if (i.link.type == 'DEAL') {
                        that.deallistall(i)
                    }
            }
            await an()
            this.checklisttext1 = "🟢"
            this.radio = "ck1"
        },
        async alldeal2() {
            var that = this
            async function an() {
                for (let i of that.info)
                    if (i.link.type == 'DEAL') {
                        that.deallistall2(i)
                    }
            }
            await an()
            this.checklisttext2 = "🟣"
            this.radio = "ck2"
        },
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
            if (aaaa.indexOf(document.querySelector("#검색어").value.toLowerCase()) != -1) {
                //console.log("存在")
                return true
            } else {
                this.dealvalue.push(vv.link.value)
                //console.log("没有")
                //console.log(this.dealvalue)
                return false
            }
        },
        async deallistall2(vv) {
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
            console.log(aaaa.indexOf(this.kw1), aaaa.indexOf(this.kw2), this.kw1, this.kw2)
            if (aaaa.indexOf(this.kw1) > -1 && aaaa.indexOf(this.kw2) > -1) {
                return true
            } else {
                this.dealvalue.push(vv.link.value)
                return false
            }
        },
        // async navercate() {
        //     this.errata = "";
        //     this.force = "";
        //     var that = this
        //     await axios
        //         .get(
        //             "/api/search/all?sort=rel&pagingIndex=" +
        //             that.page +
        //             "&pagingSize=80&viewType=buttonst&productSet=total&debuttonveryFee=&debuttonveryTypeValue=&frm=NVSHATC&query=" +
        //             encodeURIComponent(that.message) +
        //             //that.message+
        //             "&origQuery=" +
        //             encodeURIComponent(that.message) +
        //             "&iq=&eq=&xq="
        //         )

        //         .then(res => {
        //             that.errata = res.data.queryValidateResult.errata
        //             that.force = res.data.queryValidateResult.force

        //         })
        //         .catch(function (error) { // 请求失败处理
        //             console.log(error);
        //         });


        // },
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
            document.querySelector("#show-vodal").click()
        },
        async deallist2(VV) {
            this.deallisthtml = [];
            this.deallistimg = []
            this.dealliststorename = undefined
            await axios
                .get('/product/' + VV)
                .then(res => {
                    let checkdealtype = $(res.data).find('.deal_detailimg')[0]
                    // let asrc=checkdealtype.querySelectorAll('img[data-lazy-src]')
                    // if (asrc.length != 0) {
                    //     for (let i = 0; i < asrc.length; i++) {
                    //         asrc[i].src = asrc[i].dataset.lazySrc
                    //     }
                    // }
                    this.deallisthtml = checkdealtype.outerHTML.replaceAll('data-lazy-src', 'src')
                })
                .catch(function (error) { // 请求失败处理
                    console.log(error);
                });
            document.querySelector("#show-vodal").click()
        },

        hidecatalog() {
            if (this.catalogif == 1) {
                $('.CATAL').hide()
                this.catalogif = 0
            } else {
                $('.CATAL').show()
                this.catalogif = 1
            }
        },
        catalonly() {
            if (this.catalogonlyif == 1) {
                document.querySelectorAll('#dealtype').forEach(function (x) {
                    if (x.className !== "CATAL") {
                        $(x).hide()
                    }
                })
                this.catalogonlyif = 0
            } else {
                document.querySelectorAll('#dealtype').forEach(function (x) {
                    $(x).show()
                })
                this.catalogonlyif = 1
            }
        },
        nosave_filter(){
            this.radio = "nosave"
        },
        upprice: function () {
            this.uppriceif = !this.uppriceif
            if (this.uppriceif == 1) {
                this.info.sort((a, b) => {
                    return a['salePrice'] - b['salePrice']
                })
            } else {
                this.info.sort((a, b) => {
                    return b['salePrice'] - a['salePrice']
                })
            }
        },
        getWordCnt: function (a) {
            return a.reduce(function (prev, next) {
                prev[next] = (prev[next] + 1) || 1;
                return prev;

            }, {});
        },
        stype(v) {
            if (v == 'DEAL') {
                return v = "deal";
            } else {
                return v = "product"
            }
        },
        setalljson: function (v) {
            for (var value1 of this.alljson) {
                if (value1.categoryId === v) {
                    return (value1.categoryNm)
                }
            }
        },

        highlightData: function (value) {
            var that = this
            if (typeof value != "undefined") value = setHighLight(value, that.an, that.hightLight);
            return value;
        },
        idididcatalog: function () { //아이디 추출
            for (let i = 0; i < this.info1.length; i++) {  // && this.info1[i].administrator.product.productList.length>0
                if (this.info1[i].administrator.product.catalogNo) {
                 //   if(this.info1[i].administrator.product.productList.length>0){
                    (i !== this.info1.length - 1) ? document.querySelector("#dealname").value = document.querySelector("#dealname").value + this.info1[i].administrator.product.catalogNo + "\n" : document.querySelector("#dealname").value = document.querySelector("#dealname").value + this.info1[i].administrator.product.catalogNo
              //  }
                } else {
                    (i !== this.info1.length - 1) ? document.querySelector("#dealname").value = document.querySelector("#dealname").value + this.info1[i].link.value + "\n" : document.querySelector("#dealname").value = document.querySelector("#dealname").value + this.info1[i].link.value
                }
            }
        },
        async checklocalstorage() { //검색창에 필터로 쓸 대표키워드 있으면 가져오고 없으면 디폴드값 사용
            localforage.getItem(this.localkeyword).then(v => {
                if (v !== null) {
                    if (v.kw2 == undefined) {
                        this.localjsonparsekeyword1 = v.kw1
                        this.keyword = v.kw1
                        setTimeout(() => {
                            this.alldeal()
                        }, 0);
                    }
                    else {
                        this.localjsonparsekeyword2 = v.kw2
                        this.keyword = v.kw1 + " " + v.kw2
                        setTimeout(() => {
                            this.alldeal2()
                        }, 0);
                    }
                    if (v.length) {
                        this.localkwdlength = v.length
                    }
                    console.log(this.localjsonparsekeyword1, this.localjsonparsekeyword2, v.length)
                }
            })
        },
        localStoragesavemount() {

            localforage.getItem(this.localkeyword).then(v => {
                if (v == undefined) {
                    if (this.kw2 !== undefined) {
                        this.localjson = {
                            'kw1': this.kw1,
                            'kw2': this.kw2
                        }
                    } else if (this.kw2 == undefined) {
                        this.localjson = {
                            'kw1': this.kw1,
                            'length': this.localkwdlength
                        }
                    }
                    localforage.setItem(this.localkeyword, this.localjson)
                } else {
                    console.log(v)
                }
            })
        },
        localStoragesave() {
            if (this.kw2 !== undefined) {
                this.localjson = {
                    'kw1': this.kw1,
                    'kw2': this.kw2
                }
            } else if (this.kw2 == undefined) {
                this.localjson = {
                    'kw1': this.kw1,
                    'length': this.localkwdlength
                }
            }
            localforage.setItem(this.localkeyword, this.localjson).then((() => {
                this.test()
            }
            ))
        },
        idcate3() {
            this.info = this.info.slice(0, 90)
            this.cate통계 = this.cate통계.slice(0, 90)
            this.cate통계코드 = this.cate통계코드.slice(0, 90)
        },
        idcate2: async function () {

            if (this.checkif) {
                this.checkif = true
                var that = this
                let urlmain ="/search?abTestKey=84&abTestType=A&adminSearch=%7B%22field%22:%5B%22searchDispNm%22,%22innerKeyword%22,%22brandKeyword%22,%22specialPriceTag.specialPriceNm%22,%22bookIsbn%22,%22bookTitle%22,%22bookAuthor%22,%22bookPublisher%22,%22catalogOptionSearch%22,%22catalogCategoryKeyword%22,%22catalogModelName%22,%22dealInnerKeyword%22%5D,%22weight%22:%5B%7B%22field%22:%22searchDispNm%22,%22fieldName%22:%22%ED%83%80%EC%9D%B4%ED%8B%80%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22innerKeyword%22,%22fieldName%22:%22%EB%82%B4%EB%B6%80%ED%83%80%EC%9D%B4%ED%8B%80%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:1%7D,%7B%22field%22:%22brandKeyword%22,%22fieldName%22:%22%EB%B8%8C%EB%9E%9C%EB%93%9C%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22physicsCategoryIds%22,%22fieldName%22:%22%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22specialPriceTag.specialPriceNm%22,%22fieldName%22:%22%ED%8A%B9%EA%B0%80%EC%9C%A0%ED%98%95%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookTitle%22,%22fieldName%22:%22%EB%8F%84%EC%84%9C%EB%AA%85%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookIsbn%22,%22fieldName%22:%22ISBN%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookAuthor%22,%22fieldName%22:%22%EC%A0%80%EC%9E%90%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookPublisher%22,%22fieldName%22:%22%EC%B6%9C%ED%8C%90%EC%82%AC%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22catalogCategoryKeyword%22,%22fieldName%22:%22%EC%B9%B4%ED%83%88%EB%A1%9C%EA%B7%B8+%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC+%ED%82%A4%EC%9B%8C%EB%93%9C%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:3%7D,%7B%22field%22:%22dealInnerKeyword%22,%22fieldName%22:%22%EB%94%9C+%EB%82%B4%EB%B6%80%ED%82%A4%EC%9B%8C%EB%93%9C%22,%22useYn%22:true,%22fullMatchScore%22:1,%22partMatchScore%22:0%7D%5D,%22normalization%22:%5B%7B%22section%22:%22search%22,%22sectionName%22:%22%EA%B2%80%EC%83%89+%EC%A0%95%ED%99%95%EB%8F%84%22,%22normalization%22:15%7D,%7B%22section%22:%22finalScore%22,%22sectionName%22:%22%EC%83%81%ED%92%88+%EC%9D%B8%EA%B8%B0%EB%8F%84%22,%22normalization%22:4.5%7D,%7B%22section%22:%22keywordPopularityScore%22,%22sectionName%22:%22%ED%82%A4%EC%9B%8C%EB%93%9C+%EC%9D%B8%EA%B8%B0%EB%8F%84%22,%22normalization%22:20%7D,%7B%22section%22:%22boostingCategory%22,%22sectionName%22:%22%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC+%EC%A0%81%ED%95%A9%EB%8F%84%22,%22normalization%22:3%7D,%7B%22section%22:%22boostingPartner%22,%22sectionName%22:%22%ED%8C%8C%ED%8A%B8%EB%84%88+%EC%A0%81%ED%95%A9%EB%8F%84%22,%22normalization%22:10%7D,%7B%22section%22:%22boostingCatalog%22,%22sectionName%22:%22%EC%B9%B4%ED%83%88%EB%A1%9C%EA%B7%B8%22,%22normalization%22:40%7D,%7B%22section%22:%22boostingSearchSpecialPrice%22,%22sectionName%22:%22%EA%B2%80%EC%83%89%ED%8A%B9%EA%B0%80%22,%22normalization%22:30%7D%5D%7D&attribute=&attributeType=&brand=&catalogAttrs=&departmentStore=&isCatalog=false&isCatalogOnlyEp=&isFastShip=N&isFreeShip=N&isOverseasPurchase=A&isPopularCategory=Y&isSpecialPrice=N&isTodayShip=N&isUseKeywordInfo=true&keyword="
                               
                let urlpage = "&period=monthly&price=&review=&searchDest=TAB_CATALOG&selectTab=catalog&sort=weight&testScript=&testTarget=&ueKeywordInfo=Y"
                for (let page = 4; page < 7; page++) {
                    await axios
                        .get(urlmain + encodeURIComponent(that.message) + "&os=android&page=" + page + urlpage)
                        .then(res => {
                            if (page == 1) {
                                that.dealscount = res.data.dㅊata.searchInfo.displayCount
                                that.token = [...that.token, ...res.data.analyzeResult.engineTokens]
                                that.an = new Map();
                                if (typeof res.data.analyzeResult != "undefined" && res.data.analyzeResult.apiTokens) {
                                    res.data.analyzeResult.apiTokens.forEach((analyzed) => {
                                        that.an.put(analyzed.token, '<span style="font-weight: bold; color: red;' +
                                            'background-color: lightgoldenrodyellow;">' + analyzed.token + '</span>');
                                        that.hightLight = new RegExp(Object.keys(that.an.map).join("|"), "gi");

                                        console.log(that.hightLight)
                                    });
                                }
                            }
                            that.info = [...that.info, ...res.data.data.deals]
                        })
                        .catch(function (error) { // 请求失败处理
                            console.log(error);
                        });
                }
                for (let i = 90; i < that.info.length; i++) {
                    that.dealindex = [...that.dealindex, i + 1]
                    if (that.info[i].link.type == 'DEAL') {
                        that.dealurl.push("https://front.wemakeprice.com/deal/" + that.info[i].link.value)

                    } else if (that.info[i].link.type == 'PROD') {
                        if (that.info[i].administrator.product.catalogNo > 1) {
                            that.dealurl.push("https://front.wemakeprice.com/product/" + that.info[i].link.value)
                            that.info[i].link.type = "CATAL"
                        } else {
                            that.dealurl.push("https://front.wemakeprice.com/product/" + that.info[i].link.value)
                        }
                    }
                    that.cate통계 = [...that.cate통계, that.info[i].administrator.product.physicsCategoryIds.lcateNm + " > " + that.info[i].administrator.product.physicsCategoryIds.mcateNm + " > " + that.info[i].administrator.product.physicsCategoryIds.scateNm + " > " + that.info[i].administrator.product.physicsCategoryIds.dcateNm]
                    that.cate통계코드 = [...that.cate통계코드, that.info[i].administrator.product.physicsCategoryIds.lcateCd + " > " + that.info[i].administrator.product.physicsCategoryIds.lcateNm]
                }
            }
        },

    },
    computed: {
        idcate: async function () {
            if (this.info = [],
                this.boostCategories = [],
                this.boostCategories1 = [],
                this.dealindex = [],
                this.cate통계 = [],
                this.cate통계코드 = [],
                this.dealurl = [],
                this.checkif) {
                this.checkif = !0;
                var e = this;
                let t = "/search?abTestKey=84&abTestType=A&adminSearch=%7B%22field%22:%5B%22searchDispNm%22,%22innerKeyword%22,%22brandKeyword%22,%22specialPriceTag.specialPriceNm%22,%22bookIsbn%22,%22bookTitle%22,%22bookAuthor%22,%22bookPublisher%22,%22catalogOptionSearch%22,%22catalogCategoryKeyword%22,%22catalogModelName%22,%22dealInnerKeyword%22%5D,%22weight%22:%5B%7B%22field%22:%22searchDispNm%22,%22fieldName%22:%22%ED%83%80%EC%9D%B4%ED%8B%80%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22innerKeyword%22,%22fieldName%22:%22%EB%82%B4%EB%B6%80%ED%83%80%EC%9D%B4%ED%8B%80%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:1%7D,%7B%22field%22:%22brandKeyword%22,%22fieldName%22:%22%EB%B8%8C%EB%9E%9C%EB%93%9C%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22physicsCategoryIds%22,%22fieldName%22:%22%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22specialPriceTag.specialPriceNm%22,%22fieldName%22:%22%ED%8A%B9%EA%B0%80%EC%9C%A0%ED%98%95%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookTitle%22,%22fieldName%22:%22%EB%8F%84%EC%84%9C%EB%AA%85%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookIsbn%22,%22fieldName%22:%22ISBN%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookAuthor%22,%22fieldName%22:%22%EC%A0%80%EC%9E%90%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22bookPublisher%22,%22fieldName%22:%22%EC%B6%9C%ED%8C%90%EC%82%AC%22,%22useYn%22:true,%22fullMatchScore%22:0,%22partMatchScore%22:5%7D,%7B%22field%22:%22catalogCategoryKeyword%22,%22fieldName%22:%22%EC%B9%B4%ED%83%88%EB%A1%9C%EA%B7%B8+%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC+%ED%82%A4%EC%9B%8C%EB%93%9C%22,%22useYn%22:false,%22fullMatchScore%22:0,%22partMatchScore%22:3%7D,%7B%22field%22:%22dealInnerKeyword%22,%22fieldName%22:%22%EB%94%9C+%EB%82%B4%EB%B6%80%ED%82%A4%EC%9B%8C%EB%93%9C%22,%22useYn%22:true,%22fullMatchScore%22:1,%22partMatchScore%22:0%7D%5D,%22normalization%22:%5B%7B%22section%22:%22search%22,%22sectionName%22:%22%EA%B2%80%EC%83%89+%EC%A0%95%ED%99%95%EB%8F%84%22,%22normalization%22:15%7D,%7B%22section%22:%22finalScore%22,%22sectionName%22:%22%EC%83%81%ED%92%88+%EC%9D%B8%EA%B8%B0%EB%8F%84%22,%22normalization%22:4.5%7D,%7B%22section%22:%22keywordPopularityScore%22,%22sectionName%22:%22%ED%82%A4%EC%9B%8C%EB%93%9C+%EC%9D%B8%EA%B8%B0%EB%8F%84%22,%22normalization%22:20%7D,%7B%22section%22:%22boostingCategory%22,%22sectionName%22:%22%EC%B9%B4%ED%85%8C%EA%B3%A0%EB%A6%AC+%EC%A0%81%ED%95%A9%EB%8F%84%22,%22normalization%22:3%7D,%7B%22section%22:%22boostingPartner%22,%22sectionName%22:%22%ED%8C%8C%ED%8A%B8%EB%84%88+%EC%A0%81%ED%95%A9%EB%8F%84%22,%22normalization%22:10%7D,%7B%22section%22:%22boostingCatalog%22,%22sectionName%22:%22%EC%B9%B4%ED%83%88%EB%A1%9C%EA%B7%B8%22,%22normalization%22:40%7D,%7B%22section%22:%22boostingSearchSpecialPrice%22,%22sectionName%22:%22%EA%B2%80%EC%83%89%ED%8A%B9%EA%B0%80%22,%22normalization%22:30%7D%5D%7D&attribute=&attributeType=&brand=&catalogAttrs=&departmentStore=&isCatalog=false&isCatalogOnlyEp=&isFastShip=N&isFreeShip=N&isOverseasPurchase=A&isPopularCategory=Y&isSpecialPrice=N&isTodayShip=N&isUseKeywordInfo=true&keyword="
                    , a = "&period=monthly&price=&review=&searchDest=TAB_CATALOG&selectTab=catalog&sort=weight&testScript=&testTarget=&ueKeywordInfo=Y";
                function i(e) {
                // return axios.get(t + encodeURIComponent(e) + "&os=android&page=1" + a)
             return axios.get(encodeURIComponent(e.trim().replace(/ /g, ''))+'_c1.json') 
                }
                function o(e) {
                //  return axios.get(t + encodeURIComponent(e) + "&os=android&page=2" + a)
               return axios.get(encodeURIComponent(e.trim().replace(/ /g, ''))+'_c2.json') 
                }
                function n(e) {
            //    return axios.get(t + encodeURIComponent(e) + "&os=android&page=3" + a)
               return axios.get(encodeURIComponent(e.trim().replace(/ /g, ''))+'_c3.json') 
                }
                await axios.all([i(e.message), o(e.message), n(e.message)]).then(axios.spread((function (t, a, i) {
                    console.log(t, a, i),
                        e.dealscount = t.data.data.searchInfo.displayCount,
                        e.token = [...e.token, ...t.data.analyzeResult.engineTokens],
                        e.excludedCategoryIds = t.data.data.keywordRanking.excludedCategoryIds,
                        e.an = new Map,
                        void 0 !== t.data.analyzeResult && t.data.analyzeResult.apiTokens && t.data.analyzeResult.apiTokens.forEach((t => {
                            e.an.put(t.token, '<span style="font-weight: bold; color: red;background-color: lightgoldenrodyellow;">' + t.token + "</span>"),
                                e.hightLight = new RegExp(Object.keys(e.an.map).join("|"), "gi"),
                                console.log(e.hightLight)
                        }
                        )),
                        e.boostCategories = t.data.data.keywordRanking.boostCategories,
                        e.boostCategories1 = t.data.data.keywordRanking.assignedCategories,
                        e.info = [...e.info, ...t.data.data.deals],
                        e.info = [...e.info, ...a.data.data.deals],
                        e.info = [...e.info, ...i.data.data.deals]
                }
                )));
                for (let r = 0; r < e.info.length; r++)
                    e.dealindex = [...e.dealindex, r + 1],
                        "DEAL" == e.info[r].link.type ? e.dealurl.push("https://front.wemakeprice.com/deal/" + e.info[r].link.value) : "PROD" == e.info[r].link.type && (e.info[r].administrator.product.catalogNo > 1 ? (e.dealurl.push("https://front.wemakeprice.com/product/" + e.info[r].link.value),
                            e.info[r].link.type = "CATAL") : e.dealurl.push("https://front.wemakeprice.com/product/" + e.info[r].link.value)),
                        this.cate통계 = [...this.cate통계, e.info[r].administrator.product.physicsCategoryIds.lcateNm + " > " + e.info[r].administrator.product.physicsCategoryIds.mcateNm + " > " + e.info[r].administrator.product.physicsCategoryIds.scateNm + " > " + e.info[r].administrator.product.physicsCategoryIds.dcateNm],
                        this.cate통계코드 = [...this.cate통계코드, e.info[r].administrator.product.physicsCategoryIds.lcateCd + " > " + e.info[r].administrator.product.physicsCategoryIds.lcateNm]
            }
        },
        info1() {
            if (this.radio == "디폴트1") {
                return this.info
            }
            else if (this.radio == "dispNm") {

                return this.info.filter((p) => {
                    return (p.dispNm.toLowerCase().indexOf(this.keyword.toLowerCase()) !== -1) || (p.administrator.product.brandKeyword.toLowerCase().indexOf(this.keyword.toLowerCase()) !== -1)
                })
            } else if (this.radio == "seller") {
                return this.info.filter((p) => {
                    return p.administrator.product.partnerName?.toLowerCase().indexOf(this.keyword.toLowerCase()) !== -1
                })
            } else if (this.radio == "unclu") {
                return this.info.filter((p) => {
                    return p.dispNm.substring(0, this.keywordlength).toLowerCase().indexOf(this.keyword.toLowerCase()) == -1
                })
            } else if (this.radio == "카테고리추출") {
                if (isNaN(this.InputCateCd)) {
                    return this.info.filter((p) => {
                        return p.administrator.product.physicsCategoryIds.dcateCd == this.InputCateCd || p.administrator.product.physicsCategoryIds.dcateNm.indexOf(this.InputCateCd) > -1 ||
                            p.administrator.product.physicsCategoryIds.scateCd == this.InputCateCd || p.administrator.product.physicsCategoryIds.scateNm.indexOf(this.InputCateCd) > -1 ||
                            p.administrator.product.physicsCategoryIds.mcateCd == this.InputCateCd || p.administrator.product.physicsCategoryIds.mcateNm.indexOf(this.InputCateCd) > -1 ||
                            p.administrator.product.physicsCategoryIds.lcateCd == this.InputCateCd || p.administrator.product.physicsCategoryIds.lcateNm.indexOf(this.InputCateCd) > -1

                    })
                } else {
                    return this.info.filter((p) => {
                        return p.administrator.product.physicsCategoryIds.dcateCd == this.InputCateCd || p.administrator.product.physicsCategoryIds.scateCd == this.InputCateCd ||
                            p.administrator.product.physicsCategoryIds.mcateCd == this.InputCateCd || p.administrator.product.physicsCategoryIds.lcateCd == this.InputCateCd

                    })
                }
            } else if (this.radio == "twoword" && (this.keyword.split(" ").length == 2)) {
                console.log(this.keyword, this.keyword.split(" ").length)
                return this.info.filter((p) => {
                    return !(p.dispNm.toLowerCase().indexOf(this.kw1.toLowerCase()) > -1 && p.dispNm.toLowerCase().indexOf(this.kw2.toLowerCase()) > -1)
                })
            } else if (this.radio == "ck1") {
                return this.info.filter((p) => {
                    return (this.dealvalue.indexOf(p.link.value) != -1) || (p.link.type !== "DEAL" && p.dispNm.substring(0, this.localkwdlength).toLowerCase().indexOf(this.keyword.toLowerCase()) == -1)
                })
            } else if (this.radio == "ck2") {
                return this.info.filter((p) => {
                    return this?.dealvalue.indexOf(p.link.value) != -1 || (!(p.dispNm.toLowerCase().indexOf(this.kw1.toLowerCase()) > -1 && p.dispNm.toLowerCase().indexOf(this?.kw2?.toLowerCase()) > -1) && p.link.type !== 'DEAL')
                })
            } else if (this.radio == "nosave") {
                return this.info.filter((p) => {
                    return p.link?.check !== 0.3                })
            } else if (this.radio == "EP") {
                return this.info.filter((p) => {
                    // return p.catalog?.lowestPriceProductType!=="EP"})
                    // return p.dispNm.indexOf('유아')!=-1 || p.dispNm.indexOf('키즈')!=-1|| p.dispNm.indexOf('아동')!=-1|| p.dispNm.indexOf('여아')!=-1|| p.dispNm.indexOf('남아')!=-1|| p.dispNm.indexOf('주니어')!=-1
                    // || p.dispNm.indexOf('애견')!=-1|| p.dispNm.indexOf('강아지')!=-1
                    return this.금지어.find(item => p.dispNm.includes(item))
                })
            }
        },
        info2() {
            return this.info.filter(v => {
                return this.info1.every(p => p != v);
            });

        },
        kw1() {
            return this.kw1 = this.keyword.trim().split(/\s+/)[0];
        },
        kw2() {

            return this.kw2 = this.keyword.trim().split(/\s+/)[1];
        },

    },
    mounted() {
        setTimeout((() => {
            this.localStoragesavemount()
        }
        ), 100),
            setTimeout((() => {
                this.checklocalstorage()
            }
            ), 100),
            setTimeout((() => {
                this.test()
            }
            ), 100)
            var that = this
            // setTimeout((() => {
            //     that.radio="nosave"
            // }
            // ), 10000)
    },
    watch: {
        kw2: {
            handler: function () {
                this.kw2 ? (document.querySelector("#블랙리스트c2").click(),
                    this.localStoragesave(),
                    console.log("kw2 change", this.kw2)) : (document.querySelector("#블랙리스트c").click(),
                    this.localStoragesave())
            },
            deep: true
        },
        kw1: {
            handler: function (e, t) {
                this.kw1 && e !== t && console.log("kw1 change", this.kw1, e, t)
            },
            deep: true
        },
        localkwdlength: {
            handler: function () {
                this.localkwdlength && this.localStoragesave()
            }
        }
    }
})