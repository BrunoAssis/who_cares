// Save array

// var names = [];
// names[0] = prompt("New member name?");
// localStorage["names"] = JSON.stringify(names);

// Read array
//
// var storedNames = JSON.parse(localStorage["names"]);

function load_pages() {
  var hiddenPages = JSON.parse(localStorage["wc_hidden_pages"]);

}

document.addEventListener('DOMContentLoaded', restore_options);
document.querySelector('#save').addEventListener('click', save_options);
