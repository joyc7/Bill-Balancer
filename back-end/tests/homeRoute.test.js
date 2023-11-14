const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const expect = chai.expect;

chai.use(chaiHttp);

describe(" GET Endpoint for Home", () => {
  describe("/GET /home", () => {
    it("it should return a 200 status code", (done) => {
      chai
        .request(server)
        .get("/home")
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a("object");
          expect(res.body).to.have.property("id");
          expect(res.body).to.have.property("name");
          done();
        });
    });
  });
});
