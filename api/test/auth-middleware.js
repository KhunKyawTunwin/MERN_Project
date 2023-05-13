const expect = require("chai").expect;
//
const authMiddleware = require("../middleware/is-auth");
//
// it("Should throw an error if no authorization header is present", function () {
//   const req = {
//     get: function (headerName) {
//       return null;
//     },
//   };
//
//   expect(
//     authMiddleware.bind(this, req, {}, () => {
//       "Not authenticated.";
//     })
//   );
// });

// Import the middleware function
