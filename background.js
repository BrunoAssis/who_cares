var hide_pages = function() {
  var hidden_pages_string = localStorage["wc_hidden_pages"];
  if (hidden_pages_string != undefined) {
    var hidden_pages = JSON.parse(localStorage["wc_hidden_pages"]);
  }

  $('a[data-ft="{"tn":"P"}"]').each(function() {
    var wc_link = ' <a href="#" class="wc_hide_page">WC?</a>';
    $(this).append(wc_link);

    if (hidden_pages != undefined) {
      if ($.inArray($(this).html(), hidden_pages) >= -1) {
        hidable = $(this).parents('li.uiUnifiedStory');
        //hidable.hide();
        hidable.css('background-color', '#ffa');
      }
    }
  });
}

$(document).ready(function() {
  hide_pages();
  //$('#pagelet_home_stream').on('DOMSubtreeModified', hide_pages);
});
