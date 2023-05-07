var popupTrigger = document.getElementById('popup-trigger');
var popupContainer = document.getElementById('popup-container');

popupTrigger.addEventListener('click', function() {
  popupContainer.style.display = 'block';
});

popupContainer.addEventListener('click', function(event) {
  if (event.target === popupContainer) {
    popupContainer.style.display = 'none';
  }
});

