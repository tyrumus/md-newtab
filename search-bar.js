$(document).ready(function(){
    $("#search").on("submit", function(e){
        chrome.storage.sync.get({
            ripple: false,
            links: [
                {name: "", href: "", enabled: false},
                {name: "", href: "", enabled: false},
                {name: "", href: "", enabled: false},
                {name: "", href: "", enabled: false}
            ],
            search: "goog"
        }, function(items){
            switch (items.search){
                case "goog": searchURL = "https://www.google.com/#q="; break;
                case "ddg": searchURL = "https://duckduckgo.com/?q="; break;
                case "yah": searchURL = "https://search.yahoo.com/search?p="; break;
                case "mb": searchURL = "https://www.bing.com/search?q="; break;
                default: searchURL = "https://www.google.com/#q=";
            }
            window.location.href = searchURL+encodeURIComponent(document.getElementById("search-bar").value);
        });
        return false;
    });
});
