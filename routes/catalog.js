const express =  require('express');
const router = express.Router();

const game_controller = require('../controllers/game_controller');
const publisher_controller = require('../controllers/publisher_controller');
const platform_controller = require('../controllers/platform_controller');
const user_controller = require('../controllers/user_controller');
const api_controller = require('../controllers/api_callers');

//home page route
router.get('/', publisher_controller.get_home_page);

//platform routes
router.get('/playstation', user_controller.checkAuth, platform_controller.get_playstation_home);
router.get('/playstation/ps1', user_controller.checkAuth, platform_controller.get_ps1_home);
router.get('/playstation/ps2', user_controller.checkAuth, platform_controller.get_ps2_home);
router.get('/playstation/ps3', user_controller.checkAuth, platform_controller.get_ps3_home);
router.get('/playstation/ps4', user_controller.checkAuth, platform_controller.get_ps4_home);
router.get('/playstation/ps5', user_controller.checkAuth, platform_controller.get_ps5_home);

router.get('/xbox', user_controller.checkAuth, platform_controller.get_xbox_home);
router.get('/xbox/xbox', user_controller.checkAuth, platform_controller.get_xboxxbox_home);
router.get('/xbox/xbox360', user_controller.checkAuth, platform_controller.get_xbox360_home);
router.get('/xbox/xboxone', user_controller.checkAuth, platform_controller.get_xboxone_home);
router.get('/xbox/xboxseries', user_controller.checkAuth, platform_controller.get_xboxseries_home);

router.get('/nintendo', user_controller.checkAuth, platform_controller.get_nintendo_home);
router.get('/nintendo/nes', user_controller.checkAuth, platform_controller.get_nes_home);
router.get('/nintendo/snes', user_controller.checkAuth, platform_controller.get_snes_home);
router.get('/nintendo/n64', user_controller.checkAuth, platform_controller.get_n64_home);
router.get('/nintendo/gamecube', user_controller.checkAuth, platform_controller.get_gamecube_home);
router.get('/nintendo/wii', user_controller.checkAuth, platform_controller.get_wii_home);
router.get('/nintendo/wiiu', user_controller.checkAuth, platform_controller.get_wiiu_home);
router.get('/nintendo/switch', user_controller.checkAuth, platform_controller.get_switch_home);

router.get('/pc', user_controller.checkAuth, platform_controller.get_pc_home);

//game routes
router.get('/:platform/:id', game_controller.get_game);
router.post('/:company/:platform/:id', game_controller.post_game);

module.exports = router;