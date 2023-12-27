const User = require("../models/user");

module.exports.renderSignupForm = (req, res) =>
{
    res.render("users/signup.ejs");
};

module.exports.renderLoginForm = (req, res) =>
{
    res.render("users/login.ejs");
};

module.exports.signup = async(req, res) =>
{
    try
    {
        let{username, email, password} = req.body;
        const newUser = new user({email, username});
        const registeredUser = await user.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) =>
        {
            if(err)
            {
                return next(err);
            }
            req.flash("success", "user registered successfully");
            res.redirect("/listings");
        });
    }
    
    catch(e)
    {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.login = async(req, res) =>
{
    req.flash("success", "Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) =>
{
    req.logOut((err) =>
    {
        if(err)
        {
            return next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    });
};