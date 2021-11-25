const app = require("../bin/appTest");
const request = require("supertest");

let response = {status: '001', statusCode: 'OK/NOK'}

let Warrior = [{
    id: 1,
    name: 'Warior',
    attack: 100,
    defence: 50,
    agility: 30,
    magic: 0
  }]

let newJob = {
    id: 3,
    name: 'Archer',
    attack: 30,
    defence: 15,
    agility: 75,
    magic: 97,
}

let updateNewJob = {
    id: 1,
    name: 'Warior',
    attack: 0,
    defence: 0,
    agility: 0,
    magic: 0
}

describe("Jobs Query", () => {
    it("Test Rest", (done) => {
    request(app)
        .get("/")
        .set("Content-type", "application/json")
        .then((res) => {
            expect(res.status).toEqual(200);
            expect(res.text).toEqual("Hello World");
            done()
        })
        .catch((err) => done(err));
    });

    it("Get Jobs", (done) => {
    request(app)
        .get("/jobs")
        .set("Content-type", "application/json")
        .then((res) =>{
            expect(res.status).toEqual(200);
            expect(res.text.response).toEqual(response);
            done()
        })
        .catch((err) => done(err));
    });

    it("Get Job's Name", (done) => {
    request(app)
        .get("/jobs/Warior")
        .set("Content-type", "application/json")
        .then((res) =>{
            expect(res.status).toEqual(200);
            expect(res.body).toEqual(Warrior)
            done()
        })
        .catch((err) => done(err));
    });

    it("Insert New Jobs", (done) => {
    request(app)
        .post("/newjobs")
        .set("Content-type", "application/json")
        .send({
            variables: newJob, 
        })
        .then((res) =>{
            expect(res.status).toEqual(200);
            expect(res.body).toEqual({"id": 3})
            done()
        })
        .catch((err) => done(err));
    })

    it("Update New Jobs", (done) => {
    request(app)
        .put("/updatejobs/Warior")
        .set("Content-type", "application/json")
        .send(updateNewJob)
        .then((res) =>{
            console.log(res.body)
            expect(res.status).toEqual(200);
            done()
        })
        .catch((err) => done(err));
    })

    it("Delete Job", (done) => {
    request(app)
        .delete("/jobs/Mage")
        .set("Content-type", "application/json")
        .then((res) =>{
            // console.log(res)
            expect(res.status).toEqual(200);
            done()
        })
        .catch((err) => done(err));
    });
});