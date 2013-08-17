using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Profile;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Signup : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void Signup_Button_Click(object sender, EventArgs e)
    {
        var email = Request["username"];
        var firstName = Request["firstname"];
        var lastname = Request["lastname"];
        var password = Request["password"];
        var confirmPassword = Request["confirm_password"];
        var rememberMe = Request["remember"] == "on";

        if (string.IsNullOrEmpty(password) || password != confirmPassword)
        {
            MessagePanel.Visible = true;
            Message.Text = "Password and confirmation does not match.";
            return;
        }

        try
        {
            var cookie = Request.Cookies["p"];
            var userProfile = new UserProfile
            {
                Username = email,
                Firstname = firstName,
                Lastname = lastname,
                Password = password,
                ProfileData = cookie == null ? string.Empty : cookie.Value
            };
            LoginProvider.CreateProfile(Server.MapPath("~/App_Data"), userProfile);

            Response.Cookies.Add(FormsAuthentication.GetAuthCookie(email, rememberMe));
            Response.Redirect("Breakout.aspx");
        }
        catch (Exception x)
        {
            MessagePanel.Visible = true;
            Message.Text = x.Message;
        }
    }
}