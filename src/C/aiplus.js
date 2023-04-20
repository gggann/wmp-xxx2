import {
  Command_1,
  Commandid_1,
  Commandtext_1,
  Commandcnn_1,
} from '../M/copy.js'

import {
  getSubstring
} from '../M/getSubstring.js'
import {
  hotkey,
  show
} from '../M/hotkey.js'




export default Vue.component('aiplus', {
  props: ["message", "highlightData", "deallist", "deallist2",'대표키워드'],
  template: `
    <div id="광고">
    <hr />
    <div
      id="일반광고"
      :class="v.link.type + ' '+v.link.value"
      v-for="(v, i) in aiplus"
      :key="v.link.type"
    >
      <span class="index">{{
        v.tracker.adProductType + ":" + dealindexaiplus[i]
      }}</span>
      <a :href="dealurlaiplus[i]" target="_blank"
        ><img class="card-img-top" :src="v.largeImgUrl" alt="Card image cap"
      /></a>

      <div id="기본정보">
      <div>
      <select name="comment" style="font-size:12px;"class="combo-bx" v-model='CmsoptionValue'>
      <option value="카테고리오맵핑">카오</option>
      <option value="서치태그과등록">내과</option>
      <option value="브랜드과등록">브랜드과등록</option>
      <option value="딜네임과등록">딜과</option>
      <option value="검색어포함">검포</option>
      <option value="카테제외">카테제외</option>
      </select>
      <button style="font-size:10px;" @click='postman(v.link.value,v.dispNm)'>cms</button>
      </div>
        <span id="딜번호" @click="Commandid(v.link.value)">{{
          v.link.value
        }}</span>
        <span id="딜타입" @click="aaicate(v.link.value)">{{
          " " + v.link.type
        }}</span>
        <div
          id="딜이름가격"
          @click="Commandtext(CmsoptionValue_command(v))"
          @dblclick="Commandid(v.link.value+'\t'+v.dispNm),Commandcnn(v.link.value,v.dispNm)"
          v-html="highlightData(v.dispNm) + ' : ' + v.salePrice + ' 원'"
        ></div>
        <button v-if="v.link.type == 'DEAL'" @click="deallist(v)">
        💙
        </button>
        <button v-else @click="deallist2(v)">🤍</button>
        <div id="카테고리">
          <span
            @dblclick="Commandtext(v.categoryInfo.lcateCode)"
            @click="Commandtext(v.categoryInfo.lcateName),check_cate(v.categoryInfo.lcateCode)"
            >{{ v.categoryInfo.lcateName }}</span
          >
          >
          <span
            @dblclick="Commandtext(v.categoryInfo.mcateCode)"
            @click="Commandtext(v.categoryInfo.mcateName),check_cate(v.categoryInfo.mcateCode)"
            >{{ v.categoryInfo.mcateName }}</span
          >
          >
        </div>
      </div>
    </div>

    <div
      :id="check_targit(v)"
      :class="v.link.type + ' '+v.link.value"
      v-for="(v, i) in aitargit"
      :key="v.link.type"
    >
      <span class="index">{{
        v.tracker.adProductType + ":" + dealindexaitargit[i]
      }}</span>
      <a :href="dealurlaitargit[i]" target="_blank"
        ><img class="card-img-top" :src="v.largeImgUrl" alt="Card image cap"
      /></a>
      <div id="광고정보">

      <div>
      <select name="comment" style="font-size:12px;"class="combo-bx" v-model='CmsoptionValue'>
      <option value="카테고리오맵핑">카오</option>
      <option value="서치태그과등록">내과</option>
      <option value="브랜드과등록">브랜드과등록</option>
      <option value="딜네임과등록">딜과</option>
      <option value="검색어포함">검포</option>
      <option value="카테제외">카테제외</option>
      </select>
      <button style="font-size:10px;" @click='postman(v.link.value,v.dispNm)'>cms</button>
      </div>
      
        <span id="딜번호" @click="Commandid(v.link.value)">{{
          v.link.value
        }}</span>
        <span id="딜타입">{{ " " + v.link.type }}</span>
        <div
          id="딜이름가격"
          @click="Commandtext(CmsoptionValue_command(v))"
          @dblclick="Commandid(v.link.value+'\t'+v.dispNm),Commandcnn(v.link.value,v.dispNm)"
          v-html="highlightData(v.dispNm) + ' : ' + v.salePrice + ' 원'"
        ></div>
        <button v-if="v.link.type == 'DEAL'" @click="deallist(v)">
        💙
        </button>
        <button v-else @click="deallist2(v)">🤍</button>
        <div id="카테고리">
          <span
            @dblclick="Commandtext(v.categoryInfo.lcateCode)"
            @click="Commandtext(v.categoryInfo.lcateName),check_cate(v.categoryInfo.lcateCode)"
            >{{ v.categoryInfo.lcateName }}</span
          >
          >
          <span
            @dblclick="Commandtext(v.categoryInfo.mcateCode)"
            @click="Commandtext(v.categoryInfo.mcateName),check_cate(v.categoryInfo.mcateCode)""
            >{{ v.categoryInfo.mcateName }}</span
          >
          >
        </div>
      </div>
    </div>
  </div>
   `,
  data() {
    return {
      check_cate_count:0,
      aiplus: [],
      aitargit: [],
      areaid: this.message,
      dealurlaiplus: [],
      dealurlaitargit: [],
      dealindexaiplus: [],
      dealindexaitargit: [],
      checkif: true,
      aiplus: [],
      aitargit: [],
      CmsoptionValue: "서치태그과등록",
    }
  },
  created() {
    this.aicate()
  },
  computed: {
  },
  methods: {
    check_cate(cateid){
       this.check_cate_count++
       if(this.check_cate_count==4){
        this.check_cate_count=0
        let cateid_depth = cateid.toString().substr(0, 1);
        let aa = 'https://search.wemakeprice.com/search?search_cate=top&keyword='+encodeURIComponent(this.message)+'&isRec=1&_service=5&_type=3&perPage=90&page=1' + '&categoryDepth=' + cateid_depth + '&categoryId=' + cateid
        window.open(aa)
       }
    },
    CmsoptionValue_command(v) {
      if (this.CmsoptionValue == '카테고리오맵핑') return '카오'+'\t'+v.link.value+'\t'+v.dispNm
      else if (this.CmsoptionValue == '서치태그과등록') return '내과'+'\t'+v.link.value+'\t'+v.dispNm
      else if (this.CmsoptionValue == '브랜드과등록') return '내과브'+'\t'+v.link.value+'\t'+v.dispNm
      else if (this.CmsoptionValue == '딜네임과등록') return '딜과'+'\t'+v.link.value+'\t'+v.dispNm
      else if (this.CmsoptionValue == '검색어포함') return '검포'+'\t'+v.link.value+'\t'+v.dispNm
      else if (this.CmsoptionValue == '카테제외') return '검포'+'\t'+v.link.value+'\t'+v.dispNm+'\t'+'Cate제외'+'\t'+'O'+'\t'+'\t'+'\t'+'\t'+v.categoryInfo.lcateName
    },
    infomation(){
   //   return document.querySelector("#안상화광고")?'안상화'+'\t'+'\t':""
    },
    check_targit(v) {
      return v.tracker.adProductType == 'TARGET_CLICK' ? '타겟광고' : '일반광고'
    },
    async postman(id, dealname) {
      if (this.대표키워드 == '' || this.대표키워드 == undefined ) {
        this.대표키워드 = await axios.get('/keyword/check?keyword=' + this.message + '&sid=adplus').then((res) => {
          if (res.data.exists) {

            return (res.data.keywords)
          } else {
            return this.message.replace(/\s+/g, "");
          }
        }).catch(err => {
          console.log(err)
        })
      }

      let poststr = 'createdRows=[{"rep_keyword":"' + encodeURIComponent(this.대표키워드) + '","keywords":"","wst_cd":"WST000","type_cd":"NKT002","ban_keyword":' + id + ',"comment":"' + this.CmsoptionValue + '","use_yn":"Y","rowKey":1}]'

      if (this.대표키워드 !== '') {
        axios.post('/adplus2/ban/keyword/save',
          poststr,
        ).then(res => {
          document.getElementsByClassName(id)[0].style.backgroundColor = '#e77c7c'
          console.log(res)
          if (document.querySelector("#dealname").value == "") {
            document.querySelector("#dealname").value = id;
          } else {
            document.querySelector("#dealname").value = document.querySelector("#dealname").value + "\r\n" + id
          }
          //  put_IDB_cms(dealname)
        }).catch(err => {
          // retry_post
          console.log(err)
        })
      }
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
    Commandcnn(v, vv) {
      Commandcnn_1(v, vv)
    },
    async aicate() {
      // this.aiplus=[];    this.aitargit=[];    this.dealurlaiplus=[];    this.dealurlaitargit=[];  
      if (this.checkif) {
        this.checkif = false
        var that = this
        let urlmain = "https://search.wemakeprice.com/api/wmpsearch/api/v3.0/wmp-search/search.json?searchType=DEFAULT&search_cate=top&keyword="
        let urlpage = "&isRec=1&_service=2&_no=1"
        await axios
          .get(urlmain + encodeURIComponent(that.message) + urlpage)
          .then((res) => {
            if (res.data.data.adAiPlus) {
              that.aiplus = res.data.data.adAiPlus.data.deals.slice(0, 12);
              console.log(that.aiplus)
            }
            if (res.data.data.adTargetClick) {
              that.aitargit = res.data.data.adTargetClick.data.deals;
              console.log(that.aitargit)
            }
            for (let i = 0; i < that.aiplus.length; i++) {
              that.dealindexaiplus = [...that.dealindexaiplus, i + 1]
              if (that.aiplus[i].link.type == 'DEAL') {
                that.dealurlaiplus.push("https://front.wemakeprice.com/deal/" + that.aiplus[i].link.value)

              } else {
                that.dealurlaiplus.push("https://front.wemakeprice.com/product/" + that.aiplus[i].link.value)
              }
            }
            for (let i = 0; i < that.aitargit.length; i++) {
              that.dealindexaitargit = [...that.dealindexaitargit, i + 1]
              if (that.aitargit[i].link.type == 'DEAL') {
                that.dealurlaitargit.push("https://front.wemakeprice.com/deal/" + that.aitargit[i].link.value)

              } else {
                that.dealurlaitargit.push("https://front.wemakeprice.com/product/" + that.aitargit[i].link.value)
              }
            }
          })
          .catch(function (error) { // 请求失败处理
           // alert('广告获取失败，请刷新网页')
           setTimeout(() => {
            location.reload()
           }, 100000);

          });
      }
    },
    async aaicate(message) {
      var that = this;
      let urlmain =
        "?utf8=%E2%9C%93&m=&is_ad_on=true&isAdOn=true&adProductType=AI_PLUS&cate_boost=10&m_fn=default&constant_a=1&constant_b=1&keyword=ID%3A";
      let urlpage = "&limit=20&button=&sortOption=cpcFirst";
      await axios
        .get(urlmain + that.message + urlpage)
        .then((res) => {
          console.log(res.data);
        })
        .catch(function (error) {
          // 请求失败处理
          console.log(error);
        });
    },
  }

})