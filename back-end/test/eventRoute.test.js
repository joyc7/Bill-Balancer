const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); 
const expect = chai.expect;

chai.use(chaiHttp);

describe('Event API', () => {
    describe('GET /event', () => {
        it('should get event details', (done) => {
            chai.request(app)
                .get('/event')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('id');
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('expenses');
                    expect(res.body.expenses).to.be.a('array');
                    expect(res.body.expenses).to.have.lengthOf(3);
                    done();
                });
        });
    });
});
