const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app'); 

chai.use(chaiHttp);

describe('Add Friend Route', function() {
  describe('GET /addFriends', function() {
    it('should return data of a user as the result of a search', function(done) {
      chai.request(app)
        .get('/addFriends')
        .end(function(err, res) {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.deep.equal({
            "name": "Sallyanne",
            "email": "sgoseling0@eepurl.com",
            "phone": "764-995-4333",
            "avatar": "https://robohash.org/eligendiquiased.png?size=50x50&set=set1"
          });
          done();
        });
    });
  });
});
