<%@ Page Language="C#" AutoEventWireup="true" CodeFile="DynamicTile.aspx.cs" Inherits="Tiles_DynamicTile_DynamicTile" %>
<%@ OutputCache NoStore="true" Location="None" %>
<!-- Copyright 2012, Omar AL Zabir -->
<style>
#DynamicTable table {  border-collapse: collapse; }
#DynamicTable td, th { 
    text-align: center; 
    border: 1px solid #ddd; 
    padding:2px 5px; 
 }
    #DynamicTable {
        margin-bottom: 20px;
    }   
    
    
    
    #DynamicTable caption {margin: 0 0 .5em; font-weight: bold; font-size: 14pt; }
</style>

<div style="margin: 40px">

<table id="DynamicTable">
	<caption>2009 Employee Sales by Department</caption>
	<thead>
		<tr>
			<td></td>
			<th scope="col">food</th>
			<th scope="col">auto</th>
			<th scope="col">household</th>
			<th scope="col">furniture</th>
			<th scope="col">kitchen</th>
			<th scope="col">bath</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th scope="row">Mary</th>
			<td>190</td>
			<td>160</td>
			<td>40</td>
			<td>120</td>
			<td>30</td>
			<td>70</td>
		</tr>
		<tr>
			<th scope="row">Tom</th>
			<td>3</td>
			<td>40</td>
			<td>30</td>
			<td>45</td>
			<td>35</td>
			<td>49</td>
		</tr>
	</tbody>
</table>
<center>This data came from an ASPX page.</center>

    <form>
        <label>Search</label>
        <input name="search" class="metro-text-box" type="text"  />
        <br />
        <input class="metro-button" type="button" value="Search" onclick="alert('You can do all sorts of things inside a tile.')" />
    </form>
</div>