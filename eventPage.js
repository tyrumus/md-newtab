function printOutput(txt){
	console.log("event: "+txt);
}
function getBookmarks(){
	chrome.bookmarks.getTree(function(results){
		for (var i = 0; i < results.length; i++){
			console.log("
		}
	});
}
getBookmarks();
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
});
