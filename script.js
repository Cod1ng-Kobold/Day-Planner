$(init);

function init() {
  // This code grabs the current day and displays it on top of the site.
  $("#currentDay").text(moment().format("dddd, MMMM Do"));

  // Sets the color so it changes every time interval of one minute
  colorTimeBlocks();
  setInterval(colorTimeBlocks, 60000);

  // Updates time blocks
  $(".time-block").each(function() {
    var blockId = $(this).attr("id");
    // load saved data from local storage
    $("#" + blockId + " textarea").text(localStorage.getItem(moment().format("DDDYYYY") + blockId));
  });

  // Attaches the handler for save buttons. Activates on a click!
  $(".saveBtn").on("click", handleSave);
}

function colorTimeBlocks() {
  // for each time block
  $(".time-block").each(function() {
    var blockHour = parseInt($(this).attr("id").replace("hour-", ""));
    var currentHour = parseInt(moment().format("H"));
    // Removes past classes
    $(this).removeClass("past present future");
    // Past, Present, Futre colors. Uncle Scrooge's bane, LOL
    if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour > currentHour) {
      $(this).addClass("future");
    } else {
      $(this).addClass("present");
    }
  });
}

function handleSave(event) {
  // Grabs ID of parent
  var hourId = $(this).parent().attr("id");
  
  localStorage.setItem(moment().format("DDDYYYY") + hourId, $("#" + hourId + " textarea").val());
}