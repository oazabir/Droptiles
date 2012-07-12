<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Settings.aspx.cs" Inherits="Settings" MasterPageFile="ServerStuff.master" %>

<asp:Content ContentPlaceHolderID="body" runat="server">
<!-- Copyright 2012 Omar AL Zabir -->
    <div id="body">
        <div class="container metro">
            <form class="metro-form" runat="server" id="LoginForm">
                
                <div class="metro-form-control" style="width: 300px">
                    <label>First name</label>
                    <div class="metro-text-box">
                        <input name="firstname" type="text" value="<%= Request["firstname"] ?? Profile.Firstname %>" />
                        <span class="helper"></span>
                    </div>
                </div>

                <div class="metro-form-control" style="width: 300px">
                    <label>Last name</label>
                    <div class="metro-text-box">
                        <input name="lastname" type="text" value="<%= Request["lastname"] ?? Profile.Lastname %>" />
                        <span class="helper"></span>
                    </div>
                </div>

                <div class="metro-form-control" style="width: 300px">
                    <label>Old Password</label>
                    <div class="metro-text-box">
                        <input name="current_password" type="password" value="" />
                        <span class="helper"></span>
                    </div>
                </div>

                <div class="metro-form-control" style="width: 300px">
                    <label>New Password</label>
                    <div class="metro-text-box">
                        <input name="new_password" type="password" value="" />
                        <span class="helper"></span>
                    </div>
                </div>

                <div class="metro-form-control" style="width: 300px">
                    <label>Confirm New Password</label>
                    <div class="metro-text-box">
                        <input name="confirm_password" type="password" value="" />
                        <span class="helper"></span>
                    </div>
                </div>

                <asp:Panel ID="MessagePanel" runat="server" Visible="false">
                    <span class="label label-important">Error</span>
                    <asp:Label ID="Message" runat="server" />
                </asp:Panel>
                    
                <asp:Button ID="Save_Button" OnClick="Save_Button_Click" runat="server" CssClass="metro-button" Text="Save" />
            
            </form>    
        </div>
        
    </div>
</asp:Content>