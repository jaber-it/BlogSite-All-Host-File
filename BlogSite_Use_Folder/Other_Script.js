

// Set a timeout of 150 seconds (2.5 minutes) before reloading the page
setTimeout(function() {
    // Reload the page
    window.location.reload(1);
  
    // When the page finishes loading, restore the last saved scroll position
    document.addEventListener("DOMContentLoaded", function(event) {
      // Retrieve the last saved scroll position from local storage
      var scrollpos = localStorage.getItem('scrollpos');
      // If a scroll position was found, set the scroll position of the page
      if (scrollpos) {
        window.scrollTo(0, scrollpos);
      }
    });
  
    // Before the page is unloaded or refreshed, save the current scroll position to local storage
    window.onbeforeunload = function(e) {
      localStorage.setItem('scrollpos', window.scrollY);
    };
  }, 150000);
  

  