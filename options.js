var pages_to_hide = [];
var pagenames = [];

var remove_hidden_page = function() {
  var page_to_hide = $(this).attr('data-page-link');
  var pagename     = $(this).attr('data-page-name');

  if ($.inArray(page_to_hide, pages_to_hide) > -1) {
    pages_to_hide = $.grep(pages_to_hide, function(value) {
      return value != page_to_hide;
    });

    pagenames = $.grep(pagenames, function(value) {
      return value != pagename;
    });
  }

  chrome.storage.sync.set({
    'wc_hidden_pages_links': pages_to_hide,
    'wc_hidden_pages_names': pagenames
  }, function() {
    load_page_list();
  });
}

var load_page_list = function() {
  $('#pageList').empty();
  chrome.storage.sync.get(['wc_hidden_pages_links', 'wc_hidden_pages_names'], function(items){
    if (items["wc_hidden_pages_links"]) {
      pages_to_hide = items["wc_hidden_pages_links"];
      pagenames = items["wc_hidden_pages_names"];
    }

    for (i=0; i < pages_to_hide.length; i++) {
      var list_item = $('<li></li>');
      list_item.append('<span>' + pagenames[i] + ' | </span>');

      var link_el = $('<a href="#" data-page-name="' + pagenames[i] + '" data-page-link="' + pages_to_hide[i] + '">Show again</a>');
      link_el.on('click', remove_hidden_page);

      list_item.append(link_el);

      $('#pageList').append(list_item);
    }
  });
}

$(document).ready(function(){
  load_page_list();
});
