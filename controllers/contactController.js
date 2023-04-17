import expressAsyncHandler from "express-async-handler";
import Contact from "../models/contactModel.js";

// @des Get All The Contacts
// @route GET /api/contacts
// @access PRIVET
export const getallContacts = expressAsyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json({ message: "get all contacts", contacts });
});

// @des Create New Contact
// @route POST /api/contacts
// @access PRIVET
export const createContact = expressAsyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!!");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json({ message: "contact created successfully", contact });
});

// @des Get The Contact details by id
// @route GET /api/contacts/getdetails/:id
// @access PRIVET
export const getContactDetails = expressAsyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  console.log(contact, "rahul");
  if (!contact || contact.user_id.toString() !== req.user.id) {
    console.log("123");
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json({ message: `details for ${req.params.id}`, contact });
});

// @des Update The Contact
// @route PUT /api/contacts/updatecontact/:id
// @access PRIVET
export const updateContact = expressAsyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "Users don't have permissions to update other users contacts"
    );
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res
    .status(200)
    .json({ message: `Contact Updated for ${req.params.id}`, updatedContact });
});

// @des Delete The Contact
// @route Delete /api/contacts/deletecontact/:id
// @access PRIVET
export const deleteContact = expressAsyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "Users don't have permissions to delete other users contacts"
    );
  }

  await Contact.deleteOne({ _id: req.params.id });
  res
    .status(200)
    .json({ message: `Contact deleted for ${req.params.id}`, contact });
});
