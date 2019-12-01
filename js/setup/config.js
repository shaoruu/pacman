/* -------------------------------------------------------------------------- */
/*                                    GAME                                    */
/* -------------------------------------------------------------------------- */
const FOOD_RADIUS = 1
const KILLER_RADIUS = 5
const REGULAR_FOOD_POINT = 200

const GHOST_WIDTH = 20
const GHOST_SPRITE_WIDTH = 50
const GHOST_ACCELERATION = 1.5
const GHOST_DEAD_ACC = 1

const PLAYER_WIDTH = 22
const PLAYER_INIT_X = 13.5
const PLAYER_INIT_Y = 20
const PLAYER_EAT_SFX_DELAY = 300
const PLAYER_EAT_GHOST_SCORE = 500

const BLINKY_INIT_X = 14
const BLINKY_INIT_Y = 12

const PINKY_INIT_X = 12.5
const PINKY_INIT_Y = 14.5

const INKY_INIT_X = 14
const INKY_INIT_Y = 14.5

const CLYDE_INIT_X = 15.5
const CLYDE_INIT_Y = 14.5

const WALL_STATE = 0
const FOOD_STATE = 1
const SPAWNER_STATE = 2
const BORDER_STATE = 3
const GHOST_HOUSE_STATE = 4
const GHOST_KILLER_STATE = 5
const EMPTY_STATE = 6

const UP = 0
const DOWN = 1
const LEFT = 2
const RIGHT = 3
const PLAYER_VELOCITY = 2

const GHOST_DEAD_PERIOD = 5000
const GHOST_HALF_DEAD_PERIOD = 3000

const SCORE_NOTIF_LIFETIME = 3000

const GAME_NOTIF_X = 14.3
const GAME_NOTIF_Y = 17.6
const GAME_NOTIF_LIFETIME = 2000

const PLAYER_ROTATION_TWEEN = 80
const PLAYER_DEATH_DELAY = 300
const PLAYER_AFTERLIFE_DELAY = 2000

const START_GAME_PAUSE = 3000

/* -------------------------------------------------------------------------- */
/*                                   COLORS                                   */
/* -------------------------------------------------------------------------- */
const BACKGROUND_COLOR = '#000000'
const WALL_COLOR = 0x2121de
const BORDER_COLOR = 0x2121de
const GROUND_COLOR = 0x1b2a49
const SPAWNER_COLOR = 0xdea185
const FOOD_COLOR = 0xffa259
const NOTIF_COLOR = 0xdff6f0

/* -------------------------------------------------------------------------- */
/*                                    FIXED                                   */
/* -------------------------------------------------------------------------- */
const MAZE_WIDTH = 28
const MAZE_HEIGHT = 31

/* -------------------------------------------------------------------------- */
/*                                    MAZE                                    */
/* -------------------------------------------------------------------------- */
const MAZE_DATA = `
3333333333333333333333333333
3111111111111001111111111113
3100001000001001000001000013
3500001000001111000001000053
3100001000001001000001000013
3111111111111001111111111113
3100001001000000001001000013
3100001001000000001001000013
3111111001111001111001111113
3001001000001001000001001003
3001001000001001000001001003
3111001111111111111111001113
3100001001000220001001000013
3100001001044444401001000013
3111111001044444401001111113
3100001001044444401001000013
3100001001000000001001000013
3511001001116666111001001153
3001001001000000001001001003
3001001001000000001001001003
3111111111111661111111111113
3100001000001001000001000013
3100001000001001000001000013
3111001111111001111111001113
3001001001000000001001001003
3001001001000000001001001003
3111111001111001111001111113
3100005000001001000005000013
3100001000001001000001000013
3111111111111111111111111113
3333333333333333333333333333`.trim()
