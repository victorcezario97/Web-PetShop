$(document).ready(function(){
 $('.header').height($(window).height());

})

function singlePage(page){
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", page, true);
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			document.getElementById("troca").innerHTML = xhttp.responseText;
		}
	}
	xhttp.send();
}