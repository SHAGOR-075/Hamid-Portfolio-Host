"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const aboutController_1 = require("../controllers/aboutController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.route('/')
    .get(aboutController_1.getAboutData)
    .put(auth_1.protect, aboutController_1.updateAboutData);
exports.default = router;
