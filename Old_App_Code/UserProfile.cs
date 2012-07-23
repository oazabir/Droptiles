// Copyright 2012 Omar AL Zabir
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Profile;
using System.Web.Security;


/// <summary>
/// Summary description for UserProfile
/// </summary>
public class UserProfile : ProfileBase
{
    static public UserProfile CurrentUser
    {
        get
        {
            return (UserProfile)
                    (ProfileBase.Create(Membership.GetUser().UserName));
        }
    }

    public string Firstname
    {
        get { return ((string)(base["Firstname"])); }
        set { base["Firstname"] = value; Save(); }
    }

    public string Lastname    
    {
        get { return ((string)(base["Lastname"])); }
        set { base["Lastname"] = value; Save(); }
    }

    public string Tiles
    {
        get { return ((string)(base["Tiles"])); }
        set { base["Tiles"] = value; Save(); }
    }
     
}