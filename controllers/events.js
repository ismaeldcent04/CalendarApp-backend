const { response } = require("express");
const mongoose = require("mongoose");
const Event = require("../models/Event");

const getEvents = async (req, res = response) => {
  const events = Event.find();

  res.json({
    ok: true,
    events,
  });
};

const createEvents = async (req, res = response) => {
  const event = new Event(req.body);

  try {
    event.user = req.uid;
    const savedEvent = await event.save();

    res.json({
      ok: true,
      event: savedEvent,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const updateEvents = async (req, res = response) => {
  const eventId = req.params.id;
  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(500).json({
        ok: false,
        msg: "Event does not exist with that id",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "You are not authorized",
      });
    }

    const newEvent = {
      ...req.body,
      user: uid,
    };

    const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, {
      new: true,
    });

    res.json({
      ok: true,
      event: eventUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Talk to the admin",
    });
  }
};

const deleteEvents = async (req, res = response) => {
  const eventId = req.params.id;

  const uid = req.uid;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(500).json({
        ok: false,
        msg: "Event does not exist with that id",
      });
    }

    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "You are not authorized",
      });
    }

    const deletedEvent = await Event.findByIdAndDelete(eventId);
    res.json({
      ok: true,
      deletedEvent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Talk to the admin",
    });
  }
};

module.exports = {
  getEvents,
  createEvents,
  updateEvents,
  deleteEvents,
};
