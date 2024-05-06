$(document).ready(function () {
  // Variable to store checked State or City IDs
  const checkedLocations = {};

  // Function to update h4 tag with checked States or Cities
  function updateLocations() {
    const locations = Object.keys(checkedLocations);
    if (locations.length === 0) {
      $('.locations h4').html('&nbsp;');
    } else {
      $('.locations h4').text(locations.join(', '));
    }
  }

  // Listen to changes on each input checkbox tag
  $('input[type=checkbox]').click(function () {
    const id = $(this).attr('data-id');
    const name = $(this).attr('data-name');

    // If checkbox is checked, store the State or City ID
    if ($(this).is(':checked')) {
      checkedLocations[id] = name;
    } else {
      // If checkbox is unchecked, remove the State or City ID
      delete checkedLocations[id];
    }

    // Update the h4 tag inside the div Locations
    updateLocations();
  });

  // Add click event listener for the button
  $('button').click(function () {
    const checkedAmenities = [];
    const checkedCities = Object.keys(checkedLocations); // Get checked Cities or States

    // Get checked Amenities
    $('input[type=checkbox]:checked').each(function () {
      checkedAmenities.push($(this).attr('data-id'));
    });

    // Make POST request to places_search with the list of checked Amenities, Cities, and States
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({ amenities: checkedAmenities, cities: checkedCities }),
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

  // Initial AJAX request to populate places
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
