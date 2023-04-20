// const a=new URL(window.location.href)
// const [b]=a.searchParams.keys();
// document.title=[b]

// const a=decodeURI(window.location.search)
// const b=a.replace("?","")
// console.log(b)
// import msg from '@/quanat.js'
// console.log(msg)

//import './shuiyin.js'
import './O/1.css'
const obj = decodeURI(window.location.search)
if (obj == "") {
    var b = undefined
} else {
    var b = obj.replace("?", "")
}

// import {
//     setHighLight,
//     replaceSpecialSymbol,
//     unReplaceSpatialSymbol,
// } from './M/highlight.js'
import {
    Command_1,
    Commandid_1,
    Commandtext_1,
    Commandcnn_1,
} from './M/copy.js'

// import { getSubstring } from './M/getSubstring.js'
import { hotkey, show } from './M/hotkey.js'

// import {
//     add_IDB_ids,
//     get_IDB_ids,
//     put_IDB_ids,
//     get_IDB_ids_ctlg,
// } from './indexdb.js'

import './C/test.js'
import './C/ann.js'
import './C/vnn.js'
import './C/cnn.js'
import './C/cnnb.js'
import './C/cnn_local'
import './C/aiplus.js'
import './C/aisp.js'
import './C/item.js'







/////////////////////////////////////////////////////////////////


// Vue.component('modal', {
//     template: '#modal-template'
//   })
Vue.component('modal', {
    props: ['modalhtml', 'modalimg', 'modalstorename'],
    template: `
    <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper"  @click.self="$emit('close')">
        <div class="modal-container">
        <button id="spaceclose" class="modal-default-button" @click="$emit('close')">
         Esc
      </button>

        

      <div>
      <slot name="body">
        <div id="modalinput">
          <span style="color:red">{{modalstorename}}</span>
          <input type="text"  v-model="modalkeyword">
          <button @click='modalkwdclick'>按钮</button>
          <div v-html="largeimg"></div>
        </div>
      
      <div v-if="modalstorename">
            <div v-for="(v,i) in modalhtml">
            <div v-if="(v.toLowerCase()).indexOf(modalkeyword.toLowerCase())>-1">
            <span v-html="modalimg[i]" @mouseover="changeimg(modalimg[i])" @click="go_item(modalimg[i])"></span>  <span v-html="v"></span>
            </div>
            </div>
      </div>

      <div v-else>
      <div v-html="modalhtml"></div>
      </div>
      </slot>
    </div>

          <div class="modal-footer">
            <slot name="footer">
            
         
            

            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>

    `,
    data() {
        return {
            // modalkeyword: document.querySelectorAll("#검색어")[0].value,
            modalkeyword: '',
            largeimg: ""
        }
    },
    methods: {
        go_item(v){
         let prodid = v.split('/')[6]
         window.open('https://front.wemakeprice.com/product/' + prodid)
        },
        modalkwdclick(){
            this.modalkeyword=''
        },
        changeimg(i) {
            console.log(i)
            this.largeimg = i.replace('thumbnail', 'large')
        },
        hotkeyup() {
            let This = this
            document.onkeydown = function (event) {
                console.log(event.key)
                // if (event.key == 'HanjaMode') {
                //     This.$emit('close')
                // }
                if (event.key == 'Escape') {
                    This.$emit('close')
                }
            }
        }
    },
    mounted() {
        console.log(this.modalstorename)
        this.hotkeyup()
    }
})

Vue.component('vodal', {
    props: ['modalhtml', 'modalimg', 'modalstorename'],
    template: `
    <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper"  @click.self="$emit('close')">
        <div class="modal-container">
        <button id="spaceclose" class="modal-default-button" @click="$emit('close')">
         Esc
      </button>

        

      <div>
      <slot name="body">
        <div id="modalinput">
          <span style="color:red">{{modalstorename}}</span>
          <input type="text"  v-model="modalkeyword">
          <button @click='modalkwdclick'>按钮</button>
          <div v-html="largeimg"></div>
        </div>
      
      <div v-if="modalstorename">
            <div v-for="(v,i) in modalhtml">
            <div v-if="(v.toLowerCase()).indexOf(modalkeyword.toLowerCase())>-1">
            <span v-html="modalimg[i]" @mouseover="changeimg(modalimg[i])"></span>  <span v-html="v"></span>
            </div>
            </div>
      </div>

      <div v-else>
      <div v-html="modalhtml"></div>
      </div>
      </slot>
    </div>

          <div class="modal-footer">
            <slot name="footer">
            
         
            

            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>

    `,
    data() {
        return {
            modalkeyword: '',
            largeimg: ""
        }
    },
    methods: {
        modalkwdclick(){
                this.modalkeyword=''
        },
        changeimg(i) {
            console.log(i)
            this.largeimg = i.replace('thumbnail', 'large')
        },
        hotkeyup() {
            let This = this
            document.onkeydown = function (event) {
                console.log(event.key)
                // if (event.key == 'HanjaMode') {
                //     This.$emit('close')
                // }
                if (event.key == 'Escape') {
                    This.$emit('close')
                }
            }
        }
    },
    mounted() {
        console.log(this.modalstorename)
       // this.hotkeyup()
    }
})

const app = new Vue({
    el: '#app',
    data: {
        com1: ['1', '2'],
        dealid: [],
        info: [],
        urla: b,
        urlb: [],
        // areaid:[],
        classid: "cateinfo",
        dealurl: "",
        cate통계: [],
        cate통계코드: [],
        checkradio: [],
        dealindex: [],
        alljson: [],
        showModal: false,
        deletecount: "",
        check_aiplus:'aiplus'
    },
    methods: {
        복사ID() {
            this.totaldelete()
            Commandtext_1(document.querySelector("#dealname").value);
            console.log(document.querySelector("#dealname").value.trim().split("\n"))
            document.querySelector("#dealname").value = "";
        },
        totaldelete() {
            this.deletecount = document.querySelector("#dealname").value.trim().split("\n").length
        },
        getalljson: function () {
            var that = this;
            axios.get("./O/all.json")
                .then(res => {
                    that.alljson = res.data.wmpPhysicalCategory
                })
                .catch(err => {
                    console.error(err);
                })
        },
        idlist: function () {
            this.urlb = (document.querySelector("#dealname").value.trim().split("\n"))
            document.querySelector("#dealname").value = ""
        },
        clear: function () {
            document.querySelector("#dealname").value = "";
            $('#총디브:eq(0)').remove() //删除第一个디브
            $('#총디브:eq(0)').remove()
            //app.areaid.shift()
        },
        clear2: function () {
            $('#총디브:eq(0)').remove() //删除第一个디브

        },
    },
    computed: {
        areaid: {
            get() {
                if (this.urla !== undefined) {
                    return [this.urla]
                } else {
                    return this.urlb
                }

            }
        },
    },
    mounted() {
        this.getalljson()
        document.querySelector("#오엑스").onclick=show
    },
})

Vue.config.productionTip = false