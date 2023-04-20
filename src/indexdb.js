function add_IDB_ids(a, b) {
    let store = db.transaction('ids', 'readwrite').objectStore('ids');
    let addReq = store.add({
        keyword: a,
        IDINFO: b
    });
    addReq.addEventListener('success', function (event) {
        console.log(event);
    });
}
function get_IDB_ids(a,b) {
    let store = db.transaction('ids', 'readwrite').objectStore('ids');
    let getReq = store.get(a.link.value);

    getReq.onsuccess = function (event) {
        
        if(event.target.result==undefined){
        
            put_IDB_ids(a.link.value,b)
        }else{
            if(event.target.result.IDINFO.indexOf(b)<0){
                b=event.target.result.IDINFO.concat(',').concat(b)
                put_IDB_ids(a.link.value,b)
            }else{
                a.link.check=0.3
                console.log('event1',a.link.check)
                // console.log(a.link.type.indexOf('old'),!(a.link.type.indexOf('old')))
                // if(!a.link.type.indexOf('old')){a.link.type = a.link.type + ' old'}
                
             //   console.log(a.link.check,event.target.result.IDINFO)
            }
        }
    }
    getReq.onerror = function(event) {
        console.log("Why didn't you allow my web app to use IndexedDB?!");
      };
};
function get_IDB_ids_ctlg(a,b) {
    let store = db.transaction('ids', 'readwrite').objectStore('ids');
    let getReq = store.get(Number(a.administrator.product.catalogNo));

    getReq.onsuccess = function (event) {
        if(event.target.result==undefined){
            put_IDB_ids(Number(a.administrator.product.catalogNo),b)
        }else{   
            if(event.target.result.IDINFO.indexOf(b)<0){
                b=event.target.result.IDINFO.concat(',').concat(b)
                put_IDB_ids(Number(a.administrator.product.catalogNo),b)
            }else{
               a.link.check=0.3
            //    console.log(a.link.type.indexOf('old'),!(a.link.type.indexOf('old')),!-1)
            //    if(!a.link.type.indexOf('old')){a.link.type = a.link.type + ' old'}
               // console.log(Number(a.administrator.product.catalogNo),event.target.result.IDINFO)
            }
        }
    }
    getReq.onerror = function(event) {
        console.log("Why didn't you allow my web app to use IndexedDB?!");
      };
};

function put_IDB_ids(a, b) {
    let store = db.transaction('ids', 'readwrite').objectStore('ids');
    let addReq = store.put({
        keyword: a,
        IDINFO: b
    });
    
    addReq.addEventListener('success', function (event) {
        //console.log(event);
    });
}
function get_IDB_cms(e){
        let t = db.transaction("token", "readwrite").objectStore("token").get(e.dispNm);
        t.onsuccess = function(t) {
            //console.log(t.target.result)
            if (t.target.result!==undefined){
               // console.log(t.target.result.keyword)
                (e.link.type == 'DEAL' || e.link.type == 'DEAL cms')? e.link.type = 'DEAL cms' : e.link.type ='PROD cms'
                e.link.check = 0.4
                return 
            } 
        }
        t.onerror = function(e) {
            console.log("Why didn't you allow my web app to use IndexedDB?!")
        }
}
function put_IDB_cms(e) {
    db.transaction("token", "readwrite").objectStore("token").put({
        keyword: e
    }).addEventListener("success", (function(e) {
        //console.log(e)
    }
    ))
}



export {
    add_IDB_ids,
    get_IDB_ids,
    put_IDB_ids,
    get_IDB_ids_ctlg,
    put_IDB_cms,
    get_IDB_cms,
}


// add() {
//     let aa = this.message.trim().replace(" ", "")
//     let bb = this.info.map((id) => id.link.value)
//     add_IDB_ids(aa, bb)
// },
// put() {
//     let aa = this.message.trim().replace(" ", "")
//     // let bb = this.info.map((id) => id.link.value)
//     let bb=[11,22]
//     put_IDB_ids(aa,bb)
// },


// function add_IDB_ids(a, b) {
//     let store = db.transaction('ids', 'readwrite').objectStore('ids');
//     let addReq = store.add({
//         keyword: a,
//         IDINFO: b
//     });
//     addReq.addEventListener('success', function (event) {
//         console.log(event);
//     });
// }
// function get_IDB_ids(a,b) {
//     let store = db.transaction('ids', 'readwrite').objectStore('ids');
//     let getReq = store.get(a);
//     // getReq.addEventListener('success', function(event){
//     //     console.log(event.target.result);
//     // });
//     console.log(getReq)

//     getReq.onsuccess = function (event) {
//         console.log(event.target.result);
//         // console.log(event.target.result.IDINFO)
//         // b = [event.target.result.IDINFO,...b]
//         // put_IDB_ids(a,b)
//     }
//     getReq.onerror = function(event) {
//         console.log("Why didn't you allow my web app to use IndexedDB?!");
//       };
// };

// checklocalstorage() {
//     for (v of this.info) {
//         if (window.localStorage.getItem(v.link.value) !== null) {
//             let check = JSON.parse(window.localStorage.getItem(v.link.value))
//             if (check.indexOf(this.token[0][0].token) !== -1) {
//                 v.link.check = 0.3

//             } else {
//                 v.link.check = 1
//             }
//         }
//     }
// },