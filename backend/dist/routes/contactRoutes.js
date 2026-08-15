"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contactController_1 = require("../controllers/contactController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
// Info routes
router.route('/')
    .get(contactController_1.getContactInfo)
    .put(auth_1.protect, contactController_1.updateContactInfo);
// Message inbox routes
router.route('/messages')
    .get(auth_1.protect, contactController_1.getContactMessages)
    .post(contactController_1.submitContactMessage);
router.route('/messages/:id')
    .patch(auth_1.protect, contactController_1.updateContactMessageStatus)
    .delete(auth_1.protect, contactController_1.deleteContactMessage);
exports.default = router;
