<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Signup.aspx.cs" Inherits="Signup" MasterPageFile="~/Droptiles.master" %>
<asp:Content ContentPlaceHolderID="body" runat="server">
    <!-- Copyright 2012 Omar AL Zabir -->
    <div id="body">
        <div class="metro appnavbar">
            <ul>
                <li>
                    <a class="backbutton" href="Breakout.aspx" data-bind="click: closeApp">
                        <img src="img\Metro-Back-48.png" />
                    </a>
                </li>
                <li>
                    <h1 class="start">Signup</h1>
                </li>
             </ul>
        </div>

        <div class="appnavbar_space"></div>

        <div class="container metro">
            <form class="metro-form" runat="server" id="LoginForm">
                <div class="metro-form-control" style="width: 300px">
                    <label>Email</label>
                    <div class="metro-text-box">
                        <input name="username" type="text" autofocus value="<%= Request["username"] ?? "yourname@domain.com" %>" />
                        <span class="helper"></span>
                    </div>
                </div>

                <div class="metro-form-control" style="width: 300px">
                    <label>First name</label>
                    <div class="metro-text-box">
                        <input name="firstname" type="text" value="<%= Request["firstname"] ?? "" %>" />
                        <span class="helper"></span>
                    </div>
                </div>

                <div class="metro-form-control" style="width: 300px">
                    <label>Last name</label>
                    <div class="metro-text-box">
                        <input name="lastname" type="text" value="<%= Request["lastname"] ?? "" %>" />
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

                <div class="metro-form-control" style="width: 300px">
                    <label>Confirm Password</label>
                    <div class="metro-text-box">
                        <input name="confirm_password" type="password" value="" />
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
                    
                <asp:Button ID="Signup_Button" OnClick="Signup_Button_Click" runat="server" CssClass="metro-button" Text="Signup" />
            
            </form>    
        </div>
        
    </div>
</asp:Content>