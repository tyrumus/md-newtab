function saveOptions(){
    var doRipple = document.getElementById("ripples").checked;
    var linkList = [
        {name: document.getElementById("title-link1").value || "", href: document.getElementById("href-link1").value || "", enabled: document.getElementById("check-link1").checked},
        {name: document.getElementById("title-link2").value || "", href: document.getElementById("href-link2").value || "", enabled: document.getElementById("check-link2").checked},
        {name: document.getElementById("title-link3").value || "", href: document.getElementById("href-link3").value || "", enabled: document.getElementById("check-link3").checked},
        {name: document.getElementById("title-link4").value || "", href: document.getElementById("href-link4").value || "", enabled: document.getElementById("check-link4").checked}
    ];
    chrome.storage.sync.set({ripple: doRipple, links: linkList}, function(){
        document.getElementById("status").textContent = "Saved.";
        setTimeout(function(){
            document.getElementById("status").textContent = "";
        }, 1000);
    });
}
function restoreOptions(){
    chrome.storage.sync.get({
        ripple: true,
        links: [
            {name: "", href: "", enabled: false},
            {name: "", href: "", enabled: false},
            {name: "", href: "", enabled: false},
            {name: "", href: "", enabled: false}
        ]
    }, function(items){
        document.getElementById("ripples").checked = items.ripple;
        document.getElementById("title-link1").value = items.links[0].name;
        document.getElementById("href-link1").value = items.links[0].href;
        document.getElementById("check-link1").checked = items.links[0].enabled;
        document.getElementById("title-link2").value = items.links[1].name;
        document.getElementById("href-link2").value = items.links[1].href;
        document.getElementById("check-link2").checked = items.links[1].enabled;
        document.getElementById("title-link3").value = items.links[2].name;
        document.getElementById("href-link3").value = items.links[2].href;
        document.getElementById("check-link3").checked = items.links[2].enabled;
        document.getElementById("title-link4").value = items.links[3].name;
        document.getElementById("href-link4").value = items.links[3].href;
        document.getElementById("check-link4").checked = items.links[3].enabled;
    });
}
document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save-button").addEventListener("click", saveOptions);
