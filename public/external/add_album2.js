var AlbumForm = {
    // Using the function 'collectValues' we bring all the values in the inputs and textarea related to album (name, artist, image, year and description)
    collectValues: function() {
        var regexes = {
            name: new RegExp(""),
            artist: new RegExp(""),
            img: new RegExp(""),
            year: new RegExp(""),
            description: new RegExp("")
        };

        // The variable 'inputs' contains all of the inputs and textarea using jQuery
        var inputs = $('#album-form input, #album-form textarea');
        // The variable 'album' contains an empty object
        var album = {};

        // To get all the values from the variable 'inputs' use loop
        for ( var i = 0; i < inputs.length; i++ ) {
            // The variable 'input' brings the value of the loop
            var input = $( inputs[ i ] );
            // The variable 'input_name' allows us to get the inputs that have a 'name' attribute
            var input_name = input.attr('name');

            // We check if the variable 'input_name' is not empty (not contain fields that have a 'name' attribute), then you can proceed with the loop
            if ( typeof input_name == 'undefined' )
                continue;

            // The variable 'input_value' brings all existing values in the inputs and textarea
            var input_value = input.val();
            // The variable 'input_name' is actually an object, that contains an array of all the inputs and textarea their attributes 'name' introduces all the values of the fields
            album[ input_name ] = input_value;
        }

        // The function returns the 'album' actually contains all the values in a field
        return album;
    },

    // Using the function 'collectSongs' we bring all the values from the window of adding songs
    collectSongs: function() {
        // The variable 'songs_container' will be array of all the '#songs-form' and '.song' divs
        var songs_container = $('#songs-form .song');

        // Declare of some variables that we are gonna use
        var songs_inputs, i, songs = [];

        // Now we want to iterate on all the divs in the array and find the inputs
        for ( i = 0; i < songs_container.length; i++ ) {
            // Search for the inputs inside the div
            songs_inputs = $( songs_container[ i ] ).find('input');

            // Push a new object with the song name and the song url
            songs.push({
                // We know that the first input is the name
                name: $(songs_inputs[0]).val(),
                // And the second is the URL
                url: $(songs_inputs[1]).val()
            });
        }

        // The function returns the array containing the values of the name and URL of the song
        return songs;
    },

    // Using the function 'saveAlbum' we reserve this album with songs created
    saveAlbum: function( e ) {
        // Prevent the default action
        e.preventDefault();
        // The variable 'el' allows us to perform actions on the element that initiated the event
        var el = $(e.target),
            // Will return an array of all the album
            album = this.collectValues(),
            // Will return an array of all the songs
            songs = this.collectSongs();

        // Create property in the object 'album' and put the songs array inside it
        album.songs = songs;

        // AJAX request containing the properties object: url, contentType, method, data, dataType and success
        $.ajax({
            url: 'http://localhost:3000/api/albums',
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify( album ),
            // dataType: 'JSON',
            success: function( response ) {
                console.log( response );
            }
        });
    },

    // The function 'addSong' allows to add fields to add a new song to a form when you click the button 'Add another song'
    addSong: function ( e ) {
        // Prevent the default action
        e.preventDefault();
        // The variable 'html' contains html text with fields to add a new song
        var html = `
        <div class="form-group song">
            <input class="form-control" type="text" value="Song4" placeholder="Song name">
            <input type="text" value="http://lll.mp3" placeholder="Song URL" class="form-control"><br>
        </div>`;

        // Performing insert div containing a unique id ('#songs-form') and we allow adding a new songs for the album by the user (if necessary)
        $('#songs-form').append( html );
    },

    /**
     * The function 'bindEvents' allows to activate all the events in the window 'Add New Album'
     * The function 'bindEvents' must write each object so that it will work
     */
    bindEvents: function() {
        // When you click the button that has a unique id ('#save-album'), we want context of 'this' in the callback function ('saveAlbum') treats the element itself (button) and not to object 'AlbumForm', therefore we use a 'proxy' to the context of 'this' within the function 'saveAlbum' treats anyway to 'AlbumForm' object
        $('#save-album').on('click', $.proxy(this.saveAlbum, this));
        // When you click the button that has a unique id (#add-song), thw object 'AlbumForm' activates the function 'addSong'
        $('#add-song').on('click', this.addSong);
    },

    /**
     * Using a function 'init' we actually triggers the object 'AlbumForm'
     * The function 'init' must write each object so that it will work
     */
    init: function() {
        // 'this' in the 'init' function refers to the object 'AlbumForm' that called the 'init' function, and he actually starts the 'bindEvents' function containing all the events
        this.bindEvents();
    }
};

// The object 'AlbumForm' calls a function 'init' and run it
AlbumForm.init();