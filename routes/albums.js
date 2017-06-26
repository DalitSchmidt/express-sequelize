const express   = require('express');
const router    = express.Router();
const Sequelize = require('sequelize');

const sequelize = new Sequelize('musicplayer', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.sync();

const Album = sequelize.define('album', {
    album_id: {
        type: Sequelize.INTEGER(5).UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    album_name: {
        type: Sequelize.STRING,
        validate: {
            is: /^[A-Z][A-Za-z0-9- ?=.*#?!@_$%^&-()]+$/i,
            unique: true
        }
    },
    album_image: {
        type: Sequelize.STRING,
        validate: {
            isUrl: true,
            is: /^https?:\/\/(?:[a-z0-9\-]+\.)+[a-z0-9]{2,6}(?:\/[^\/#?]+)+\.(?:jpe?g|gif|png)$/
        }
    },
    album_year: {
        type: Sequelize.STRING,
        validate: {
            min: 1900,
            max: new Date().getFullYear()
        }
    },
    album_artist: {
        type: Sequelize.STRING,
        validate: {
            is: /^[A-Z][A-Za-z0-9- ?=.*#?!@_$%^&-()]+$/i
        }
    },
    album_description: Sequelize.TEXT
});

const Song = sequelize.define('song', {
    song_id: {
        type: Sequelize.INTEGER(7).UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    song_name: {
        type: Sequelize.STRING,
        validate: {
            is: /^[A-Z][A-Za-z0-9- ?=.*#?!@_$%^&-()]+$/i,
            unique: true
        }
    },
    song_time: {
        type: Sequelize.INTEGER(3).UNSIGNED,
        validate: {

        }
    },
    song_mp3_url: {
        type: Sequelize.STRING,
        validate: {
            isUrl: true,
            is: /^https?:\/\/(?:[a-z0-9\-]+\.)+[a-z0-9]{2,6}(?:\/[^\/#?]+)+\.(?:mp3)$/,
            unique: true
        }
    }
});

router.get('/albums', (req, res) => {
    Album.findAll().then(( error, results, fields ) => {
        if ( error ) throw error;
        res.json(results)
    })
});

router.post('/albums', (req, res) => {
    let album = req.body;
    let songs = album.songs;

    Album.create(album).then(( error, result, fields ) => {
        if ( error ) {
            if ( error.code == 'ER_DUP_ENTRY' )
                res.status(400).send({ error: `Album ${album.name} already exists` });
            else
                res.status(500).send({ error: 'General Server Error' })
        } else {
            let album_id = result.insertId;

            Song.create(songs).then((error, result, fields) => {
                res.status(201).send({id: album_id})
            })

            //console.log(results)
            //console.log(error)
            //res.send('done')
        }})
});

router.get('/albums/:album_id', (req, res) => {
    let album_id = req.params.album_id;
    Album.findById(album_id).then( (error, results, fields) => {
        if ( results.length == 0 ) {
            res.status(204).end()
        } else {
            res.json( results[0] )
        }
    })
});

router.put('/albums/:album_id', (req, res) => {
    let album = req.body;
    let album_id = req.params.album_id;

    Album.update(
        {album}, {where: {album_id: album_id}}
    ).then(function (affectedRows) {
        Album.findAll(album).then((error, result, fields) => {
            if (error) throw error;
            res.json(result)
        })
    })
});

router.delete('/albums/:album_id', (req, res) => {
    let album_id = req.params.album_id;

    Album.destroy({ where: { album_id: album_id } }).then((error, results, fields, deleted) => {
        if ( error ) throw error;

        if ( results.affectedRows == 0 ) {
            res.json({ error: `Album id ${album_id} not found` })
        } else {
            res.json({ success: true });
            res.json(deleted)
        }
    })
});

router.get('/albums/artist/:artist_name', (req, res) => {
    let artist = req.params.album_artist;

    Album.findAll({ where: { artist: artist } }).then((error, results, fields) => {
        if ( results.length == 0 ) {
            res.status(204).end()
        } else {
            res.json( results )
        }
    })
});

module.exports = router;