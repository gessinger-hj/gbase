const chai = require("chai");
const expect = chai.expect;
// import sinon
const sinon = require("sinon");
const indexPage = require("../../controllers/app.controller.js");

const user = {
  addUser: (name) => {
    this.name = name;
  }
}

describe("AppController", function()  {
  describe("getIndexPage", function() {
    it("should send hey", function() {
      let req = {}
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
    });
  });
});
describe("User", function() {
  describe("addUser", function() {
    it("should add a user", function() {
      sinon.spy(user, "addUser");

      user.addUser('John Doe');

      // lets log `addUser` and see what we get
      // console.log(user.addUser);
      expect(user.addUser.calledOnce).to.be.true;
    });
  });
});