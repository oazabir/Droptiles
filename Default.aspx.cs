using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class _Default : System.Web.UI.Page 
{
    protected void Page_Load(object sender, EventArgs e)
    {        
        if (User.Identity.IsAuthenticated)
            Response.Cookies.Add(new HttpCookie("p", UserProfile.CurrentUser.Tiles)
            {
                Expires = DateTime.Now.AddDays(30)                
            });
    }
}