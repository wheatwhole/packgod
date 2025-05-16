var snackbar,
    element = document.getElementById("snackbar");
  if (element != null) {
    snackbar = element
  } else {
    snackbar = null;
  }

var outputDiv,
    element2 = document.getElementById("output");
  if (element2 != null) {
    outputDiv = element2
  } else {
    outputDiv = null;
  }

function copy() {
 
  
    navigator.clipboard.writeText(outputDiv.innerHTML);

    var x = document.getElementById("snackbar")

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  }

// document.querySelectorAll("textarea").forEach(function(textarea) {
//  textarea.style.height = textarea.scrollHeight + "px";
//  textarea.style.overflowY = "hidden";

//  textarea.addEventListener("input", function() {
//    this.style.height = "auto";
//    this.style.height = this.scrollHeight + "px";
//  });
// });