using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class _Default : System.Web.UI.Page 
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!Profile.IsAnonymous)
            Response.Cookies.Add(new HttpCookie("p", Profile.Tiles)
            {
                Expires = DateTime.Now.AddDays(30)                
            });
    }

    protected string GetAlerts()
    {
        var jsPath = Server.MapPath("~/js");
        string[] files = Directory.GetFiles(jsPath);
        var combinedFileLastWrite = File.GetLastWriteTime(Server.MapPath("~/js/Combined.js"));

        if (Array.Exists(files, file => (File.GetLastWriteTime(file) - combinedFileLastWrite).TotalSeconds > 5))
        {
            return "$('#CombinedScriptAlert').show();";
        }
        else
        {
            return string.Empty;
        }
    }
}