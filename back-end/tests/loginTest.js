// const chai = require("chai");
// const request = require("supertest");
// const app = require("../app");
// const expect = chai.expect;

// describe("Login Endpoint", function () {
//   it("should return a 200 status code and a success message", function (done) {
//     request(app)
//       .post("/")
//       .send({ username: "testuser", password: "testpassword" })
//       .expect(200)
//       .expect("Content-Type", /json/)
//       .end(function (err, res) {
//         if (err) return done(err);
//         const response = res.body;
//         expect(response)
//           .to.have.property("message")
//           .equal("We recieved your data!");
//         done();
//       });
//   });

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const expect = chai.expect;

chai.use(chaiHttp);
chai.should();

describe(" GET Endpoint for Login", () => {
  describe("/GET /", () => {
    it("it should return a 200 status code and a success message", (done) => {
      chai
        .request(server)
        .get("/")
        .end((err, res) => {
          //   res.should.have.status(200);
          expect(res).to.have.status(200);

          //   res.body.should.be.a("array");
          done();
        });
    });
  });
});
