const express = require("express");
const router = express.Router();
const Director = require("../models/Director");

router.post("/", async (req, res) => {
    try {
        const director = new Director(req.body);
        const savedDirector = await director.save();
        res.status(201).json(savedDirector);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/", async (req, res) => {
    try {
        const directors = await Director.find();
        res.json(directors);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const director = await Director.findById(req.params.id);
        if (!director) throw Error("Director not found");
        res.json(director);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const director = await Director.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!director) throw Error("Director not found");
        res.json(director);
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const director = await Director.findByIdAndDelete(req.params.id);
        if (!director) throw Error("Director not found");
        res.json({ message: "Director deleted" });
    } catch (err) {
        res.status(404).json({ error: err.message });
    }
});

module.exports = router;
