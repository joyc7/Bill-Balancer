const chai = require('chai');
const chaiHttp = require("chai-http");
const app = require('../app')
const expect = chai.expect;

chai.use(chaiHttp);

describe('Add Event API', () =>{
    describe('POST /add-event', () => {
        it('should return success response when user enter the information', (done) => {
            let postData = {
                eventName: "testEventName",
                date: "testEventData",
                description: "testEventDescription",
                member: "testMember"
            }
            chai.request(app)
                .post('/add-event')
                .send(postData)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('status', 'Success');
                    expect(res.body).to.have.property('message');
                    expect(res.body.data).to.deep.equal(postData);
                    done();
                });
        })
    })
})
describe('AddEvent API Endpoint', () => {
    describe('GET /addEventMembers', () => {
        it('should return the user data based on the search', (done) => {
            chai.request(app)
                .get('/addEvent')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.deep.equal({
                        "id": "1",
                        "name": "Gaby Coupar",
                        "avatar": "https://robohash.org/temporererumomnis.png?size=50x50\u0026set=set1",
                        "phone": "435-715-2899",
                        "email": "gcoupar0@rakuten.co.jp",
                    });
                    done();
                });
        });
    });
});

