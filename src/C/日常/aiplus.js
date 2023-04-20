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

import {
  getSubstring
} from '../M/getSubstring.js'
import {
  hotkey,
  show
} from '../M/hotkey.js'




export default Vue.component('aiplus', {
  props: ["message", "highlightData", "deallist", "deallist2"],
  template: `
    <div id="광고">
    <hr />
    <div
      id="일반광고"
      :class="v.link.type"
      v-for="(v, i) in aiplus"
      :key="v.link.type"
    >
      <span class="index">{{
        v.tracker.adProductType + ":" + dealindexaiplus[i]
      }}</span>
      <a :href="dealurlaiplus[i]" target="_blank"
        ><img class="card-img-top" :src="v.smallImgUrl" alt="Card image cap"
      /></a>

      <div id="정보">
        <span id="딜번호" @click="Commandid(v.link.value)">{{
          v.link.value
        }}</span>
        <span id="딜타입" @click="aaicate(v.link.value)">{{
          " " + v.link.type
        }}</span>
        <div
          id="딜이름가격"
          @click="Commandtext(v.link.value + '\t' + v.dispNm)"
          v-html="highlightData(v.dispNm) + ' : ' + v.salePrice + ' 원'"
        ></div>
        <button v-if="v.link.type == 'DEAL'" @click="deallist(v.link.value)">
          🐛
        </button>
        <button v-else @click="deallist2(v.link.value)">👄</button>
        <div id="카테고리">
          <span
            @dblclick="Commandtext(v.categoryInfo.lcateCode)"
            onclick="Command(this)"
            >{{ v.categoryInfo.lcateName }}</span
          >
          >
          <span
            @dblclick="Commandtext(v.categoryInfo.mcateCode)"
            onclick="Command(this)"
            >{{ v.categoryInfo.mcateName }}</span
          >
          >
        </div>
      </div>
    </div>

    <div
      id="타겟광고"
      :class="v.link.type"
      v-for="(v, i) in aitargit"
      :key="v.link.type"
    >
      <span class="index">{{
        v.tracker.adProductType + ":" + dealindexaitargit[i]
      }}</span>
      <a :href="dealurlaitargit[i]" target="_blank"
        ><img class="card-img-top" :src="v.smallImgUrl" alt="Card image cap"
      /></a>
      <div id="정보">
        <span id="딜번호" @click="Commandid(v.link.value)">{{
          v.link.value
        }}</span>
        <span id="딜타입">{{ " " + v.link.type }}</span>
        <div
          id="딜이름가격"
          @click="Commandtext(v.link.value + '\t' + v.dispNm)"
          v-html="highlightData(v.dispNm) + ' : ' + v.salePrice + ' 원'"
        ></div>
        <button v-if="v.link.type == 'DEAL'" @click="deallist(v.link.value)">
          🐛
        </button>
        <button v-else @click="deallist2(v.link.value)">👄</button>
        <div id="카테고리">
          <span
            @dblclick="Commandtext(v.categoryInfo.lcateCode)"
            onclick="Command(this)"
            >{{ v.categoryInfo.lcateName }}</span
          >
          >
          <span
            @dblclick="Commandtext(v.categoryInfo.mcateCode)"
            onclick="Command(this)"
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
      aiplus: [],
      aitargit: [],
      areaid: this.message,
      dealurlaiplus: [],
      dealurlaitargit: [],
      dealindexaiplus: [],
      dealindexaitargit: [],
      checkif: true,
      aiplus: [],
      aitargit: []
    }
  },
  created() {
    this.aicate()
  },
  methods: {
    Commandtext(v) {
      Commandtext_1(v)
    },
    Commandid(v) {
      Commandid_1(v)
    },
    Command(v) {
      Command_1(v)
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
            console.log(error);
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