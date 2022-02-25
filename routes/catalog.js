const express =  require('express');
const router = express.Router();

const game_controller = require('../controllers/gameController');
const publisher_controller = require('../controllers/publisherController');
const gameinstance_controller = require('../controllers/gameInstanceController');
const genre_controller = require('../controllers/genreController');

//home page route
router.get('/', publisher_controller.get_home_page);

//publisher routes
router.get('/publisher', publisher_controller.get_publisher_list);
router.get('/publisher/:id/', publisher_controller.get_publisher);
router.get('/publisher/create', publisher_controller.get_publisher_create);
router.post('/publisher/create', publisher_controller.post_publisher_create);
router.get('/publisher/:id/update', publisher_controller.get_publisher_update);
router.post('/publisher/:id/update', publisher_controller.post_publisher_update);
router.get('/publisher/:id/delete', publisher_controller.get_publisher_delete);
router.post('/publisher/:id/delete', publisher_controller.post_publisher_delete);

//game routes
router.get('/game', game_controller.get_game_list);
router.get('/game/:id/', game_controller.get_game);
router.get('/game/create', game_controller.get_game_create);
router.post('/game/create', game_controller.post_game_create);
router.get('/game/:id/update', game_controller.get_game_update);
router.post('/game/:id/update', game_controller.post_game_update);
router.get('/game/:id/delete', game_controller.get_game_delete);
router.post('/game/:id/delete', game_controller.post_game_delete);

//game instance routes
router.get('/gameinstance', gameinstance_controller.get_gameinstance_list);
router.get('/gameinstance/:id/', gameinstance_controller.get_gameinstance);
router.get('/gameinstance/create', gameinstance_controller.get_gameinstance_create);
router.post('/gameinstance/create', gameinstance_controller.post_gameinstance_create);
router.get('/gameinstance/:id/update', gameinstance_controller.get_gameinstance_update);
router.post('/gameinstance/:id/update', gameinstance_controller.post_gameinstance_update);
router.get('/gameinstance/:id/delete', gameinstance_controller.get_gameinstance_delete);
router.post('/gameinstance/:id/delete', gameinstance_controller.post_gameinstance_delete);

//genre routes
router.get('/genre', genre_controller.get_genre_list);
router.get('/genre/:id/', genre_controller.get_genre);
router.get('/genre/create', genre_controller.get_genre_create);
router.post('/genre/create', genre_controller.post_genre_create);
router.get('/genre/:id/update', genre_controller.get_genre_update);
router.post('/genre/:id/update', genre_controller.post_genre_update);
router.get('/genre/:id/delete', genre_controller.get_genre_delete);
router.post('/genre/:id/delete', genre_controller.post_genre_delete);

module.exports = router;
