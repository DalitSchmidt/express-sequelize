// Define the variable 'router' as a const, load the module 'express' and run the 'router'
const router = require('express').Router()
// Define the variable 'fs' as a const and loading the module 'fs'
const fs = require('fs')
// Define the variable 'sql' as a const and loading capabilities in file 'sql.js'
const sql = require('./../sql')

router.route('/albums')
    .post(( req, res ) => {
        // The variable album include the body of the request
        var album = req.body
        // The variable songs include the property songs from the variable album
        var songs = album.songs

        // The query allows to insert data of the albums to the database
        let query = `INSERT INTO albums (album_name, album_artist, album_image, album_year, album_description) VALUES
        ('${album.name}', '${album.artist}', '${album.img}', '${album.year}', '${album.description}')`
        // Connection to the database and sends the query to the database
        sql.query( query, (error, result, fields) => {
            // At this point we carry out some tests...
            if ( error ) {
                // In this test we are checking if the album already exists
                if ( error.code == 'ER_DUP_ENTRY' )
                    // If the album as existing we send to the client error message with a status code 400 (Bad Request)
                    res.status(400).send({ error: `Album ${album.name} already exists` })
                else
                    // If there is an server error we send to the client error message with the status code 500 (Internal Server Error)
                    res.status(500).send({ error: 'General Server Error' })
            } else {
                // The variable contains the result of the insertId added
                let album_id = result.insertId;

                // The variable 'query' contains the query allows adding songs data according to the albums
                var query = 'INSERT INTO songs (song_name, song_time, song_mp3_url, album_id) VALUES ';

                // The variable 'queries' contains an array of songs
                var queries = [];
                // The loop through the array of songs
                for ( let i = 0; i < songs.length; i++ ) {
                    // The variable 'song' allows to get the songs that are in array with their index
                    let song = songs[ i ];
                    // The variable 'queries' inserts into the array of songs
                    queries.push(`('${song.name}', '${song.duration}', '${song.url}', ${album_id})`);
                }
                // The variable 'query' include array of songs to query, so basically it contains full query that allows you to get all of the songs in the album
                query = query + queries.join(', ') + ';';
                // Connection to the database and sends the query to the database
                sql.query( query, function (error, result, fields) {
                    // Sending the number 'album_id' that identifies the album created in the database
                    res.status(201).send({ id: album_id })
                });
            }
        })
    })

    .get(( req, res ) => {
        // The query that allows you to select all the data from the table of albums to the database
        let query = `SELECT * FROM albums`
        // Connection to the database and sends the query to the database
        sql.query( query, (error, results, fields) => {
            // If there is any error we thrown an error with the error variable
            if ( error ) throw error
            // Get all the results (as and)
            res.json( results )
        })
    })

// CRUD by the album id
// Defining routes related to 'albums'
router.route('/albums/:album_id')
    .get(( req, res ) => {
        // The variable 'album_id' include the number id of the album
        let album_id = req.params.album_id
        // The variable 'query' include the query data from a selection of albums by the number id of the database
        let query = `SELECT * FROM albums WHERE album_id = ${album_id}`
        // Connection to the database and sends the query to the database
        sql.query( query, (error, results, fields) => {
            // If the result of the query is 0
            if ( results.length == 0 ) {
                // Displayed the message with a status code 204 (No Content), telling you that there is no content to show that in fact the number id of the album doesn't exist
                res.status(204).end()
            } else {
                // If is the number id of the album, so the results displayed
                res.json( results[0] )
            }
        })
    })

    .put(( req, res ) => {
        // The variable album include the body of the request
        var album = req.body
        // The query allows to update the fields of the number id of the album
        let query = `UPDATE albums SET (album_name, album_image, album_artist, album_year, album_description) = '${album.name}', '${album.img}', '${album.artist}', '${album.year}', '${album.description}' WHERE (album_id) = {$album.id}`
        // Connection to the database and sends the query to the database
        sql.query( query, (error, result, fields) => {
            // If there is any error we thrown an error with the error variable
            if ( error ) throw error
            // Get all the results (as and)
            res.json( result )
        })
    })

    .delete(( req, res ) => {
        // The variable 'album_id' include the number id of the album
        let album_id = req.params.album_id;
        // The query allows to delete the album its number id
        let query = `DELETE FROM albums WHERE album_id = ${album_id}`
        // Connection to the database and sends the query to the database
        sql.query( query, (error, results, fields) => {
            // If there is any error we thrown an error with the error variable
            if ( error ) throw error

            // If the results regarding the rows affected by the delete operation is 0
            if ( results.affectedRows == 0 )
                // Then sent an error message that says the number id of the album not found
                res.json({ error: `Album id ${album_id} not found` })
            else
                // The other result regarding the rows affected by the delete operation is 1, send a message telling you that the row of the number id of the album was deleted from the database successfully
                res.json({ success: true })
        })
    })

// Display all the albums by the artist name
// Defining routes related to 'albums'
router.route('/albums/artist/:artist_name')
    .get(( req, res ) => {
        // The variable 'artist' contains the name of the artist who created the album
        let artist = req.params.artist_name
        // The query displays all albums belonging to the same artist
        let query = `SELECT * FROM albums WHERE album_artist = '${artist}'`
        // Connection to the database and sends the query to the database
        sql.query( query, (error, results, fields) => {
            // If the result of the query is 0
            if ( results.length == 0 ) {
                // Displayed the message with a status code 204 (No Content), telling you that there is no content to show that in fact the artist who created the album not found in the database
                res.status(204).end()
            } else {
                // Get all the results (as and)
                res.json( results )
            }
        })
    })

// To use the module in other files to export it out
module.exports = router