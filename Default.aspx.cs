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
        
    }


    private bool IsCombinedJSOlder(string path)
    {
        var jsPath = Context.Server.MapPath(path);
        string[] files = Directory.GetFiles(jsPath);

        var combinedFileLastWrite = File.GetLastWriteTime(Server.MapPath("~/js/Combined.js"));

        return Array.Exists(files, file => (File.GetLastWriteTime(file) - combinedFileLastWrite).TotalSeconds > 1);
    }

    protected string GetAlerts()
    {
        if (!Request.IsLocal)
        {
            if (IsCombinedJSOlder("~/js/") || IsCombinedJSOlder("~/Tiles/"))
            {
                return "$('#CombinedScriptAlert').show();";
            }
            else
            {
                return string.Empty;
            }
        }
        else
        {
            return string.Empty;
        }
        
    }
}