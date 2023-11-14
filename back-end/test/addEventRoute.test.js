const chai = require('chai');
const chaiHttp = require("chai-http");
const app = require('../app')
const expect = chai.expect;

chai.use(chaiHttp);

describe('AddEvent API Endpoint', () => {
    describe('GET /addEvent', () => {
        it('should fetch friend data', (done) => {
            chai.request(app)
                .get('/addEvent')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('id');
                    expect(res.body).to.have.property('name');
                    expect(res.body).to.have.property('avatar');
                    expect(res.body).to.have.property('phone');
                    expect(res.body).to.have.property('email');
                    done();
                });
        });
    });
});