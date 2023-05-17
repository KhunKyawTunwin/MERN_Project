const expect = require("chai");
const sinon = require("sinon");
const mongoose = require("mongoose");

const User = require("../models/user");
const AuthControllerr = require("../controllers/auth");

describe("Auth Controller - Login", (done) => {
  it("Should throw an error with code 500  if accessing the database fails", () => {
    sinon.stub(User, "findOne");

    User.findOne.throws();

    const req = {
      body: {
        email: "mrkhun@gmail.com",
        password: "mrkhun3",
      },
    };

    AuthControllerr.login(req, {}, () => {}).then((result) => {
      expect(result).to.be.an("error");
      expect(result).to.have.property("statusCode", 401);
      done();
    });

    User.findOne.restore();
  });

  it("Should send a response with a valid user status for an existing user", () => {
    mongoose
      .connect(
        "mongodb+srv://udemyproject:udemydb1009@cluster0.9gx2eko.mongodb.net/unittesting?retryWrites=true"
      )
      .then((result) => {
        const user = new User({
          email: "mrkhun@gmail.com",
          password: "mrkhun3",
          name: "mrKhun",
          post: [],
        });
        return user.save();
      })
      .then(() => {})
      .catch((err) => console.log(err));
  });
});
