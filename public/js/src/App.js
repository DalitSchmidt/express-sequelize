import Player from 'Player';
import AlbumForm from 'AlbumForm';
import AlbumBoard from 'AlbumsBoard';

const App = {
    init: function() {
        Player.init();
        AlbumForm.init();
        AlbumBoard.init();
    }
};

App.init();