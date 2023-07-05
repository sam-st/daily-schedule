// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var now = dayjs();
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  var idKey;
  var timeBlock;
  var textBoxVal;
  $('.saveBtn').on('click', function () {
    idKey = $(this).closest(".time-block").attr("id"); //.attr was the missing link. I was stuck on this part for too long
    timeBlock = $(this).closest('.time-block');
    textBoxVal = timeBlock.find('textarea').val();

    localStorage.setItem(idKey, textBoxVal);
  });



  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  //for loop to traverse through all the time blocks.
  $('.time-block').each(function () {
    var elementId = $(this).attr('id');
    var number = elementId.split('-')[1];

    if (parseInt(number) < now.hour()) { //i was trying to do just number < now.hour() but that doesnt work so i found out about parseInt
      $(this).addClass('past')
      $(this).find('.description').val(localStorage.getItem(elementId));
      console.log(localStorage.getItem(elementId));
    } else if (parseInt(number) === now.hour()) {
      $(this).addClass('present')
      $(this).find('.description').val(localStorage.getItem(elementId));
      console.log(localStorage.getItem(elementId));
    } else {
      $(this).addClass('future')
      $(this).find('.description').val(localStorage.getItem(elementId));
      console.log(localStorage.getItem(elementId));
    }
  });

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // TODO: Add code to display the current date in the header of the page.
  pEl = $('#currentDay');
  pEl.text(now.format('dddd, MMMM D, YYYY'));

});