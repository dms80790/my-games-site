const express =  require('express');
const router = express.Router();

//publisher routes
router.get('/publishers', get_publisher_list);
router.get('/publishers/:id/', publisher_get_publisher);
route.get('/publishers/create', get_publisher_create);
route.post('/publishers/create', post_publisher_create);
router.get('/publishers/:id/update', get_publisher_update);
router.post('/publishers/:id/update', post_publisher_update);
router.post('/publishers/:id/update', publisher_post_update);
router.get('/publishers/:id/delete', get_publisher_delete);
router.post('/publishers/:id/delete', post_publisher_delete);

//game routes
router.get('/games', get_game_list);
router.get('/games/:id/', game_get_game);
route.get('/games/create', get_game_create);
route.post('/games/create', post_game_create);
router.get('/games/:id/update', get_game_update);
router.post('/games/:id/update', post_game_update);
router.post('/games/:id/update', game_post_update);
router.get('/games/:id/delete', get_game_delete);
router.post('/games/:id/delete', post_game_delete);

//game instance routes
router.get('/gameinstances', get_gameinstance_list);
router.get('/gameinstances/:id/', gameinstance_get_gameinstance);
route.get('/gameinstances/create', get_gameinstance_create);
route.post('/gameinstances/create', post_gameinstance_create);
router.get('/gameinstances/:id/update', get_gameinstance_update);
router.post('/gameinstances/:id/update', post_gameinstance_update);
router.post('/gameinstances/:id/update', gameinstance_post_update);
router.get('/gameinstances/:id/delete', get_gameinstance_delete);
router.post('/gameinstances/:id/delete', post_gameinstance_delete);

//genre routes
router.get('/genres', get_genre_list);
router.get('/genres/:id/', genre_get_genre);
route.get('/genres/create', get_genre_create);
route.post('/genres/create', post_genre_create);
router.get('/genres/:id/update', get_genre_update);
router.post('/genres/:id/update', post_genre_update);
router.post('/genres/:id/update', genre_post_update);
router.get('/genres/:id/delete', get_genre_delete);
router.post('/genres/:id/delete', post_genre_delete);

module.exports = router;
