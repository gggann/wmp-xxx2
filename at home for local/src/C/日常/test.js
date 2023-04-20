import {
    Command_1,
    Commandid_1,
    Commandtext_1,
} from '../M/copy.js'
import axios from 'axios'
export default  Vue.component('test', {
    props: [],
    template: `
    <div>
     <button @click="test">ad plus</button>
   </div>
   `,
    data() {
        return {
            kw:"compenent test2",
            aa:'3333'
        }
    },
    created(){
     console.log(321)
     this.test()
    },
    methods: {
        async test(v){   //https://ad-search-admin.wonders.work
            let aiurl = '/?utf8=%E2%9C%93&m=&is_ad_on=true&isAdOn=true&adProductType=AI_PLUS&cate_boost=10&m_fn=default&constant_a=1&constant_b=1&tab=special&keyword=%EB%82%98%EC%9D%B4%ED%82%A4&limit=20&button=&sortOption=scoreFirst'
          axios.get('/?utf8=%E2%9C%93&m=&is_ad_on=true&isAdOn=true&adProductType=AI_PLUS&cate_boost=10&m_fn=default&constant_a=1&constant_b=1&tab=special&keyword=%EB%82%98%EC%9D%B4%ED%82%A4&limit=20&button=&sortOption=scoreFirst').then(res=>{
            console.log(res)
          })
        }
    },
})

