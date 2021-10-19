'use strict';
module.exports = (sequelize, DataTypes) => {
  const song_genre_join = sequelize.define('song_genre_join', {
    genreId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER
  }, {});
  song_genre_join.associate = function(models) {
    // associations can be defined here
  };
  return song_genre_join;
};