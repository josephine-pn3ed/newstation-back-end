import { Payload, Id, Table } from '../../model/Viewers/types';

const Viewers = require('../../model/Viewers');

module.exports = {
  getViewers: async (id: Id) => {
    try {
      const data = await Viewers.getViewers("Viewers", id);
      if (data) {
        return data;
      } else throw Error;
    } catch (error) {
      return false;
    }
  },
  insertViewers: async (payload: Payload) => {
    try {
      const data = await Viewers.insertViewers("Viewers", {
        ...payload,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      if (data) {
        return data;
      } else throw Error;

    } catch (error) {
      return false;
    }
  },
  updateViewers: async (id: Id, payload: Payload) => {
    try {
      const data = await Viewers.updateViewers("Viewers", id, {
        ...payload,
        updated_at: new Date().toISOString(),
      });
      if (data) {
        return data;
      } else throw Error;
    }
    catch (error) {
      return false;
    }
  },
  deleteViewers: async (id: Id) => {
    try {
      const data = await Viewers.deleteViewers("Viewers", id, {
        status: "Inactive",
        updated_at: new Date().toISOString(),
      });
      if (data) {
        return data;
      } else throw Error;

    } catch (error) {
      return false;
    }
  }

}