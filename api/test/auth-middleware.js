const { expect } = require("chai");
const jwt = require("jsonwebtoken");
const sinon = require("sinon");

const authMiddleware = require("../middleware/is-auth");

describe("Auth_Midddleware", () => {
  it("Should throw an error if no authorization header is present", () => {
    const req = {
      get: () => {
        return null;
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw(
      "Not authenticated."
    );
  });

  it("Should throw an error if the authorization header is only one string", () => {
    const req = {
      get: () => {
        return "ourtokeninproject";
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();

    // actually here must not throw error because if our token is Provided. (expect also must not.to.throw())
  });

  it("Should throw an error if the token cannot be verified", () => {
    const req = {
      get: () => {
        return "Bearer ourtokeninproject";
      },
    };
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  });

  it("Should yield a userId after decoding the token", () => {
    const req = {
      get: () => {
        return "Bearer 29ndjd$%93738jhsd/399929"; // real return token from generate!
      },
    };
    jwt.verify = () => {
      return { userId: "ourtokeninproject" };
    };
    authMiddleware(req, {}, () => {});
    expect(req).to.have.property("userId");
  });

  it("Should throw an error if the token cannot be verified", () => {
    const req = {
      get: () => {
        return "Bearer 29ndjd$%93738jhsd/399929";
      },
    };
  });
});

// Import the middleware function
