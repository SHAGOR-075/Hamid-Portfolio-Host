"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const educationController_1 = require("../controllers/educationController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.route('/')
    .get(educationController_1.getEducation)
    .post(auth_1.protect, educationController_1.createEducation)
    .put(auth_1.protect, educationController_1.saveAllEducation);
router.route('/:id')
    .put(auth_1.protect, educationController_1.updateEducation)
    .delete(auth_1.protect, educationController_1.deleteEducation);
exports.default = router;
