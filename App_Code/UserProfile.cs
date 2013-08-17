using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for UserProfile
/// </summary>
public class UserProfile
{
	public UserProfile()
	{
		//
		// TODO: Add constructor logic here
		//
	}

    public string Firstname { get; set; }
    public string Lastname { get; set; }
    public string ProfileData { get; set; }
    public string Password { get; set; }
    public string Username { get; set; }

    public override string ToString()
    {
        return Username + Environment.NewLine[0]
            + Password + Environment.NewLine[0]
            + Firstname + Environment.NewLine[0]
            + Lastname + Environment.NewLine[0]
            + ProfileData;
    }

    public UserProfile FromString(string data)
    {
        string[] lines = data.Split(Environment.NewLine[0]);
        this.Username = lines[0];
        this.Password = lines[1];
        this.Firstname = lines[2];
        this.Lastname = lines[3];
        this.ProfileData = lines[4];

        return this;
    }
}