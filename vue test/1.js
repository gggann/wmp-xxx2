// function Commandtext(v) {
//     console.log(v)
//     let oInput = document.createElement('textarea');
//     oInput.innerHTML = v;
//     document.body.appendChild(oInput);
//     oInput.select();
//     document.execCommand("Copy");
//     oInput.style.display = 'none'
//     document.body.removeChild(oInput);
// }
// function outtest(){
//     console.log('out_test')
// }

import {Commandtext,outtest} from './2.js'


Vue.component('an', {
    props: [],
    template: `
    <div>
      <div @click="test()"> {{kw}} <div>
   </div>
   `,
    data() {
        return {
            kw:"compenent test",
        }
    },
    methods: {
        test(){
            Commandtext(this.kw)
        }
    },
})


const app = new Vue({
    el: '#app',
    data: {
        info:'1234'
    },
    methods: {
    },
})

