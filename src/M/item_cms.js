const cms = {
    get_cms_cookie : async function () {
        this.check_cms_div = !this.check_cms_div
    }
}
function cmstest(){
    console.log('cmstest')
}

export {
    cms,
    cmstest,
}