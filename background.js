$('a[data-ft="{"tn":"P"}"]').each(function() {
  dumb_pages = ["Mensagens Espíritas - Anjos da Noite"];

  alert($(this).html());
  alert($.inArray($(this).html(), dumb_pages));
  if ($.inArray($(this).html(), dumb_pages) >= 0) {
    hidable = $(this).parents('li.uiUnifiedStory');
    // hidable.hide();
    hidable.css('background-color', '#ff0');
    alert("Escondi o " + $(this).html());
  }
});
