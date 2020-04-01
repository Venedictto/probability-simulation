import { getThemeColours } from './utils/utils';

export default (req, res) => {
    res.status(200).json(getThemeColours());
}


