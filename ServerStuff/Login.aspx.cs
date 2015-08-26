using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Login : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void LoginButton_Click(object sender, EventArgs e)
    {
        var username = Request["username"];
        var password = Request["password"];
        var rememberMe = Convert.ToBoolean(Request["remember"] == "on");
        if (LoginProvider.Validate(Server.MapPath("~/App_Data"), username, password))
        {
            Response.Cookies.Add(FormsAuthentication.GetAuthCookie(username, rememberMe));
            Response.Redirect("Breakout.aspx");
        }
        else
        {
            MessagePanel.Visible = true;
            Message.Text = "Invalid username or password";
        }
    }
}