import { GAME_DATA_PATH } from '../common/constants';

export const getCurrentGame = () => fetch(GAME_DATA_PATH).then((res) => res.json());
