using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Profile;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Settings : System.Web.UI.Page
{
    protected UserProfile UserProfile
    {
        get
        {
            return SecurityContextManager.GetUserProfile(Context);
        }
    }

    protected void Page_Load(object sender, EventArgs e)
    {

    }

    protected void Save_Button_Click(object sender, EventArgs e)
    {
        var userStorePath = Server.MapPath("~/App_Code");

        var firstName = Request["firstname"];
        var lastname = Request["lastname"];
        var currentPassword = Request["current_password"];
        var newPassword = Request["new_password"];
        var confirmPassword = Request["confirm_password"];

        var userProfile = this.UserProfile;
        try
        {
            if (!string.IsNullOrEmpty(newPassword))
            {
                if (newPassword != confirmPassword)
                {
                    MessagePanel.Visible = true;
                    Message.Text = "Password and confirmation does not match.";
                    return;
                }

                if (!LoginProvider.Validate(userStorePath, userProfile.Username, currentPassword))
                {
                    MessagePanel.Visible = true;
                    Message.Text = "Invalid old password or new passwords are in invalid format.";
                    return;
                }
            }

            userProfile.Firstname = firstName;
            userProfile.Lastname = lastname;
            LoginProvider.UpdateProfile(userStorePath, userProfile);
            Response.Redirect("Breakout.aspx");
        }
        catch (Exception x)
        {
            MessagePanel.Visible = true;
            Message.Text = x.Message;
        }
    }
}