var get_hidden_pages = function() {
  var hidden_pages_string = localStorage["wc_hidden_pages"];
  var hidden_pages = [];

  if (hidden_pages_string && hidden_pages_string != undefined && hidden_pages_string != "undefined") {
    hidden_pages = JSON.parse(hidden_pages_string);
  }

  return hidden_pages;
}

var get_sanitized_link = function(link) {
  if (link.indexOf('?') > -1) {
    return link.substr(0, link.indexOf('?'));
  } else {
    return link;
  }
}

var add_hidden_page = function() {
  var hidden_pages = get_hidden_pages();
  var page_to_hide = $(this).attr('data-page');

  if ($.inArray(page_to_hide, hidden_pages) == -1) {
    hidden_pages.push(page_to_hide);
  }

  localStorage["wc_hidden_pages"] = JSON.stringify(hidden_pages);

  hide_page($(this));
}

var hide_page = function(el) {
  hidable = el.parents('li.uiUnifiedStory');
  hidable.css('background-color', '#ffa');
  //hidable.hide();
}

var hide_all_pages = function() {
  var hidden_pages = get_hidden_pages();

  var selector = 'ul#home_stream li.uiStreamStory div.storyContent div.storyInnerContent div.mainWrapper div h5.uiStreamHeadline a[data-ft="{"tn":"P"}"]:not(.wc_processed)';
  $(selector).each(function(){
    var wc_link_el = $('<a href="#" class="wc_hide_page" data-page="' + get_sanitized_link($(this).attr('href')) + '">WC?</a>');
    $(this).after(wc_link_el);
    $(this).addClass('wc_processed');
    $(wc_link_el).click(add_hidden_page);

    if (hidden_pages) {
      if ($.inArray(get_sanitized_link($(this).attr('href')), hidden_pages) >= 0) {
        hide_page($(this));
      }
    }
  });
}

$(document).ready(function() {
  hide_all_pages();
  //$('ul#home_stream').on('DOMSubtreeModified', hide_pages);
});
