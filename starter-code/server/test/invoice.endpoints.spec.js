const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");
const multiline = require('multiline');

describe("Invoice Endpoints", () => {
  let db;
  const {
    testLskinInsert,
    testLeclientInsert,
    testLeinvoiceInsert,
    testLeitemInsert,
    expectedInvoiceJsonObj
  } = helpers;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
  });

  const cleanupQuery = multiline.stripIndent(() => {
    /*
        ALTER SEQUENCE lskin_lskinid_seq RESTART WITH 1;
        ALTER SEQUENCE leclient_leclientid_seq RESTART WITH 1;
        ALTER SEQUENCE leinvoice_leinvoiceid_seq RESTART WITH 1;
        ALTER SEQUENCE leitem_leitemid_seq RESTART WITH 1;
    */
  });
  cleanupQuery.replace(/\n/g, "").replace(/\t/g, " ");

  after("disconnect from db", () => db.destroy());
  before("clean the table", () => db.raw(cleanupQuery));
  afterEach("cleanup", () => db.raw(cleanupQuery));

  describe("GET /api/invoice", () => {
        context("Given no invoices in the database", () => {
            it("responds with 200 and an empty object", () => {
                return supertest(app)
                    .get("/api/invoice")
                    .expect(200, {});
            });
        });

        context("Given invoices in the database", () => {
            beforeEach(() => db.into("lskin").insert(testLskinInsert));
            beforeEach(() => db.into("leclient").insert(testLeclientInsert));
            beforeEach(() => db.into("leinvoice").insert(testLeinvoiceInsert));
            beforeEach(() => db.into("leitem").insert(testLeitemInsert));

            it("responds with 200 and invoice JSON object", () => {
                return supertest(app)
                .get("/api/invoice")
                .expect(200)
                .expect(expectedInvoiceJsonObj);
            });
        });
    });
});
