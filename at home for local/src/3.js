import {Commandtext,outtest} from './2.js'
Vue.component('an', {
    props: [],
    template: `
    <div>
     <div>
      <div @click.self="test(kw)"> {{kw}} <div>
      <h1>.....<h1>
      <div @click.self="test2(kx)"> {{kx}} <div>
      </div>
   </div>
   `,
    data() {
        return {
            kw:"compent 1",
            kx:"compent 2"
        }
    },
    methods: {
        test(x){
            Commandtext(x)
        },
        test2(x){
            Commandtext(x)
        }
    },
})