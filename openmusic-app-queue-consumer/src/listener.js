class Listener {
  constructor(playlistSongsService, mailSender) {
    this._playlistSongsService = playlistSongsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(message.content.toString());

      const playlistWithSongs = await this._playlistSongsService.getPlaylistsSongs(playlistId);
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(playlistWithSongs));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
