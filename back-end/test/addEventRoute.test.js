const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); 
const expect = chai.expect;

chai.use(chaiHttp);

describe('Add Event API', () => {
    describe('POST /addEvent', () => {
        it('should return a success response', (done) => {
            let submitData = {
                eventName: "Puertorico",
                Date: "2023-03-23",
                Description: "March Break with friends",
                Members: ["Stephanie", "Alice", "Frank"],
            };

            chai.request(app)
                .post('/addEvent')
                .send(submitData)
                .end((err, res) => {
                    expect(err).to.be.null
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('status', 'Success');
                    expect(res.body).to.have.property('message');
                    expect(res.body.data).to.deep.equal(submitData);
                    done();
                });
        });
    });
});
