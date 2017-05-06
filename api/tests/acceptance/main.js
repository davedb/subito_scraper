var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require("../../index");
var assert = chai.assert;

chai.use(chaiHttp);

describe("Web API", () => {
    describe("GET /", () => {
        it("when called it returns echo string", (done) => {
            chai.request(server)
            .get("/")
            .end((err, res) => {
                assert.equal(res.status, 200);
                assert.equal(res.text, "secondhandy.com echo");
                done();
            });
        });
    });

    describe("GET /search", () => {
        it("when called without key")
    });
});