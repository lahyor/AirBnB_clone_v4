$(document).ready(function () {
  $('input[type=checkbox]').click(function () {
    const myListName = [];
    const myId = [];
    $('input[type=checkbox]:checked').each(function () {
      myListName.push($(this).attr('data-name'));
      myId.push($(this).attr('data-id'));
    });
    if (myListName.length === 0) {
      $('.amenities h4').html('&nbsp;');
    } else {
      $('.amenities h4').text(myListName.join(', '));
    }
    console.log(myId);
  });

  // Add click event listener for the button
  $('button').click(function () {
    const checkedAmenities = [];
    $('input[type=checkbox]:checked').each(function () {
      checkedAmenities.push($(this).attr('data-id'));
    });

    // Make POST request to places_search with the list of checked amenities
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({ amenities: checkedAmenities }),
      success: function (places) {
        $('.places').empty(); // Clear existing places
        for (let i = 0; i < places.length; i++) {
          $('.places').append(`<article>
            <div class="title_box">
              <h2>${places[i].name}</h2>
              <div class="price_by_night">${places[i].price_by_night}</div>
            </div>
            <div class="information">
              <div class="max_guest">${places[i].max_guest} ${places[i].max_guest > 1 ? 'Guests' : 'Guest'}</div>
              <div class="number_rooms">${places[i].number_rooms} ${places[i].number_rooms > 1 ? 'Bedrooms' : 'Bedroom'}</div>
              <div class="number_bathrooms">${places[i].number_bathrooms} ${places[i].number_bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}</div>
            </div>
            <div class="user"></div>
            <div class="description">${places[i].description}</div>
          </article>`);
        }
      },
      error: function (xhr, status) {
        console.log('error ' + status);
      }
    });
  });

  // Initial AJAX requests
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'GET',
    dataType: 'json',
    success: function (json) {
      $('#api_status').addClass('available');
    },
    error: function (xhr, status) {
      console.log('error ' + status);
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    dataType: 'json',
    data: '{}',
    contentType: 'application/json; charset=utf-8',
    success: function (places) {
      for (let i = 0; i < places.length; i++) {
        $('.places').append(`<article>
          <div class="title_box">
            <h2>${places[i].name}</h2>
            <div class="price_by_night">${places[i].price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${places[i].max_guest} ${places[i].max_guest > 1 ? 'Guests' : 'Guest'}</div>
            <div class="number_rooms">${places[i].number_rooms} ${places[i].number_rooms > 1 ? 'Bedrooms' : 'Bedroom'}</div>
            <div class="number_bathrooms">${places[i].number_bathrooms} ${places[i].number_bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}</div>
          </div>
          <div class="user"></div>
          <div class="description">${places[i].description}</div>
        </article>`);
      }
    },
    error: function (xhr, status) {
      console.log('error ' + status);
    }
  });
});
