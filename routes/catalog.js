const express =  require('express');
const router = express.Router();

const game_controller = require('../controllers/gameController');
const publisher_controller = require('../controllers/publisherController');
const gameinstance_controller = require('../controllers/gameInstanceController');
const genre_controller = require('../controllers/genreController');
const platform_controller = require('../controllers/platformController');

//home page route
router.get('/', publisher_controller.get_home_page);

//publisher routes
router.get('/publisher/create', publisher_controller.get_publisher_create);
router.post('/publisher/create', publisher_controller.post_publisher_create);
router.get('/publisher/:id/update', publisher_controller.get_publisher_update);
router.post('/publisher/:id/update', publisher_controller.post_publisher_update);
router.get('/publisher/:id/delete', publisher_controller.get_publisher_delete);
router.post('/publisher/:id/delete', publisher_controller.post_publisher_delete);
router.get('/publisher/:id/', publisher_controller.get_publisher);
router.get('/publishers', publisher_controller.get_publisher_list);

//platform routes
router.get('/platform/create', platform_controller.get_platform_create);
router.post('/platform/create', platform_controller.post_platform_create);
router.get('/platform/:id/update', platform_controller.get_platform_update);
router.post('/platform/:id/update', platform_controller.post_platform_update);
router.get('/platform/:id/delete', platform_controller.get_platform_delete);
router.post('/platform/:id/delete', platform_controller.post_platform_delete);
router.get('/platform/:id/', platform_controller.get_platform);
router.get('/platforms', platform_controller.get_platform_list);

//game routes
router.get('/game/create', game_controller.get_game_create);
router.post('/game/create', game_controller.post_game_create);
router.get('/game/:id/update', game_controller.get_game_update);
router.post('/game/:id/update', game_controller.post_game_update);
router.get('/game/:id/delete', game_controller.get_game_delete);
router.post('/game/:id/delete', game_controller.post_game_delete);
router.get('/game/:id/', game_controller.get_game);
router.get('/games', game_controller.get_game_list);
router.post('/games', game_controller.post_game_list);

//game instance routes
router.get('/gameinstance/create', gameinstance_controller.get_gameinstance_create);
router.post('/gameinstance/create', gameinstance_controller.post_gameinstance_create);
router.get('/gameinstance/:id/update', gameinstance_controller.get_gameinstance_update);
router.post('/gameinstance/:id/update', gameinstance_controller.post_gameinstance_update);
router.get('/gameinstance/:id/delete', gameinstance_controller.get_gameinstance_delete);
router.post('/gameinstance/:id/delete', gameinstance_controller.post_gameinstance_delete);
router.get('/gameinstance/:id/', gameinstance_controller.get_gameinstance);
router.get('/gameinstances', gameinstance_controller.get_gameinstance_list);

//genre routes
router.get('/genre/create', genre_controller.get_genre_create);
router.post('/genre/create', genre_controller.post_genre_create);
router.get('/genre/:id/update', genre_controller.get_genre_update);
router.post('/genre/:id/update', genre_controller.post_genre_update);
router.get('/genre/:id/delete', genre_controller.get_genre_delete);
router.post('/genre/:id/delete', genre_controller.post_genre_delete);
router.get('/genre/:id/', genre_controller.get_genre);
router.get('/genres', genre_controller.get_genre_list);

module.exports = router;
