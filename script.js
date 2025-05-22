    function toggleMenu() {
      const links = document.getElementById('navLinks');
      links.classList.toggle('show');
    }
    // Ouvrir le popup
function openPopup() {
  document.getElementById("popupForm").style.display = "flex";
}

// Fermer le popup
function closePopup() {
  document.getElementById("popupForm").style.display = "none";
}

// Ajouter un écouteur à tous les boutons "S'inscrire"
document.querySelectorAll("button").forEach(button => {
  if (button.textContent.includes("S'inscrire")) {
    button.addEventListener("click", function(e) {
      e.preventDefault();
      openPopup();
    });
  }
});
