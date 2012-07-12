<%@ WebHandler Language="C#" Class="Logout" %>
// Copyright 2012 Omar AL Zabir
using System;
using System.Web;
using System.Collections.Generic;

public class Logout : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        List<string> cookiesToClear = new List<string>();
        foreach (string cookieName in context.Request.Cookies)
        {
            HttpCookie cookie = context.Request.Cookies[cookieName];
            cookiesToClear.Add(cookie.Name);
        }

        foreach (string name in cookiesToClear)
        {
            HttpCookie cookie = new HttpCookie(name, string.Empty);
            cookie.Expires = DateTime.Today.AddYears(-1);

            context.Response.Cookies.Set(cookie);
        }

        System.Web.Security.FormsAuthentication.SignOut();
        context.Response.Redirect("~/Breakout.aspx");
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}