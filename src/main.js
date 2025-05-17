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

  }

// document.querySelectorAll("textarea").forEach(function(textarea) {
//  textarea.style.height = textarea.scrollHeight + "px";
//  textarea.style.overflowY = "hidden";

//  textarea.addEventListener("input", function() {
//    this.style.height = "auto";
//    this.style.height = this.scrollHeight + "px";
//  });
// });