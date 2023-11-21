const chai = require('chai');
const chaiHttp = require("chai-http");
const app = require('../app')
const expect = chai.expect;

chai.use(chaiHttp);

describe('AddEventMember API Endpoint', () => {
    describe('GET /addEventMember', () => {
        it('should return the user data based on the search', (done) => {
            chai.request(app)
                .get('/addEventMember')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body[0]).to.have.all.keys('id', 'name', 'avatar','phone','email');
                    done();
                });
        });
    });
});

