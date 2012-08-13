<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Login.aspx.cs" Inherits="Login" MasterPageFile="ServerStuff.master" %>
<asp:Content ID="Content1" ContentPlaceHolderID="Header" runat="server">
    Login
</asp:Content>
<asp:Content ContentPlaceHolderID="body" runat="server">
<!-- Copyright: Omar AL Zabir, 2012 -->
    <div id="body">
        <div class="container metro">

            <p>
                Are you a new user and want to save your Dashboard?                
            </p>
            <p>
            <a href="Signup.aspx" class="metro-button">Yes, Sign me up.</a>
            </p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>No, I am an existing user. I want to login:</p>
            <form class="metro-form" runat="server" id="LoginForm">
                <div class="metro-form-control" style="width: 300px">
                    <label>Email</label>
                    <div class="metro-text-box">
                        <input name="username" type="text" autofocus value="<%= Request["username"] ?? "yourname@domain.com" %>" />
                        <span class="helper"></span>
                    </div>
                </div>

                <div class="metro-form-control" style="width: 300px">
                    <label>Password</label>
                    <div class="metro-text-box">
                        <input name="password" type="password" value="" />
                        <span class="helper"></span>
                    </div>
                </div>

                <label class="metro-check">
                    <input type="checkbox" name="remember" checked>
                    <span>Remember Me</span>
                </label>

                <asp:Panel ID="MessagePanel" runat="server" Visible="false">
                    <span class="label label-important">Error</span>
                    <asp:Label ID="Message" runat="server" />
                </asp:Panel>

                    
                <asp:Button ID="LoginButton" OnClick="LoginButton_Click" runat="server" CssClass="metro-button" Text="Login" />
            
            </form>    
        </div>
        
    </div>
</asp:Content>