var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function displayMode1() {
  document.getElementById('Editar').style.display='block';
  document.getElementById('Remover').style.display='none';
  document.getElementById('menubtn').style.display='none';
  document.getElementById('menubtn1').style.display='none';
  document.getElementById('Edit').style.display='none';
}

function displayMode2() {
  document.getElementById('Editar').style.display='none';
  document.getElementById('Remover').style.display='block';
  document.getElementById('menubtn').style.display='block';
  document.getElementById('menubtn1').style.display='none';
  document.getElementById('Edit').style.display='none';
} 

function displayMode3() {
  document.getElementById('Edit').style.display='block';
  document.getElementById('Editar').style.display='none';
  document.getElementById('menubtn1').style.display='block';
}

function delete_animal() {
  
  for (let i = 0; i < 30; i++) {
    let animal = "Animal"+(i+1);
    if (document.getElementById(animal).checked) {
      let animalClass = "animal"+(i+1);
      document.getElementById(animalClass).style.display = 'none';
      document.getElementById("a"+(i+1)).style.display = 'none';
    }  
  }
}  