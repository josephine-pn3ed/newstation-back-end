import { Table, Payload, Id } from "./types";

const db = require("../../../db");

module.exports = {
  getNewsByCompany: async (table: Table, id: Id) => {
    // const data = await db
    //   .table("News")
    //   .outerJoin(db.table("Users"), (news: any, user: any) => {
    //     return news("user_id").eq(user("id"));
    //   })
    //   .zip()
    //   .run();
    const data = await db
      .table(table)
      .filter({ company_id: id, news_status: "Active" })
      .eqJoin("user_id", db.table("Users"), { index: "id" })
      .orderBy(db.desc("updated_at"))
      // .zip()
      .run();
    // console.log(data);
    return data;
  },
  getNewsById: async (table: Table, id: Id) => {
    const data = await db.table(table).get(id).run();
    return data;
  },
  insertNews: async (table: Table, payload: Payload) => {
    console.log("inserting news");
    const data = await db.table(table).insert(payload).run();
    return data;
  },
  updateNews: async (table: Table, id: Id, payload: Payload) => {
    const data = await db.table(table).get(id).update(payload).run();
    return data;
  },
  deleteNews: async (table: Table, id: Id, payload: Payload) => {
    const data = await db.table(table).get(id).update(payload).run();
    return data;
  },
};
