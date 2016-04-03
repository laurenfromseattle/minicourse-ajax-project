
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var street = $('#street').val();
    var city = $('#city').val();
    var address = street + ', ' + city;
    var apiKey = 'AIzaSyDgTpc54IsE0AIK5EHJbInToW3YeJvZLx0';
    var size = '600x400';
    var imageSrc = 'https://maps.googleapis.com/maps/api/streetview?' +
        'location=' + address +
        '&size=' + size +
        '&key=' + apiKey;

    $greeting.text('So you want to live at ' + street + ' in ' + city + '?');
    $body.append('<img class="bgimg" src="' + imageSrc + '" />');

    return false;
}

$('#form-container').submit(loadData);
