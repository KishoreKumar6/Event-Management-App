import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  try {
    const { name, date, location, description, price, ticketsAvailable } =
      req.body;

    const imagePath = req.file ? `/uploads/${req.file.filename}` : ""; // handle uploaded image

    const event = await Event.create({
      name,
      image: imagePath,
      date,
      location,
      description,
      price,
      ticketsAvailable,
    });

    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getEvents = async (req, res) => {
  const events = await Event.find();
  res.json(events);
};

export const deleteEvent = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Event deleted" });
};

export const updateEvent = async (req, res) => {
  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedEvent);
};

export const singleEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
