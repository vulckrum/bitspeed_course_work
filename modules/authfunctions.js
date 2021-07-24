const User = require('../models/user')

async function authChecked(cookie) {
    let userCookie = cookiePars(cookie)
    if (userCookie) {
        const auth = await User.find({ authHash: userCookie.authHash });
        return auth
    } else {
        return false
    }

}

function cookiePars(cookie) {
    if (cookie == undefined || cookie == null) {
        return false
    }
    let dataArry = cookie.split("; ");
    let obj = {}
    dataArry.map((e) => {
        let dataSplit = e.split("=")
        obj[dataSplit[0]] = dataSplit[1]
    })
    return obj
}
exports.authChecked = authChecked