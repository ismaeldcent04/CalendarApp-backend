const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaihttp = require("chai-http");
const server = require("../index");
const User = require("../models/User");

chai.use(chaihttp);
let tokenAuth = "";
// describe("testing endpoint /api/auth/new", () => {
//   it("Deberia permitir crear usuario", (done) => {
//     let user = {
//       name: "Joseperez",
//       email: "josepere@gmail.com",
//       password: "123456898",
//     };
//     chai
//       .request("https://calendarapp-backend-5btm-dev.fl0.io")
//       .post("/api/auth/new")
//       .send(user)
//       .end((err, res) => {
//         res.should.have.status(201);
//       });
//     done();
//   });
// });

describe("testing endpoint /api/auth", () => {
  it("Deberia permitir iniciar sesion", (done) => {
    let user = {
      email: "ismadadi.26@gmail.com",
      password: "Hulk2604",
    };
    chai
      .request("https://calendarapp-backend-5btm-dev.fl000000000.io")
      .post("/api/auth")
      .send(user)
      .end((err, res) => {
        tokenAuth = res.body.token;
        console.log(tokenAuth);
        res.should.have.status(200);
      });

    done();
  });
});
