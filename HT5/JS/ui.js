// Обработка WEB-интерфейса
'use strict'

window.onload = function() {

    var elements = document.querySelectorAll('.open, .close');
    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener('click', togglePopup);
    }


    function togglePopup(event){
      var elements = event.target.parentElement.children;
      for (var i = 0; i < elements.length; i++) {
        elements[i].classList.toggle('hidden');
      }
    }
};




var Icons = {
  valid: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACjSURBVDhPYxgFwxA4z3fvcJ7nlgTlUgacFrh1OS9w/w/Ee+vr65mgwuQBmGFAer/PTB8uqDB5YOAMs99vzwJlYgUkGQZU2OI8321d6KpQNqgQCiDJMFAMAQ1bBtKAzVCSDIMBoCHMTgvcl6AbSpZhMAAy1HmB2yKYoUC6h2zDYADs0vnuC8CGUmoYDIBdOt99HlUMgwFQRNnPt+eAcocNYGAAANpVdEJ1MIvoAAAAAElFTkSuQmCC">',
  invalid: '<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACmSURBVDhP7dNNDoIwEIbhOYjiIRASVkYg3H+vMdwB6Fb7kZkotT9Mt/omLNoOT+gC+kfm2pzMcD7yMthyqQ+mLwte+sPA1FaPuavvMRQYZjCLD+Dt72TQPs8Qumdmk/sC1nykxyQfmo1JDjDyk4dJjAq0wtkY8oHY42NdsSurUQdbAVz1vVfddqM+jI9IjcYwSYV+/nqxQUGTvx4CmryKDWgS+4WIXmFO3sZEYTYaAAAAAElFTkSuQmCC">'
};


