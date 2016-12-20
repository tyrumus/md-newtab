function processBookmarks(bookmarks){
    bookmarks.forEach(function(bookmark){
        console.log(bookmark.id+" - "+bookmark.title+": "+bookmark.url);
        if(bookmark.children)
            processBookmarks(bookmark.children);
    });
}

function getBookmarks(){
    chrome.runtime.sendMessage({msg: "getBkmks"}, function(response){
        //processBookmarks(response.bookmarks);
        console.log(response.bookmarks);
        console.log(response.response);
    });
}

getBookmarks();
