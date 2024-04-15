
const request = require("supertest");

const db = require("../db");
const app = require("../app");



describe('GET / jobs', function (){
    test("Route responds", async function(){
        const resp = await request(app).get("/jobs");
        expect(resp.body).toEqual({
            jobs:
            [{
                id: "1",
                title: "job title", 
                minSalary: "45,000", 
                hasEquity: "yes",
                company_handle: "company37",
            }]
        })
    })

});

describe('GET //jobs/:id', function (){
    test("Route responds", async function(){
        const resp = await request(app).get("/jobs/:id");
        expect(resp.body).toEqual({
            jobs:
            [{
                id: "1",
                title: "job title", 
                minSalary: "45,000", 
                hasEquity: "True",
                company_handle: "company37",
            }]
        })
    })

});