const chai = require('chai');
const chaiHttp = require("chai-http");
const app = require('../app')
const expect = chai.expect;


chai.use(chaiHttp);

describe('Events API', () => {
    describe('GET /events', () => {

        it('should return all events details', (done) => {
            chai.request(app)
            .get('/events')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('email');
                expect(res.body).to.have.property('phone');
                expect(res.body).to.have.property('avatar');
                expect(res.body).to.have.property('events').that.is.an('array');

                if (res.body.events) {
                    res.body.events.forEach(event => {
                        expect(event).to.be.an('object');
                        expect(event).to.have.property('id');
                        expect(event).to.have.property('EventName');
                        expect(event).to.have.property('Date');
                        expect(event).to.have.property('balance');
                        expect(event).to.have.property('description');
                        if (event.members) {
                            event.members.forEach(member => {
                                expect(member).to.be.an('object');
                                expect(member).to.have.property('names');
                            });
                        }
                    });
                }
                done();
            });
        });
    });
});
