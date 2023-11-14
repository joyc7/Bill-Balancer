const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const expect = chai.expect;

chai.use(chaiHttp);

describe(" GET Endpoint for Login", () => {
  describe("/GET /", () => {
    it("it should return a 200 status code", (done) => {
      chai
        .request(server)
        .get("/")
        .end((err, res) => {
          expect(res).to.have.status(200);

          done();
        });
    });
  });
});
