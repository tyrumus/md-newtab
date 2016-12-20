$(document).ready(function(){
    $("#search").on("submit", function(e){
        window.location.href = "https://www.google.com/#q="+encodeURIComponent(document.getElementById("search-bar").value);
        return false;
    });
});
