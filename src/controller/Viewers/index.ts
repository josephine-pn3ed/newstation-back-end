import { Payload, Id } from '../../model/Viewers/types';

const Viewers = require('../../model/Viewers');

module.exports = {
    getNews: async (employee_id: Id) => {
        try {
            const data = await Viewers.getNews("Viewers", employee_id);
            if (data) {
                return true;
            } else throw Error;
        } catch (error) {
            return false;
        }
    },
}