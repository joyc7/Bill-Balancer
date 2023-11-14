const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); 
const expect = chai.expect;

chai.use(chaiHttp);

describe('Add Expense API', () => {
    describe('POST /add-expense', () => {
        it('should return a success response', (done) => {
            let postData = {
                name: "Flights",
                amount: 100,
                date: "2023-11-13",
                personPaid: "Jane",
                peopleSplit: ["Jane", "Jack"],
                splitMethod: "equal",
                amountDetails: { "Jane": 50, "Jack": 50 }
            };

            chai.request(app)
                .post('/add-expense')
                .send(postData)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body).to.have.property('status', 'Success');
                    expect(res.body).to.have.property('message');
                    expect(res.body.data).to.deep.equal(postData);
                    done();
                });
        });
    });
});
