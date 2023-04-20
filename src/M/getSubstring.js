function getSubstring(a, b, c, d) {
    var e, f, g;
    return void 0 == a || null == a || "" == a ? "" : (e = a.indexOf(b), e >= 0 ? (f = a.indexOf(c, e + b.length), g = a.substring(e + b.length, f), d && (g = g.replace(/<[^<>]+>/g, "")), $.trim(g)) : "")
}
export {
    getSubstring,
}