<%@ WebHandler Language="C#" Class="RssTiles" %>

using System;
using System.Web;
using System.Xml.Linq;
using System.Collections.Generic;

public class RssTiles : IHttpHandler {
    const string TileJs = @"
window.TileBuilders = {
    double: function (uniqueId, name, data) {
            return {
                uniqueId: uniqueId,
                name: 'double',
                size: data.size || 'tile-double',
                appUrl: 'http://www.bbc.co.uk/news/world/',
                slides: ['<h2><a href=""' + data.url + '"">' + data.title + '</a></h2>' + (data.image.length > 0 ? '<img src=""' + data.image + '"" />' : '') + '<p class=""body"">' + data.body + '</p>']
            };
        }
};
";
    
    private static readonly string[] FeedUrls = {
        "http://feeds.bbci.co.uk/news/world/rss.xml",
        "http://news.yahoo.com/rss/"
    };
    public void ProcessRequest (HttpContext context) {
        XNamespace media = "http://search.yahoo.com/mrss/";
        var counter = 1;
        var sections = new List<string>();
        foreach (var feedUrl in FeedUrls)
        {
            var xml = XElement.Load(feedUrl);
            var feedTitle = xml.Element("channel").Element("title").Value;
                        
            var tiles = new List<string>();

            foreach (var item in System.Linq.Enumerable.Take(xml.Element("channel").Elements("item"), 6))
            {
                var mediaNode = item.Element(media + "thumbnail") ?? item.Element(media + "content");
                var descriptionNode = item.Element("description") ?? item.Element(media + "text");
                var description = HttpUtility.HtmlEncode(System.Text.RegularExpressions.Regex.Replace(descriptionNode.Value, @"</?[^>]*>", "").Replace("'", "\\'"));
                  
                tiles.Add(string.Format(@"{{ 
                    id: '{0}', 
                    name:'double', 
                    data: {{
                        title:'{1}', 
                        body:'{2}', 
                        image:'{3}', 
                        url: '{4}'
                    }}
                }}",
                  "tile" + counter++,
                  
                  HttpUtility.HtmlEncode(item.Element("title").Value.Replace("'", "\\'")),
                  description,
                  mediaNode != null ? mediaNode.Attribute("url").Value : "",
                  item.Element("link").Value
                  ));
            }
            
            sections.Add(string.Format(@"
                {{
                    title: '{0}',
                    tiles : [{1}]
                }}", 
                   feedTitle,
                   string.Join(",", tiles.ToArray())));
                    
        }

        context.Response.Write(TileJs);
        context.Response.Write(Environment.NewLine);
        context.Response.Write("window.RssTiles = [" + string.Join(",", sections.ToArray()) + "];");
        
        context.Response.ContentType = "text/javascript";
        context.Response.Write(TileJs);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}