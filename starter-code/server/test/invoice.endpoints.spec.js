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
    expectedInvoiceArray
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
        TRUNCATE TABLE lskin CASCADE;
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
            it("responds with 200 and an empty array", () => {
                return supertest(app)
                    .get("/api/invoice")
                    .expect(200, []);
            });
        });

        context("Given invoices in the database", () => {
            beforeEach(() => db.into("lskin").insert(testLskinInsert));
            beforeEach(() => db.into("leclient").insert(testLeclientInsert));
            beforeEach(() => db.into("leinvoice").insert(testLeinvoiceInsert));
            beforeEach(() => db.into("leitem").insert(testLeitemInsert));

            it("responds with 200 and invoice Array with JSON object", () => {
                return supertest(app)
                .get("/api/invoice")
                .expect(200)
                .expect( res => {
                    expect(res.body[res.body.length-1].id).to.equal(expectedInvoiceArray[0].id);
                    expect(res.body[res.body.length-1].clientName).to.equal(expectedInvoiceArray[0].clientName);
                    expect(res.body[res.body.length-1].lsid).to.equal(expectedInvoiceArray[0].lsid);
                    expect(res.body[res.body.length-1].items[0].liid).to.equal(expectedInvoiceArray[0].items[0].liid);
                    expect(res.body[res.body.length-1].items).to.be.a('array');
                    expect(res.body[res.body.length-1].clientAddress).to.be.a('object');
                    expect(res.body[res.body.length-1].senderAddress).to.be.a('object');
                });
            });
        });
    });
});
