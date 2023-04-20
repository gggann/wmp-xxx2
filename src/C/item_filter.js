function localStoragesavemount() {
    localforage.getItem(this.localkeyword).then(v => {
        if (v == undefined) {
            if (this.kw2 !== undefined) {
                this.localjson = {
                    'kw1': this.kw1,
                    'kw2': this.kw2
                }
            } else if (this.kw2 == undefined) {
                this.localjson = {
                    'kw1': this.kw1,
                    'length': this.localkwdlength
                }
            }
            localforage.setItem(this.localkeyword, this.localjson)
        } else {
            console.log(v)
        }
    })
}
function localStoragesave() {
    if (this.kw2 !== undefined) {
        this.localjson = {
            'kw1': this.kw1,
            'kw2': this.kw2
        }
    } else if (this.kw2 == undefined) {
        this.localjson = {
            'kw1': this.kw1,
            'length': this.localkwdlength
        }
    }
    localforage.setItem(this.localkeyword, this.localjson).then((() => {
         this.test()
    }))
}