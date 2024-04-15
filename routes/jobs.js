const jsonschema = require("jsonschema");
const express = require("express");
const { ensureLoggedIn } = require("../middleware/auth");
const Job = require("../models/jobs");


const router = new express.Router();




router.post("/", ensureLoggedIn, async function (req, res, next) {
    try {
        const { title, description, company } = req.body;
        const job = new Job({ title, description, company });
        await job.save();
        res.status(201).json(job);
    } catch (err) {
      return next(err);
    }
  });


  router.get("/", async function (req, res, next) {
    try {
      const jobs = await Job.findAll();
      return res.json({ jobs });
    } catch (err) {
      return next(err);
    }
  });

  router.get("/:handle", async function (req, res, next) {
    try {
      const job = await Job.get(req.params.handle);
      return res.json({ job });
    } catch (err) {
      return next(err);
    }
  });

  router.patch("/:handle", ensureLoggedIn, async function (req, res, next) {
    try {
        const job = await Job.findByIdAndUpdate(req.params.handle, req.body, { new: true });
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.json(job);
    } catch (err) {
        return next(err);
    }
});


router.delete("/:handle", ensureLoggedIn, async function (req, res, next) {
        try {
        await Job.remove(req.params.handle);
        return res.json({ deleted: req.params.handle });
    } catch (err) {
        return next(err);
      }
    });


//Filtering

router.get('/jobs', async (req, res, next) => {
    try {
      const { title, minSalary, hasEquity } = req.query;
      const jobs = await Job.findAll(); 
      let filteredJobs = jobs.filter(job => {
        if (title && !jobs.title.toLowerCase().includes(title.toLowerCase())) {
          return false;
        }
        if (minSalary && jobs.minSalary < parseInt(minSalary)) {
          return false;
        }
        if (hasEquity && jobs.hasEquity > parseInt(hasEquity)) {
          return false;
        }
        return true;
       
      });
      console.log(title, minSalary, hasEquity)
      res.json(filteredJobs);
    } catch (err) {
      return next(err);
      
    }
  });




module.exports = router;