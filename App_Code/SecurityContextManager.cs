using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Security;

/// <summary>
/// Summary description for CookieManager
/// </summary>
public static class SecurityContextManager
{
	public static UserProfile GetUserProfile(HttpContext context)
	{
        var profile = context.Items["Profile"] as UserProfile;
        if (profile == null)
        {
            var authCookie = context.Request.Cookies["u"];
            if (authCookie == null)
            {
                profile = new UserProfile
                {
                    Username = Guid.NewGuid().ToString()                   
                };
                context.Items["Profile"] = profile;
                return profile;
            }
            else
            {
                var userName = FormsAuthentication.Decrypt(authCookie.Value).Name;
                var userProfile = LoginProvider.GetUserProfile(context.Server.MapPath("~/App_Code"), userName);
                context.Items["Profile"] = userProfile;
                return userProfile;
            }
        }
        else
        {
            return context.Items["Profile"] as UserProfile;
        }
	}

    public static bool IsAnonymous(HttpContext context)
    {
        return context.Request.Cookies["u"] == null;
    }
}