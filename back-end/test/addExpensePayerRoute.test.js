const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app'); 

chai.use(chaiHttp);

describe('Add Friend Route', function() {
  describe('GET /addExpensePayer', function() {
    it('should return a list of people with their id, name and avatar', function(done) {
      chai.request(app)
        .get('/addExpensePayer')
        .end(function(err, res) {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf(5);
            expect(res.body[0]).to.have.all.keys('id', 'first_name', 'avatar');
            done();
        });
    });
  });
});