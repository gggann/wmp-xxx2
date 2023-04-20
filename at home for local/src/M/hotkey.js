var 토글 = 1
function hotkey() {
    var a = window.event.keyCode;
    console.log(a)
  if ((a == 35)) { //->

    } else if (a == 38) { //上
        document.querySelector("#디폴트").click()
        document.querySelector("#디폴트1").click()
        //  $("#ann").toggle()

    } else if (a == 37) { //<--
        // document.querySelector("#텍스트 > a").click()
        //document.querySelector("#keylength2").click()
        document.querySelector("#pricebutton").click()
        document.querySelector("#pricebutton1").click()
    } else if (a == 40) { //<--
        show();
    } else if (a == 39) { //<--
        document.querySelector("#btn_nosave1").click()
        document.querySelector("#btn_nosave2").click()
    } else if (a == 46) { //<--
        window.close()
        console.log('windowclose')
    } else if (a == 121) { //<--
 
    }
}
document.onkeydown = hotkey;


function show() {

    // $('#정보').toggleClass("mksavs")
    // $('#정보').toggle
    if (토글 == 1) {
        $('#정보').css('display', 'block');
        $("#카테상세").css("display", "block"),
        토글 = 0
    } else if (토글 == 0) {
        // $('#정보').hide()
        $('#정보').css('display', 'none');
        $("#카테상세").css("display", "none"),
        토글 = 1
    }
}


export {
    hotkey,
    show,
}

// $(document).on("dblclick", "#기본정보", function () {
//     t=$(this).find('#딜번호').text()
//     console.log(t)
//     tt=$(this).find('#딜이름가격').text()
//     console.log(tt)
//    Command(t+'\t'+tt);
//    return !1;
// });

// $(document).on("click", "#기본정보", function () {
//     t=$(this).find('#딜번호').text()
//     console.log(t)
//    Command(t);
//    return !1;
// });