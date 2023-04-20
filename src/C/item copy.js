// import {
//     setHighLight,
//     Map,
//     replaceSpecialSymbol,
// } from '../../M/highlight.js'
// import {
//     Command_1,
//     Commandid_1,
//     Commandtext_1,
//     Commandcnn_1,
// } from '../../M/copy.js'
// import {
//     getSubstring
// } from '../../M/getSubstring.js'
// import {
//     hotkey,
//     show
// } from '../../M/hotkey.js'
// import {
//     add_IDB_ids,
//     get_IDB_ids,
//     put_IDB_ids,
//     get_IDB_ids_ctlg,
//     put_IDB_cms,
//     get_IDB_cms,
// } from '../../indexdb.js'
import axios from 'axios'

export default Vue.component('item', {
    props: ['message', 'checkboxmessage', 'alljson','v'],
    template: `

    <div id="dealtype" :class="v.link.type + ' ' + v.link.value + ' 삭제예정id'" v-for="(v,i) in info1" :key="v.link.value">

    <span class="index" @click="out_info1(v)">{{dealindex[i]}}</span> <span id="브랜드"
        v-html="highlightData(v.administrator.product.brandKeyword)"></span>
    <a v-if="v.largeImgUrl" :href="checkimgsrc(v)" target="_blank"><img class="card-img-top" :src=v.largeImgUrl
            alt="Card image cap" :style="'opacity:'+v.link.check"></a>
    <a v-else :href="checkimgsrc(v)" target="_blank"><img class="card-img-top" :src=v.mediumImgUrl
           alt="Card image cap" :style="'opacity:'+v.link.check"></a>                           



    <div id="lastdeal" v-if="i==info1.length-1"></div>
    <div id="정보">
        <div id="기본정보">

            <select name="comment" style="font-size:12px;" class="combo-bx" v-model='CmsoptionValue'>
                <option value="카테고리오맵핑">카오</option>
                <option value="서치태그과등록">내과</option>
                <option value="브랜드과등록">브랜드과등록</option>
                <option value="딜네임과등록">딜과</option>
                <option value="검색어포함">검포</option>
                <option value="직접입력">직접입력</option>
            </select>
            <span v-if="v.administrator.product.catalogNo">
            <button style="font-size:10px;color:red;"
            @click='postmanctlg(v)'>제외</button>
            </span>
            <span v-else>
                <button style="font-size:10px;" @click='postman(v.link.value,v.dispNm)'>제외</button>
            </span>
            <span id="딜번호" @click="Commandid(v.link.value)">{{v.link.value}}</span>
            <span id="딜타입">{{check_deal_type(v)}}</span>
            <span id="카탈로그번호" v-if="v.administrator.product.catalogNo"
                @click="Commandid(v.administrator.product.catalogNo)">{{" "+v.administrator.product.catalogNo}}</span>
            <div>
                <div id="딜이름가격"
                     style="color:rgb(120, 120, 120)"
                    @click="Commandtext(CmsoptionValue_command+'\t'+v.link.value+'\t'+v.dispNm)"
                    @dblclick="Commandid(v.link.value+'\t'+v.dispNm),Commandcnn(v.link.value,v.dispNm)"
                    v-html="highlightData(v.dispNm)+' : '+v.salePrice+' 원'"></div>

            </div>
            <button class='btn btn-default btn-xs' v-if="v.link.type=='DEAL' || v.link.type=='DEAL cms'"
                @click='deallist(v)'>💙</button>
            <button class='btn btn-default btn-xs' v-else @click='deallist2(v)'>🤍</button>
            <div id="상세정보">

                <div id="카테고리" v-if="v.administrator.product.physicsCategoryIds">
                    <span @dblclick="Commandtext(v.administrator.product.physicsCategoryIds.lcateCd)"
                        @click="Command(event.target),check_cate(v.administrator.product.physicsCategoryIds.lcateCd)">{{v.administrator.product.physicsCategoryIds.lcateNm}}</span>
                    >
                    <span @dblclick="Commandtext(v.administrator.product.physicsCategoryIds.mcateCd)"
                        @click="Command(event.target),check_cate(v.administrator.product.physicsCategoryIds.mcateCd)">{{v.administrator.product.physicsCategoryIds.mcateNm}}</span>
                    >
                    <span @dblclick="Commandtext(v.administrator.product.physicsCategoryIds.scateCd)"
                        @click="Command(event.target),check_cate(v.administrator.product.physicsCategoryIds.scateCd)">{{v.administrator.product.physicsCategoryIds.scateNm}}</span>
                    >
                    <span @dblclick="Commandtext(v.administrator.product.physicsCategoryIds.dcateCd)"
                        @click="Command(event.target),check_cate(v.administrator.product.physicsCategoryIds.dcateCd)">{{v.administrator.product.physicsCategoryIds.dcateNm}}</span>
                    <span style="color:rgb(90, 36, 36);font-size:15px"
                        v-html="highlightData(v.administrator.product.catalogCategoryKeyword)"></span>
                </div>
                <div id="내부키워드" v-html="highlightData(v.administrator.product.innerKeyword)"></div>
                <div id="딜내부키워드" v-html="highlightData(v.administrator.product.dealInnerKeyword)"></div>
                <div id="파트너정보"
                    @dblclick='Commandtext("seller:"+v.administrator.product.partnerId+"&"+message)'>
                    {{v.administrator.product.partnerName}}{{" seller:"+v.administrator.product.partnerId}}
                </div>
            </div>
        </div>
    </div>
</div>
    
    
    `,
    data(){
       return{
        v:this.v
       }
    },
})