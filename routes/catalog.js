const express =  require('express');
const router = express.Router();

const game_controller = require('../controllers/gameController');
const publisher_controller = require('../controllers/publisherController');
const gameinstance_controller = require('../controllers/gameInstanceController');
const genre_controller = require('../controllers/genreController');

//publisher routes
router.get('/publishers', publisher_controller.get_publisher_list);
router.get('/publishers/:id/', publisher_controller.get_publisher);
router.get('/publishers/create', publisher_controller.get_publisher_create);
router.post('/publishers/create', publisher_controller.post_publisher_create);
router.get('/publishers/:id/update', publisher_controller.get_publisher_update);
router.post('/publishers/:id/update', publisher_controller.post_publisher_update);
router.get('/publishers/:id/delete', publisher_controller.get_publisher_delete);
router.post('/publishers/:id/delete', publisher_controller.post_publisher_delete);

//game routes
router.get('/games', game_controller.get_game_list);
router.get('/games/:id/', game_controller.get_game);
router.get('/games/create', game_controller.get_game_create);
router.post('/games/create', game_controller.post_game_create);
router.get('/games/:id/update', game_controller.get_game_update);
router.post('/games/:id/update', game_controller.post_game_update);
router.get('/games/:id/delete', game_controller.get_game_delete);
router.post('/games/:id/delete', game_controller.post_game_delete);

//game instance routes
router.get('/gameinstances', gameinstance_controller.get_gameinstance_list);
router.get('/gameinstances/:id/', gameinstance_controller.get_gameinstance);
router.get('/gameinstances/create', gameinstance_controller.get_gameinstance_create);
router.post('/gameinstances/create', gameinstance_controller.post_gameinstance_create);
router.get('/gameinstances/:id/update', gameinstance_controller.get_gameinstance_update);
router.post('/gameinstances/:id/update', gameinstance_controller.post_gameinstance_update);
router.get('/gameinstances/:id/delete', gameinstance_controller.get_gameinstance_delete);
router.post('/gameinstances/:id/delete', gameinstance_controller.post_gameinstance_delete);

//genre routes
router.get('/genres', genre_controller.get_genre_list);
router.get('/genres/:id/', genre_controller.get_genre);
router.get('/genres/create', genre_controller.get_genre_create);
router.post('/genres/create', genre_controller.post_genre_create);
router.get('/genres/:id/update', genre_controller.get_genre_update);
router.post('/genres/:id/update', genre_controller.post_genre_update);
router.get('/genres/:id/delete', genre_controller.get_genre_delete);
router.post('/genres/:id/delete', genre_controller.post_genre_delete);

module.exports = router;
