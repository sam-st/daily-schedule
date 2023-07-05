// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var now = dayjs();

  var idKey;
  var timeBlock;
  var textBoxVal;

  $('.saveBtn').on('click', function () {
    idKey = $(this).closest(".time-block").attr("id"); //https://api.jquery.com/attr/ this was a life saver
    timeBlock = $(this).closest('.time-block');
    textBoxVal = timeBlock.find('textarea').val();

    localStorage.setItem(idKey, textBoxVal);
  });

  //each-loop to traverse through all EACH time blocks.
  $('.time-block').each(function () {
    var elementId = $(this).attr('id');
    var hour = elementId.split('-')[1];

    if (parseInt(hour) < now.hour()) { //i was trying to do just number < now.hour() but that doesnt work so i had to use parseInt()
      $(this).addClass('past') //https://api.jquery.com/addClass/
      $(this).find('.description').val(localStorage.getItem(elementId)); //https://api.jquery.com/find/ another life saver. DOM traversal so much easier
    
    } else if (parseInt(hour) === now.hour()) {
      $(this).addClass('present')
      $(this).find('.description').val(localStorage.getItem(elementId));
    
    } else {
      $(this).addClass('future')
      $(this).find('.description').val(localStorage.getItem(elementId));    }
  });

  pEl = $('#currentDay');
  pEl.text(now.format('dddd, MMMM D, YYYY'));
});
