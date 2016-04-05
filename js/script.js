function loadData() {

    var $body = $('body');
    var $wikiHeaderElem = $('#wikipedia-header');
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
    var streetViewAPIKey = 'AIzaSyDgTpc54IsE0AIK5EHJbInToW3YeJvZLx0';
    var size = '600x400';
    var imageSrc = 'https://maps.googleapis.com/maps/api/streetview?' +
        'location=' + address +
        '&size=' + size +
        '&key=' + streetViewAPIKey;

    $greeting.text('So you want to live at ' + street + ' in ' + city + '?');
    $body.append('<img class="bgimg" src="' + imageSrc + '" />');

    // NYTimes
    // http://developer.nytimes.com/member/my-account
    // API Key: 6172be9b1d286c3f95304575eaa8c475:12:59059780
    var nyTimesAPIKey = '6172be9b1d286c3f95304575eaa8c475:12:59059780';
    var searchQueryURL = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?' +
        'q=' + city +
        '&fl=web_url,headline,byline,pub_date,snippet' +
        '&sort=newest' +
        '&api-key=' + nyTimesAPIKey;
    var monthArray = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];

    $.getJSON(searchQueryURL,
        function ( data ) {
        	$nytHeaderElem.html('The New York Times Articles about ' + city);
            $.each(data.response.docs, function( index ) {
                this.pretty_date = new Date(this.pub_date);
                this.pub_day = this.pretty_date.getDate();
                this.pub_month = monthArray[this.pretty_date.getMonth()];
                this.pub_year = this.pretty_date.getFullYear();
                $nytElem.append('<li id="article-' + index + '"class="article"><p><a href="' + this.web_url + '" target="_blank">' +
                    this.headline.main + '</a><br />' + this.pub_month + ' ' +
                    this.pub_day + ', ' + this.pub_year + '</p><p>' + this.snippet + '</p></li>');
            });
        })
    .fail(function(e) {
    	$nytHeaderElem.html('Error: Could not load articles from The New York Times');
    });

    //Wikipedia
    var wikiQueryURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' +
    	city + '&format=json';

    var wikiRequestTimeout = setTimeout(function() {
    	$wikiElem.html('Error: Could Not Load Articles');
    }, 2000);


    $.ajax({
    	url: wikiQueryURL,
    	dataType: 'jsonp',
    	success: function( data ) {
  			var articleList = data[1];
  			for (var i = 0; i < articleList.length; i++) {
  				articleStr = articleList[i];
  				var url = 'http://en.wikipedia.org/wiki/' + articleStr;
  				$wikiElem.append('<li><a href="' + url + '" target="_blank">' + articleStr + '</a></li>');
  			}
  		clearTimeout(wikiRequestTimeout);
    	}
    });

    return false;
}

$('#form-container').submit(loadData);

