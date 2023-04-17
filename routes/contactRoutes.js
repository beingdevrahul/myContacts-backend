import express from "express";
import {
  createContact,
  deleteContact,
  getallContacts,
  getContactDetails,
  updateContact,
} from "../controllers/contactController.js";
import validateToken from "../middleware/validateTokenHandler.js";

const router = express.Router();

router.use(validateToken);
//get all contacts && create contact
router.route("/").get(getallContacts).post(createContact);

//get contact details by id
router.route("/getdetails/:id").get(getContactDetails);

//update contact
router.route("/updatecontact/:id").put(updateContact);

//delete contact
router.route("/deletecontact/:id").delete(deleteContact);


export default router;
