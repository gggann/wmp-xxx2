window.onload = function () {
  setTimeout(() => {
    let r = localStorage.getItem('--img_width')
    document.querySelector("#이미지크기").value = parseInt(r)
    let f = localStorage.getItem('--font_width')
    document.querySelector("#글씨크기").value = parseInt(f)
  }, 1000);



  localStorage.getItem('--img_width')?document.body.style.setProperty('--img_width', localStorage.getItem('--img_width')):(document.body.style.setProperty('--img_width', '12em'),localStorage.setItem('--img_width','12em'))
  localStorage.getItem('--font_width')?document.body.style.setProperty('--font_width', localStorage.getItem('--font_width')):(document.body.style.setProperty('--font_width', '22px'),localStorage.setItem('--font_width','22px'))

  localStorage.getItem('추천')?document.querySelector("#추천").click():console.log('추천 is false')
  localStorage.getItem('추천b')?document.querySelector("#추천b").click():console.log('추천b is false')
  localStorage.getItem('특가')?document.querySelector("#특가").click():console.log('특가 is false')
  localStorage.getItem('가격')?document.querySelector("#가격").click():console.log('가격 is false')
  localStorage.getItem('추천로컬')?document.querySelector("#추천로컬").click():console.log('추천로컬 is false')
  localStorage.getItem('JPG')?(document.querySelector("#JPG").click(),document.body.style.setProperty('--detail', 'none')):console.log('JPG is false')
  document.querySelector("#추천").checked?document.body.style.setProperty('--textarea_detail', 'block'):1
  document.querySelector("#추천").addEventListener('click',function(){
    document.querySelector("#추천").checked?localStorage.setItem('추천','true'):localStorage.removeItem('추천')
  })
  document.querySelector("#추천b").checked?document.body.style.setProperty('--textarea_detail', 'block'):1
  document.querySelector("#추천b").addEventListener('click',function(){
    document.querySelector("#추천b").checked?localStorage.setItem('추천b','true'):localStorage.removeItem('추천b')
  })
  document.querySelector("#특가").addEventListener('click',function(){
    document.querySelector("#특가").checked?localStorage.setItem('특가','true'):localStorage.removeItem('특가')
  })
  document.querySelector("#가격").addEventListener('click',function(){
    document.querySelector("#가격").checked?localStorage.setItem('가격','true'):localStorage.removeItem('가격')
  })
  document.querySelector("#추천로컬").addEventListener('click',function(){
    document.querySelector("#추천로컬").checked?localStorage.setItem('추천로컬','true'):localStorage.removeItem('추천로컬')
  })
  document.querySelector("#JPG").addEventListener('click',function(){
    document.querySelector("#JPG").checked?localStorage.setItem('JPG','true'):localStorage.removeItem('JPG')
  })

    setTimeout(() => {
     // document.querySelector("#텍스트 > a").click() //最后一个商品
    }, 15000);    
  }
  const dbReq = indexedDB.open('wmpinfo', 1);
  // console.log(dbReq)
  let db;
  dbReq.addEventListener('success', function (event) {
    db = event.target.result;
  });

  dbReq.addEventListener('error', function (event) {
    const error = event.target.error;
    console.log('error', error.name);
  });
  dbReq.addEventListener('upgradeneeded', function (event) {
    db = event.target.result;
    let oldVersion = event.oldVersion;
    if (oldVersion < 1) {
      db.createObjectStore('ids', {
        keyPath: 'keyword',
        autoIncrement: true
      });
      db.createObjectStore('token', {
        keyPath: 'keyword',
        autoIncrement: true
      });
      db.createObjectStore('cms', {
        keyPath: 'keyword',
        autoIncrement: true
      });
    }
  });