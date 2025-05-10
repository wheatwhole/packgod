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

    // copied toast notification here
    snackbar.className = "show";
  }

