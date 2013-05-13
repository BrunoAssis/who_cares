var pages_to_hide = [];
var pagenames = [];

var hide_pages = function() {
  chrome.storage.sync.get(['wc_hidden_pages_links', 'wc_hidden_pages_names'], function(items){
    $('ul#home_stream').off('DOMSubtreeModified', hide_pages);

    if (items["wc_hidden_pages_links"]) {
      pages_to_hide = items["wc_hidden_pages_links"];
      pagenames = items["wc_hidden_pages_names"];
    }

    var selector = 'ul#home_stream li.uiStreamStory div.storyContent div.storyInnerContent div.mainWrapper div h5.uiStreamHeadline a[data-ft="{"tn":"P"}"]:not(.wc_processed)';
    $(selector).each(function(){
      var wc_link_el = $('<a href="#" class="wc_hide_page" data-page-name="' + $(this).html() + '" data-page-link="' + get_sanitized_link($(this).attr('href')) + '">WC?</a>');
      $(this).after(wc_link_el);
      $(this).addClass('wc_processed');

      wc_link_el.click(add_hidden_page);

      if (pages_to_hide) {
        if ($.inArray(get_sanitized_link($(this).attr('href')), pages_to_hide) >= 0) {
          hide_page($(this));
        }
      }
    });

    $('ul#home_stream').on('DOMSubtreeModified', hide_pages);
  });
}

var get_sanitized_link = function(link) {
  if (link.indexOf('?') > -1) {
    return link.substr(0, link.indexOf('?'));
  } else {
    return link;
  }
}

var add_hidden_page = function() {
  var page_to_hide = $(this).attr('data-page-link');
  var pagename     = $(this).attr('data-page-name');

  if ($.inArray(page_to_hide, pages_to_hide) == -1) {
    pages_to_hide.push(page_to_hide);
    pagenames.push(pagename);
  }

  chrome.storage.sync.set({
    'wc_hidden_pages_links': pages_to_hide,
    'wc_hidden_pages_names': pagenames
  });

  hide_page($(this));
}

var hide_page = function(el) {
  hidable = el.parents('li.uiUnifiedStory');
  hidable.hide();
}

$(document).ready(function() {
  hide_pages();
});
