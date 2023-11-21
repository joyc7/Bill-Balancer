const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const expect = chai.expect;

chai.use(chaiHttp);

describe("POST for Forgot Password", () => {
  describe("POST /forgot-password", () => {
    it("should return a success response", (done) => {
      chai
        .request(app)
        .post("/forgot-password")
        .send({ username: "testuser", password: "testnewpassword" })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a("object");
          expect(res.body).to.have.property("status", "Success");
          expect(res.body).to.have.property("message");
          done();
        });
    });
  });
});
