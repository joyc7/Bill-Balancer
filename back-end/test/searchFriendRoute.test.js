const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
chai.use(chaiHttp);

describe("User Data Retrieval API", () => {
  describe("GET /searchFriend - Successful User Retrieval", () => {
    it("should return user data for a valid username", (done) => {
      const validUsername = "joyc"; // a valid username
      chai
        .request(app)
        .get(`/searchFriend/?username=${validUsername}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("_id");
          expect(res.body).to.have.property("username", validUsername);
          expect(res.body).to.have.property("avatar");
          done();
        });
    });
  });

  describe("GET /searchFriend - User Not Found", () => {
    it("should return an error if the user is not found", (done) => {
      const invalidUsername = "bchdjackdh"; // A username that doesn't exist
      chai
        .request(app)
        .get(`/searchFriend/?username=${invalidUsername}`)
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.text).to.equal("User not found");
          done();
        });
    });
  });
});
