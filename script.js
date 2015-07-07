$(function() {

	// $("#no-image-panel").hide();

	var trackTemplate = _.template($("#track-template").html())
	var $results = $("#results");

	var $spotifySearch = $("#spotify-search");
	var $track = $("#track");
	var searchResults;

	var Track = function(title, artist, album) {
		this.title = title;
		this.artist = artist;
		this.album = album;
		this.albumCover = "";
	}

	$spotifySearch.on("submit", function(event) {
		event.preventDefault();

		$results.empty();
		var searchTrack = $track.val();
		$track.val("");
		console.log("gonna go grab *" + searchTrack + "*");

		$.get(
		  'https://api.spotify.com/v1/search?type=track&q=' + searchTrack,

		  function(data) {

		    // console.log(data.tracks.items);
		    searchResults = data.tracks.items;

		    // console.log(searchResults[0].artists[0].name);
		    console.log(searchResults);
		    // console.log(searchResults[0].name)

			var trackTaco = new Track("test", "test", "test");

			if (searchResults === []){

			    for (i = 0; i < 5; i++) {

			    	var trackTitle = searchResults[i].name
			    	console.log(trackTitle);

			    	trackTaco.title = trackTitle;

			    	var trackAlbum = searchResults[i].album.name
			    	console.log(trackAlbum);

			    	trackTaco.album = trackAlbum;

			    	if (searchResults[i].album.images[1].url) {

				    	var trackAlbumCover = searchResults[i].album.images[1].url;
				    	console.log(trackAlbumCover);

				    	trackTaco.albumCover = trackAlbumCover;
			    	}

			    	for (j = 0; j < searchResults[i].artists.length; j++) {

			    		var trackArtist = searchResults[i].artists[j].name
			    		console.log(trackArtist);
			    		console.log("-----------")

			    		trackTaco.artist = trackArtist;

			    	}

			    	var $result = $(trackTemplate(trackTaco));
			    	console.log($result);
			    	console.log(trackTaco);
			    	$results.append($result);

			    }

			} else {
				console.log("nope!");
				$("#no-image-panel").show();
			}
 
		  }
		);

	});

});