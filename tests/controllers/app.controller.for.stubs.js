const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;
// import sinon
const sinon = require("sinon");
const indexPage = require("../../controllers/app.controller.for.stubs.js");

describe("AppController", function()  {
  describe("getIndexPage", () => {
    it("should send hey when user is logged in", function() {
      // instantiate a user object with an empty isLoggedIn function
      let user = {
        isLoggedIn: function(){}
      }

      // Stub isLoggedIn function and make it return true always
      const isLoggedInStub = sinon.stub(user, "isLoggedIn").returns(true);

      // pass user into the req object
      let req = {
        user: user
      }

      // Have `res` have a send key with a function value coz we use `res.send()` in our func
      let res = {
        // replace empty function with a spy
        send: sinon.spy()
      }

      indexPage.getIndexPage(req, res);
      // let's see what we get on res.send
      // console.log(res.send);
      // `res.send` called once
      expect(res.send.calledOnce).to.be.true;
      expect(res.send.firstCall.args[0]).to.equal("Hey");

      // assert that the stub is logged in at least once
      expect(isLoggedInStub.calledOnce).to.be.true;
      assert.equal(isLoggedInStub.calledOnce,true,"The method isLoggedIn should be called once");
    });
  });
});