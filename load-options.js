function addRippleAttribs(ripplePage){
    if(ripplePage){
        document.getElementById("body").setAttribute("data-ripple", "");
        document.getElementById("page-outer").setAttribute("data-ripple", "");
        document.getElementById("page-middle").setAttribute("data-ripple", "");
    }
}

function addLinks(links){
    for(var i = 0; i < links.length; i++){
        if(links[i].enabled)
            $("#links-cont").append('<a data-ripple href="'+links[i].href+'">'+links[i].name+'</a>');
    }
}

function loadOptions(){
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
        addRippleAttribs(items.ripple);
        addLinks(items.links);
    });
}

loadOptions();

document.getElementById("settings-link").onclick = function(){
    chrome.runtime.openOptionsPage();
}
