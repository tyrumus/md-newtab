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
	sendResponse({bookmarks: bookmarkList});
}
chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
	console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
	if(request.msg === "getBkmks"){
		console.log("sent response");
		chrome.bookmarks.getTree(function(bkmks){
			bookmarkList = bkmks;
			console.log("bookmarkList = "+bookmarkList);
			sendBack();
		});
		//sendResponse({bookmarks: bookmarkList, response: "pong"});
	}
});
/*getBookmarks();
chrome.bookmarks.onCreated.addListener(function(){
	printOutput("onCreated");
	getBookmarks();
});
chrome.bookmarks.onRemoved.addListener(function(){
	printOutput("onRemoved");
	getBookmarks();
});
chrome.bookmarks.onChanged.addListener(function(){
	printOutput("onChanged");
	getBookmarks();
});
chrome.bookmarks.onMoved.addListener(function(){
	printOutput("onMoved");
	getBookmarks();
});
chrome.bookmarks.onChildrenReordered.addListener(function(){
	printOutput("onChildrenReordered");
	getBookmarks();
});
chrome.bookmarks.onImportEnded.addListener(function(){
	printOutput("onImportEnded");
	getBookmarks();
});*/
