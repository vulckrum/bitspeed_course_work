const { Router } = require("express");
const crypto = require('crypto');
const User = require('../models/user');
const InternetServise = require("../models/internetService")
const Servise = require('../models/servise')
const Role = require('../models/role')
const Personal = require('../models/personal')
const Order = require('../models/order')

const { authChecked } = require('../modules/authfunctions')
const cookieParser = require('cookie-parser');
const personal = require("../models/personal");
const router = Router();
router.get('/', async(req, res) => {
    console.log(await authChecked(req.headers.cookie));
    res.render("index", {
        title: "Bit Speed",
        auth: await authChecked(req.headers.cookie)
    })
})

router.get('/login', async(req, res) => {
    let checkAuth = await authChecked(req.headers.cookie);
    if (checkAuth == false) {
        res.render("login", {
            title: "login",
            auth: await authChecked(req.headers.cookie)
        })
    } else {
        res.redirect("/")
    }

})
router.post("/login", async(req, res) => {
    const authStart = await User.find({
        login: req.body.login,
        password: req.body.password
    })
    if (authStart.length == 1) {
        let hashAuthRandom = crypto.randomBytes(20).toString('hex');
        res.cookie('authHash', hashAuthRandom);
        let user = await User.findById(authStart)
        user.authHash = hashAuthRandom;
        user.save()
        res.redirect('/')
    } else {
        res.redirect('/login')
    }

})

router.get("/register", async(req, res) => {
    let checkAuth = await authChecked(req.headers.cookie);
    let servises = await InternetServise.find({})
    if (checkAuth == false) {
        res.render("register", {
            title: "Bit Speed",
            auth: checkAuth,
            servises: servises
        })
    } else {
        res.redirect("/")
    }
})

router.post("/register", async(req, res) => {
    let checkLogin = await User.find({ login: req.body.login });
    console.log("checkLogin", checkLogin)
    if (checkLogin == false) {
        console.log({
            email: req.body.email,
            phone: req.body.phone,
            servise: req.body.servise,
            status: "Un active",
            name: req.body.name,
            login: req.body.login,
            password: req.body.password,
            authHash: "no authHash"
        })
        const newUser = new User({
            email: req.body.email,
            phone: req.body.phone,
            servise: req.body.servise,
            status: "Un active",
            name: req.body.name,
            login: req.body.login,
            password: req.body.password,
            authHash: "no authHash"
        })
        await newUser.save()
        res.redirect("/register")
    } else {
        res.redirect("/")
    }
})

router.get('/cabinet', async(req, res) => {
    res.render("cabinet", {
        title: "Cabinet",
        auth: await authChecked(req.headers.cookie)
    })
})
router.post("/cabinet", async(req, res) => {
    let userid = req.body.userid;
    let user = await User.findById(userid.replace(" ", ""))
    user.status = "active"
    await user.save();
    res.redirect("/cabinet")
})
router.get('/contact', async(req, res) => {
    res.render("contact", {
        title: "contact",
        auth: await authChecked(req.headers.cookie)
    })
})
router.get("/thenk", async(req, res) => {
    res.render("thenk", {
        title: 'thenk',
        auth: await authChecked(req.headers.cookie)
    })
})
router.get('/servise', async(req, res) => {
    let servise = await Servise.find({})
    res.render('servise', {
        title: 'servise',
        auth: await authChecked(req.headers.cookie),
        servise
    })
})
router.post('/servise', async(req, res) => {

    let authuser = await authChecked(req.headers.cookie)
    for (test in authuser) {
        var her = authuser[test];
        console.log(her.id.toString() + " +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")

    }
    // let test = JSON.parse(authuser)
    console.log(authuser + "************************************************")
    let pers = await Personal.find({})
    let array = []
    let rand = Math.floor(Math.random() * pers.length - 1)
    array.push(pers[rand])
    rand = Math.floor(Math.random() * pers.length - 1)
    array.push(pers[rand])
    let order = new Order({
        servise: req.body.servises,
        user: authuser[0].id.toString(),
        addres: req.body.addres,
        mess: req.body.mess,
        perfomer: array
    })
    await order.save()
    res.redirect('/thenk')
})




////////////////////////////////admin//////////////////////////////////
router.get('/admin', async(req, res) => {
    res.render("admin/admin.ejs", {
        title: "admin",
        auth: await authChecked(req.headers.cookie)
    })
})

router.get('/admin/servise', async(req, res) => {
    res.render("admin/servise", {
        title: "admin",
        auth: await authChecked(req.headers.cookie),
        servises: await Servise.find({})
    })
})

router.post("/admin/servise", async(req, res) => {
    const sevise = new Servise({
        name: req.body.name,
        price: req.body.price
    })
    await sevise.save()
    res.redirect("/admin/servise")
})

router.get("/admin/user", async(req, res) => {
    res.render("admin/users", {
        title: "All User",
        auth: await authChecked(req.headers.cookie),
        users: await User.find({})
    })
})
router.get("/admin/internetServise", async(req, res) => {
    const servises = await InternetServise.find({})
    res.render("admin/internetServise.ejs", {
        title: "internetServise",
        auth: await authChecked(req.headers.cookie),
        servises: servises
    })
})
router.post("/admin/internetServise", async(req, res) => {
    const tarif = new InternetServise({
        name: req.body.name,
        price: req.body.price,
        limited: req.body.limited,
        time: req.body.time
    })
    await tarif.save()
    res.redirect("/admin/internetServise")
})
router.get("/admin/role", async(req, res) => {
    res.render("admin/role", {
        title: "personal Role",
        auth: await authChecked(req.headers.cookie),
        role: await Role.find({})
    })
})
router.post("/admin/role", async(req, res) => {
    try {
        const role = new Role({
            name: req.body.name,
            prioriti: req.body.prioriti
        })
        await role.save()
    } catch (err) {
        console.log(err)
    }

    res.redirect("/admin/role")
})

router.get('/admin/personal', async(req, res) => {
    res.render("admin/personal", {
        title: "Personal",
        auth: await authChecked(req.headers.cookie),
        role: await Role.find({}),
        personal: await Personal.find({})
    })
})
router.post('/admin/personal', async(req, res) => {
    console.log(req.body)
    let newCadr = new Personal({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        role: req.body.role,
        salary: req.body.salary
    })
    newCadr.save()
    res.redirect('/admin/personal')
})
router.get('/admin/order', async(req, res) => {
    var order = await Order.find({})
    for (var i = 0; i < order.length; i++) {
        let temp = [];
        for (var j = 0; j < order[i].servise.length; j++) {
            let r = await Servise.findById(order[i].servise[j].replace(" ", ""))
            temp.push(r.name)
        }
        order[i].servise = temp
        let tempUser = await User.findById(order[i].user)
        order[i].user = tempUser.phone + ":" + tempUser.name

    }
    res.render("admin/orders", {
        title: "Orders",
        auth: await authChecked(req.headers.cookie),
        order
    })
})

///////////////////////////////end Admin ///////////////////////////////

module.exports = router