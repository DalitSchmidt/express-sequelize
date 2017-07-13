const express   = require('express');
const router    = express.Router();
const Sequelize = require('sequelize');

const sequelize = new Sequelize('musicplayer', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.sync();

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

router.get('/songs', (req, res) => {
    Song.findAll().then(( error, results, fields ) => {
        if ( error ) throw error;
        res.json( results )
    })
});

router.post('/songs', (req, res) => {
    let data = req.body;
    let song = data.name;

    Song.create(song).then(( error, result, fields ) => {
        if ( error ) {
            if ( error.code == 'ER_DUP_ENTRY' )
                res.status(400).send({ error: `Song ${song} already exists` });
            else
                res.status(500).send({ error: 'General Server Error' })
        } else {
            res.send({ id: result.insertId })

            //console.log(results)
            //console.log(error)
            //res.send('done')
        }})
});

router.get('/songs/:song_id', (req, res) => {
    let song_id = req.params.song_id;
    Song.findById(song_id).then( (error, results, fields) => {
        if ( results.length == 0 ) {
            res.status(204).end()
        } else {
            res.json( results[0] )
        }
    })
});

router.put('/songs/:song_id', (req, res) => {
    let song = req.body;
    let song_id = req.params.song_id;

    Song.update(
        {song}, {where: {song_id: song_id}}
    ).then(function (affectedRows) {
        Song.findAll(song).then((error, result, fields) => {
            if ( error ) throw error;
            res.json( result )
        })
    })
});

router.delete('/songs/:song_id', (req, res) => {
    let song_id = req.params.song_id;

    Song.destroy({ where: { song_id: song_id } }).then((error, results, fields, deleted) => {
        if ( error ) throw error;

        if ( results.affectedRows == 0 ) {
            res.json({ error: `Song id ${song_id} not found` })
        } else {
            res.json({ success: true });
            res.json( deleted )
        }
    })
});

module.exports = router;