var bookmarkList = null;
var sendResponse = null;
function printOutput(txt){
	console.log("event: "+txt);
}
function printBookmarks(bookmarks){
	bookmarkList = bookmarks;
	bookmarks.forEach(function(bookmark){
		console.log(bookmark.id+" - "+bookmark.title+": "+bookmark.url);
		if(bookmark.children)
			printBookmarks(bookmark.children);
	});
}
function getBookmarks(){
	chrome.bookmarks.getTree(function(bookmarks){
		printBookmarks(bookmarks);
	});
}
function sendBack(){
	console.log("sending response");
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, {msg: "retBkmks", bookmarks: bookmarkList}, function(r){
			console.log("sent response");
		});
	});
}
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
	console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
	if(request.msg === "getBkmks"){
		console.log("getting bookmarks");
		chrome.bookmarks.getTree(function(bkmks){
			bookmarkList = bkmks;
			console.log("bookmarkList = "+bookmarkList);
			sendBack();
		});
	}
});
