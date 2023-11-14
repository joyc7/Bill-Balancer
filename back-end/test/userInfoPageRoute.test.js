const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app"); 
const expect = chai.expect;

chai.use(chaiHttp);

describe("User Info API", () => {
  it("should return user information including id, name, email, avatar, and a list of users", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");

        // check main user info
        expect(res.body).to.include.keys(
          "id", "name", "email", "avatar", "user"
        );
        expect(res.body.id).to.equal(1);
        expect(res.body.name).to.equal('Bryn');
        expect(res.body.email).to.equal('btaylot0@booking.com');
        expect(res.body.avatar).to.equal('https://robohash.org/utetquibusdam.png?size=50x50&set=set1');

        // check user array
        expect(res.body.user).to.be.an("array");
        expect(res.body.user).to.have.lengthOf(2);

        // check details of users in the array
        res.body.user.forEach((user, index) => {
          expect(user).to.include.keys("id", "name", "email");
          if (index === 0) {
            expect(user.id).to.equal(2);
            expect(user.name).to.equal('Jdavie');
            expect(user.email).to.equal('jzecchinii0@yahoo.co.jp');
          }
          if (index === 1) {
            expect(user.id).to.equal(3);
            expect(user.name).to.equal('Emmie');
            expect(user.email).to.equal('esworder1@xinhuanet.com');
          }
        });

        done();
      });
  });
});
