const { response } = require('../app');
const adminHepler = require('../helpers/admin-hepler');
const product_helper = require('../helpers/product_helper');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceid = process.env.TWILIO_AUTH_Sid;
const client = require("twilio")(accountSid, authToken);
const Swal = require('sweetalert');

module.exports = {
    adminlogin: (req, res) => {
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.");
        res.render('admin/admin-login', { layout: 'admin-layout' })
    },
    adminreg: (req, res) => {
        console.log(('jjjjjjjjjjjjjjjjjj'));
        res.render('admin/admin-signup', { layout: 'admin-layout' })
    },
    admininfo: async (req, res) => {
        console.log(req.body)

        await adminHepler.adminReg(req.body)
        res.render("admin/admin-login", { layout: 'admin-layout' })

    },
    adminhomepage: async (req, res) => {
        adminHepler.adminLogin(req.body).then((response) => {
            console.log(response, "rrrrrrrr")
            if (response) {
                console.log('5555555555');
                req.session.loggedIn = true
                req.session.admin = response.admin
                res.render('admin/admin-homepage', { layout: 'admin-layout', admin: true })
            } else {
                req.session.loginerr = "Invalid Username or Password"
                res.redirect('/admin')
            }
        })
    },

    adminallusers: async (req, res) => {
        console.log("llllllllllllllllllllllllllllllllll");
        adminHepler.getallusers().then((allusers) => {
            res.render('admin/admin-usertable', { layout: 'admin-layout', allusers, admin: true })

        })
    },

    adminBlockUser: (req, res) => {
        let blockUserId = req.query.id
        adminHepler.blockUser(blockUserId)
        res.redirect('/admin/allusers')


    },

    adminUnBlockUser: (req, res) => {
        let unblockUserId = req.query.id
        adminHepler.unblockUser(unblockUserId)
        res.redirect('/admin/allusers')
    },
    adminallproducts: async (req, res) => {
        console.log("pppppppppp");
        adminHepler.getallproducts().then((allproducts) => {
            res.render('admin/admin-producttable', { layout: 'admin-layout', allproducts, admin: true })

        })
    },

    adminaddproductpage: (req, res) => {
        console.log(('ddddddddddddd'));
        res.render('admin/admin-addproduct', { layout: 'admin-layout', admin: true })
    },

    adminaddproduct: async (req, res) => {
        console.log(req.body)

        let image = []
        req.files.forEach(function (value, index) {
            image.push(value.filename)
        })
        req.body.image = image
        console.log(req.body.image, ">>>>>>>>>><<<<<<<<<<<<<<<<<");
        await adminHepler.addproduct(req.body)
        res.redirect('/admin/allproducts')

    },
    logout: (req, res) => {
        req.session.destroy()
        res.redirect('/admin')
    },
    admineditproduct: async (req, res) => {

        console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
        let usere = req.session.admin
        let product = await product_helper.getproductdetails(req.params.id)
        console.log("//////////////////////////////////////////////////////////////");
        res.render('admin/admin-editproduct', { layout: 'admin-layout', admin: true, product })
    },

    adminupdateproduct: (req, res) => {
        console.log('mmmmmmmmmmmmmmmmmmmm');


        let image = []
        req.files.forEach(function (value, index) {
            image.push(value.filename)
            console.log(value.filename, 'valueeeeeeeeeee');

        })
        req.body.image = image
        console.log("www>>>>>>>>>><<<<<<<<<<<<<<<<<");

        let proId = req.params.id
        let prodetails = req.body
        console.log(proId);
        console.log(prodetails);

        product_helper.productupdate(proId, prodetails).then(() => {
            res.render('admin/admin-homepage', { layout: 'admin-layout', admin: true })


        })
    },
    admindeleteproduct: async (req, res) => {
        let proId = req.params.id;

     
            product_helper.productdelete(proId).then((response)=>{
      
                res.redirect('/admin/allproducts')
          })


       
     

  
}
      
            

           
    
    
}

      
    






