const { Pool } = require('pg');

class PlaylistSongsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistById(id) {
    const query = {
      text: `SELECT playlists.id,playlists.name FROM playlists WHERE playlists.id = $1`,
      values: [id],
    };
    const { rows } = await this._pool.query(query);
    return rows[0];
  }

  async getPlaylistsSongs(id) {
    const query = {
      text: `SELECT songs.id,songs.title,songs.performer FROM songs
      LEFT JOIN playlist_songs ON playlist_songs."songId" = songs.id
      WHERE playlist_songs."playlistId" = $1`,
      values: [id],
    };
    const { rows } = await this._pool.query(query);

    const playlist = await this.getPlaylistById(id);
    playlist.songs = rows;

    return {playlist};
  }
}

module.exports = PlaylistSongsService;
