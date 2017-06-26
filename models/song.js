module.exports = function(sequelize, DataTypes) {
    var Song = sequelize.define('song', {
        song_id: {
            type: DataTypes.INTEGER(7).UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        song_name: {
            type: DataTypes.STRING,
            validate: {
                is: /^[A-Z][A-Za-z0-9- ?=.*#?!@_$%^&-()]+$/i,
                unique: true
            }
        },
        song_time: {
            type: DataTypes.INTEGER(3).UNSIGNED,
            validate: {

            }
        },
        song_mp3_url: {
            type: DataTypes.STRING,
            validate: {
                isUrl: true,
                is: /^https?:\/\/(?:[a-z0-9\-]+\.)+[a-z0-9]{2,6}(?:\/[^\/#?]+)+\.(?:mp3)$/,
                unique: true
            }
        }
    })

    return Song;
};