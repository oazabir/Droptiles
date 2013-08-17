using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

/// <summary>
/// Offers file based login
/// </summary>
public static class LoginProvider
{
    public static bool Validate(string userStorePath, string username, string password)
    {
        var filePath = Path.Combine(userStorePath, username.ToLower());
        if (File.Exists(filePath))
        {
            var profile = new UserProfile();
            profile.FromString(File.ReadAllText(filePath));
            using (var md5 = MD5.Create())
                return VerifyMd5Hash(md5, password, profile.Password);
        }
        else
        {
            return false;
        }
    }

    public static UserProfile GetUserProfile(string userStorePath, string username)
    {
        var filePath = Path.Combine(userStorePath, username.ToLower());
        if (!File.Exists(filePath))
            throw new ApplicationException("User does not exist");
        return new UserProfile().FromString(File.ReadAllText(filePath));
    }

    public static void CreateProfile(string userStorePath, UserProfile profile)
    {
        var filePath = Path.Combine(userStorePath, profile.Username.ToLower());
        if (File.Exists(filePath))
            throw new ApplicationException("Username already exists");

        using (var writer = new StreamWriter(filePath))
        {
            using (var md5 = MD5.Create())
                profile.Password = GetMd5Hash(md5, profile.Password);

            writer.Write(profile.ToString());
        }
    }

    public static void RecreateProfile(string userStorePath, UserProfile profile)
    {
        var filePath = Path.Combine(userStorePath, profile.Username.ToLower());
        File.Delete(filePath);
        CreateProfile(userStorePath, profile);        
    }

    public static void UpdateProfile(string userStorePath, UserProfile profile)
    {
        var filePath = Path.Combine(userStorePath, profile.Username.ToLower());
        File.WriteAllText(filePath, profile.ToString());
    }

    static string GetMd5Hash(MD5 md5Hash, string input)
    {

        // Convert the input string to a byte array and compute the hash. 
        byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));

        // Create a new Stringbuilder to collect the bytes 
        // and create a string.
        StringBuilder sBuilder = new StringBuilder();

        // Loop through each byte of the hashed data  
        // and format each one as a hexadecimal string. 
        for (int i = 0; i < data.Length; i++)
        {
            sBuilder.Append(data[i].ToString("x2"));
        }

        // Return the hexadecimal string. 
        return sBuilder.ToString();
    }

    // Verify a hash against a string. 
    static bool VerifyMd5Hash(MD5 md5Hash, string input, string hash)
    {
        // Hash the input. 
        string hashOfInput = GetMd5Hash(md5Hash, input);

        // Create a StringComparer an compare the hashes.
        StringComparer comparer = StringComparer.OrdinalIgnoreCase;

        if (0 == comparer.Compare(hashOfInput, hash))
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}