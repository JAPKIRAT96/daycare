// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json",
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example),
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET",
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE",
    });
  },
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id,
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim(),
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);

var alertthing = $("<div>")
  .addClass("alert alert-danger")
  .attr("role", "alert")
  .text("child not found");
alertthing.alert("close");
// { {#if schedules } }
$("#childSearch").on("submit", function(e) {
  e.preventDefault();
  alertthing.alert("close");
  $(".child").each(function(index) {
    $(this).removeClass("mark");
  });
  var query = $("#searchquery")
    .val()
    .trim();
  console.log(query);
  var notFound = true;
  $(".child").each(function(index) {
    console.log($(this).attr("data-firstname"));
    if (
      query.toLowerCase().includes(
        $(this)
          .attr("data-firstname")
          .toLowerCase()
      )
    ) {
      $(this).addClass("mark");
      notFound = false;
    }
    if (
      query.toLowerCase().includes(
        $(this)
          .attr("data-lastname")
          .toLowerCase()
      )
    ) {
      $(this).addClass("mark");
      notFound = false;
    }
  });
  if (notFound) {
    $("#alertZone").append(alertthing);
    alertthing.alert();
  }
});
$("#clearsearch").on("click", function(e) {
  e.preventDefault();
  alertthing.alert("close");
  $(".child").each(function(index) {
    $(this).removeClass("mark");
  });
});
// { { /if}}
