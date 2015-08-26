using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class SaveTiles : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        var profileCookie = Request.Cookies["p"];
        var ticket = Request.Cookies["u"];
        if (ticket != null && profileCookie != null)
        {
            var username = FormsAuthentication.Decrypt(ticket.Value).Name;
            var profile = LoginProvider.GetUserProfile(Server.MapPath("~/App_Data"), username);
            profile.ProfileData = profileCookie.Value;
            LoginProvider.UpdateProfile(Server.MapPath("~/App_Data"), profile);
        }
    }
}