const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app'); 

chai.use(chaiHttp);

describe('Friend list API', function() {
  describe('GET /friends', function() {
    it("should return a person's information containing list of friends", function(done) {
        chai.request(app)
          .get('/friends')
          .end(function(err, res) {
              expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.include.keys('id', 'name', 'email', 'phone', 'avatar', 'friends');
            expect(res.body.friends).to.be.an('array');
            expect(res.body.friends).to.have.lengthOf(6);
            res.body.friends.forEach(friend => {
              expect(friend).to.include.keys('id', 'name', 'email', 'phone', 'balance');
            });
            done();
        });
    });
  });
});