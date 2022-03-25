const express =  require('express');
const router = express.Router();

const game_controller = require('../controllers/gameController');
const publisher_controller = require('../controllers/publisherController');
const gameinstance_controller = require('../controllers/gameInstanceController');
const genre_controller = require('../controllers/genreController');
const platform_controller = require('../controllers/platformController');
const user_controller = require('../controllers/userController');
const api_controller = require('../controllers/api_callers');

//home page route
router.get('/', publisher_controller.get_home_page);

//publisher routes
router.get('/publisher/create', user_controller.checkAuth, publisher_controller.get_publisher_create);
router.post('/publisher/create', user_controller.checkAuth, publisher_controller.post_publisher_create);
router.get('/publisher/:id/update', user_controller.checkAuth, publisher_controller.get_publisher_update);
router.post('/publisher/:id/update', user_controller.checkAuth, publisher_controller.post_publisher_update);
router.get('/publisher/:id/delete', user_controller.checkAuth, publisher_controller.get_publisher_delete);
router.post('/publisher/:id/delete', user_controller.checkAuth, publisher_controller.post_publisher_delete);
router.get('/publisher/:id/', publisher_controller.get_publisher);
router.get('/publishers', publisher_controller.get_publisher_list);

//platform routes
router.get('/platform/create', user_controller.checkAuth, platform_controller.get_platform_create);
router.post('/platform/create', user_controller.checkAuth, platform_controller.post_platform_create);
router.get('/platform/:id/update', user_controller.checkAuth, platform_controller.get_platform_update);
router.post('/platform/:id/update', user_controller.checkAuth, platform_controller.post_platform_update);
router.get('/platform/:id/delete', user_controller.checkAuth, platform_controller.get_platform_delete);
router.post('/platform/:id/delete', user_controller.checkAuth, platform_controller.post_platform_delete);
router.get('/platform/:id/', platform_controller.get_platform);
router.get('/platforms', platform_controller.get_platform_list);

//game routes
router.get('/game/create', user_controller.checkAuth, game_controller.get_game_create);
router.post('/game/create', user_controller.checkAuth, game_controller.post_game_create);
router.get('/game/:id/update', user_controller.checkAuth, game_controller.get_game_update);
router.post('/game/:id/update', user_controller.checkAuth, game_controller.post_game_update);
router.get('/game/:id/delete', user_controller.checkAuth, game_controller.get_game_delete);
router.post('/game/:id/delete', user_controller.checkAuth, game_controller.post_game_delete);
router.get('/game/:id/', game_controller.get_game);
router.get('/games', game_controller.get_game_list);
router.get('/universalgames', game_controller.get_universal_games_list);

//game instance routes
router.get('/gameinstance/create', user_controller.checkAuth, gameinstance_controller.get_gameinstance_create);
router.post('/gameinstance/create', user_controller.checkAuth, gameinstance_controller.post_gameinstance_create);
router.get('/gameinstance/:id/update', user_controller.checkAuth, gameinstance_controller.get_gameinstance_update);
router.post('/gameinstance/:id/update', user_controller.checkAuth, gameinstance_controller.post_gameinstance_update);
router.get('/gameinstance/:id/delete', user_controller.checkAuth, gameinstance_controller.get_gameinstance_delete);
router.post('/gameinstance/:id/delete', user_controller.checkAuth, gameinstance_controller.post_gameinstance_delete);
router.get('/gameinstance/:id/', gameinstance_controller.get_gameinstance);
router.get('/gameinstances', gameinstance_controller.get_gameinstance_list);

//genre routes
router.get('/genre/create', user_controller.checkAuth, genre_controller.get_genre_create);
router.post('/genre/create', user_controller.checkAuth, genre_controller.post_genre_create);
router.get('/genre/:id/update', user_controller.checkAuth, genre_controller.get_genre_update);
router.post('/genre/:id/update', user_controller.checkAuth, genre_controller.post_genre_update);
router.get('/genre/:id/delete', user_controller.checkAuth, genre_controller.get_genre_delete);
router.post('/genre/:id/delete', user_controller.checkAuth, genre_controller.post_genre_delete);
router.get('/genre/:id/', genre_controller.get_genre);
router.get('/genres', genre_controller.get_genre_list);

module.exports = router;
