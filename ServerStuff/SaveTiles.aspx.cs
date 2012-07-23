using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class SaveTiles : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        var cookie = Request.Cookies["p"];
        var profile = UserProfile.CurrentUser;
        profile.Tiles = cookie.Value;
        profile.Save();
    }
}