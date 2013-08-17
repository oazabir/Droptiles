using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class ServerStuff : System.Web.UI.MasterPage
{
    protected bool IsAnonymous
    {
        get
        {
            return SecurityContextManager.IsAnonymous(Context);
        }
    }
    protected new UserProfile UserProfile
    {
        get
        {
            return SecurityContextManager.GetUserProfile(Context);
        }
    }
    protected void Page_Load(object sender, EventArgs e)
    {

    }
}
