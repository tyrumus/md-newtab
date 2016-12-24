var mkcont = "#bkmk-cont";
var appendIDs = [];
appendIDs.push(mkcont);
function processBookmarks(bookmarks){
    for(var i = 0; i < bookmarks.length; i++) (function(i){
        console.log(bookmarks[i].id+" - "+bookmarks[i].title+": "+bookmarks[i].url);
        if(!bookmarks[i].url){ // folder
            if(bookmarks[i].id !== "0"){
                $(mkcont).append('<a id="'+bookmarks[i].id+'-bkmk" class="bkmk-entry" title="'+bookmarks[i].title+'" data-ripple href="#"><i class="material-icons">folder</i>&nbsp;'+bookmarks[i].title+'</a><div id="'+bookmarks[i].id+'-sub" class="bkmk-subcont">');
                $("#"+bookmarks[i].id+"-bkmk").click(function(){
                    $("#"+bookmarks[i].id+"-sub").slideToggle();
                    console.log("slide toggle: #"+bookmarks[i].id+"-bkmk");
                });
                if(bookmarks[i].children){
                    console.log("start folder contents");
                    appendIDs.push("#"+bookmarks[i].id+"-sub");
                    processBookmarks(bookmarks[i].children);
                }
                $(mkcont).append("</div>");
                appendIDs.pop();
                console.log("end folder contents");
            }
        }else{ // entry
            if(bookmarks[i].id !== "0")
                $(appendIDs[appendIDs.length-1]).append('<a class="bkmk-entry" title="'+bookmarks[i].title+'" data-ripple href="'+bookmarks[i].url+'"><i class="material-icons">star_border</i>&nbsp;'+bookmarks[i].title+'</a>');
        }
        //$(mkcont).append('<a class="bkmk-entry" data-ripple href="'+bookmarks[i].url+'">'+bookmarks[i].title+'</a>');
        if((bookmarks[i].id === "0") && (bookmarks[i].children)){
            console.log("isChildren");
            processBookmarks(bookmarks[i].children);
        }
    })(i);
}

function getBookmarks(){
    chrome.runtime.sendMessage({msg: "getBkmks"});
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.msg === "retBkmks"){
        processBookmarks(request.bookmarks);
    }
});

getBookmarks();

$(document).ready(function(){
    $("#dummy-bkmk").click(function(){
        $("#dummy-sub").slideToggle();
    });
});
