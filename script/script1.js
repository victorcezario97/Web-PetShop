/* When the user clicks on the button, 
toggle between hiding and showing the dropdown1 content */
function myFunction() {
    document.getElementById("myDropdown1").classList.toggle("show");
}

// Close the dropdown1 if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn1')) {

    var dropdown1s = document.getElementsByClassName("dropdown1-content");
    var i;
    for (i = 0; i < dropdown1s.length; i++) {
      var openDropdown1 = dropdown1s[i];
      if (openDropdown1.classList.contains('show')) {
        openDropdown1.classList.remove('show');
      }
    }
  }
}