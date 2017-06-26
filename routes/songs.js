const router = require('express').Router()
const fs = require('fs')
const sql = require('./../sql')

router.route('/songs')
    .post(( req, res ) => {
        // The variable data include the body of the request
        let data = req.body
        // The variable data include the property name
        let song = data.name

        // Check if the json include name property
        if ( typeof song == 'undefined' )
        // We send to the client error message with a status code 422 (Unprocessable Entity) with the error
            res.status(422).send({ error: "Must supply name" })

        // If we reached here then name of the song

        // Try to execute the query
        sql.query(`INSERT INTO songs (song_name, song_time, song_mp3_url) VALUES ('${song}')`, (error, result, fields) => {
            // At this point we carry out some tests...
            if (error) {
                // In this test we are checking if the song already exists
                if (error.code == 'ER_DUP_ENTRY')
                // If the song as existing we send to the client error message with a status code 400 (Bad Request)
                    res.status(400).send({ error: `Song ${song} already exists` })
                else
                // If there is an server error we send to the client error message with the status code 500 (Internal Server Error)
                    res.status(500).send({ error: 'General Server Error' })
            } else {
                // If we got here, it says no errors and we send to the client the ID number added
                res.send({ id: result.insertId })
            }
        })
    })

    .get(( req, res ) => {
        // Following the query brings all the information that exists from a songs table
        sql.query('SELECT * FROM songs', (error, results, fields) => {
            // If there is any error we thrown an error with the error variable
            if (error) throw error
            // Get all the results (as and)
            res.json(results)
        })
    })

    .put(( req, res ) => {
        // The variable data include the body of the request
        let data = req.body
        // The variable data include the property name
        let song = data.name
        // The variable data include the property id
        let song_id = data.id
        sql.query(`UPDATE songs SET (song_name, song_time, song_mp3_url) = '${song}' WHERE (song_id) = song_id`, (error, result, fields) => {
            // If there is any error we thrown an error with the error variable
            if (error) throw error
            // Get the result (as and)
            res.json(result)
        })
    })

    .delete(( req, res ) => {
        // The variable data include the body of the request
        let data = req.body
        // The variable data include the property id
        let song_id = data.id
        sql.query(`DELETE FROM songs WHERE (song_id) = song_id`, (error, result, fields) => {
            // If there is any error we thrown an error with the error variable
            if (error) throw error
            // Get the result (as and)
            res.json(result)
        })
    })

router.route('/songs/:name')
    .get(( req, res ) => {
        // The variable data include the body of the request
        let data = req.body
        // The variable data include the property id
        let song_id = data.id
        // Following the query brings all the information that exists from a songs table
        sql.query(`SELECT FROM songs WHERE (song_id) = ${song_id}`, (error, results, fields) => {
            // If there is any error we thrown an error with the error variable
            if (error) throw error
            // Get all the results (as and)
            res.json(results)
        })
    })

    .put(( req, res ) => {
        // The variable data include the body of the request
        let data = req.body
        // The variable data include the property name
        let song = data.name
        // The variable data include the property id
        let song_id = data.id
        sql.query(`UPDATE songs SET (song_name, song_time, song_mp3_url) = '${song}' WHERE (song_id) = ${song_id}`, (error, result, fields) => {
            // If there is any error we thrown an error with the error variable
            if (error) throw error
            // Get the result (as and)
            res.json(result)
        })
    })

    .delete(( req, res ) => {
        // The variable data include the body of the request
        let data = req.body
        // The variable data include the property id
        let song_id = data.id
        sql.query(`DELETE FROM songs WHERE (song_id) = ${song_id}`, (error, result, fields) => {
            // If there is any error we thrown an error with the error variable
            if (error) throw error
            // Get the result (as and)
            res.json(result)
        })
    })

router.route('/songs/:album_id')
    .get(( req, res ) => {
        // The variable data include the body of the request
        let data = req.body
        // The variable data include the property id
        let song_id = data.id
        // Following the query brings all the information that exists from a songs table
        sql.query(`SELECT FROM songs WHERE (song_id) = ${song_id}`, (error, results, fields) => {
            // If there is any error we thrown an error with the error variable
            if (error) throw error
            // Get all the results (as and)
            res.json(results)
        })
    })

    .put(( req, res ) => {
        // The variable data include the body of the request
        let data = req.body
        // The variable data include the property name
        let song = data.name
        // The variable data include the property id
        let song_id = data.id
        sql.query(`UPDATE songs SET (song_name, song_time, song_mp3_url) = '${song}' WHERE (song_id) = ${song_id}`, (error, result, fields) => {
            // If there is any error we thrown an error with the error variable
            if (error) throw error
            // Get the result (as and)
            res.json(result)
        })
    })

    .delete(( req, res ) => {
        // The variable data include the body of the request
        let data = req.body
        // The variable data include the property id
        let song_id = data.id
        sql.query(`DELETE FROM songs WHERE (song_id) = ${song_id}`, (error, result, fields) => {
            // If there is any error we thrown an error with the error variable
            if (error) throw error
            // Get the result (as and)
            res.json(result)
        })
    })

router.route('/songs/:song_id')
    .get(( req, res ) => {
        // The variable data include the body of the request
        let data = req.body
        // The variable data include the property id
        let song_id = data.id
        // Following the query brings all the information that exists from a songs table
        sql.query(`SELECT FROM songs WHERE (song_id) = ${song_id}`, (error, results, fields) => {
            // If there is any error we thrown an error with the error variable
            if (error) throw error
            // Get all the results (as and)
            res.json(results)
        })
    })

    .put(( req, res ) => {
        // The variable data include the body of the request
        let data = req.body
        // The variable data include the property name
        let song = data.name
        // The variable data include the property id
        let song_id = data.id
        sql.query(`UPDATE songs SET (song_name, song_time, song_mp3_url) = '${song}' WHERE (song_id) = ${song_id}`, (error, result, fields) => {
            // If there is any error we thrown an error with the error variable
            if (error) throw error
            // Get the result (as and)
            res.json(result)
        })
    })

    .delete(( req, res ) => {
        // The variable data include the body of the request
        let data = req.body
        // The variable data include the property id
        let song_id = data.id
        sql.query(`DELETE FROM songs WHERE (song_id) = ${song_id}`, (error, result, fields) => {
            // If there is any error we thrown an error with the error variable
            if (error) throw error
            // Get the result (as and)
            res.json(result)
        })
    })

router.route('/songs/:time')
    .get(( req, res ) => {
        // The variable data include the body of the request
        let data = req.body
        // The variable data include the property id
        let song_id = data.id
        // Following the query brings all the information that exists from a songs table
        sql.query(`SELECT FROM songs WHERE (song_id) = ${song_id}`, (error, results, fields) => {
            // If there is any error we thrown an error with the error variable
            if (error) throw error
            // Get all the results (as and)
            res.json(results)
        })
    })

    .put(( req, res ) => {
        // The variable data include the body of the request
        let data = req.body
        // The variable data include the property name
        let song = data.name
        // The variable data include the property id
        let song_id = data.id
        sql.query(`UPDATE songs SET (song_name, song_time, song_mp3_url) = '${song}' WHERE (song_id) = ${song_id}`, (error, result, fields) => {
            // If there is any error we thrown an error with the error variable
            if (error) throw error
            // Get the result (as and)
            res.json(result)
        })
    })

    .delete(( req, res ) => {
        // The variable data include the body of the request
        let data = req.body
        // The variable data include the property id
        let song_id = data.id
        sql.query(`DELETE FROM songs WHERE (song_id) = ${song_id}`, (error, result, fields) => {
            // If there is any error we thrown an error with the error variable
            if (error) throw error
            // Get the result (as and)
            res.json(result)
        })
    })

router.route('/songs/:mp3_url')
    .get(( req, res ) => {
        // The variable data include the body of the request
        let data = req.body
        // The variable data include the property id
        let song_id = data.id
        // Following the query brings all the information that exists from a songs table
        sql.query(`SELECT FROM songs WHERE (song_id) = ${song_id}`, (error, results, fields) => {
            // If there is any error we thrown an error with the error variable
            if (error) throw error
            // Get all the results (as and)
            res.json(results)
        })
    })

    .put(( req, res ) => {
        // The variable data include the body of the request
        let data = req.body
        // The variable data include the property name
        let song = data.name
        // The variable data include the property id
        let song_id = data.id
        sql.query(`UPDATE songs SET (song_name, song_time, song_mp3_url) = '${song}' WHERE (song_id) = ${song_id}`, (error, result, fields) => {
            // If there is any error we thrown an error with the error variable
            if (error) throw error
            // Get the result (as and)
            res.json(result)
        })
    })

    .delete(( req, res ) => {
        // The variable data include the body of the request
        let data = req.body
        // The variable data include the property id
        let song_id = data.id
        sql.query(`DELETE FROM songs WHERE (song_id) = ${song_id}`, (error, result, fields) => {
            // If there is any error we thrown an error with the error variable
            if (error) throw error
            // Get the result (as and)
            res.json(result)
        })
    })

module.exports = router