"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socialController_1 = require("../controllers/socialController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.route('/')
    .get(socialController_1.getSocialLinks)
    .post(auth_1.protect, socialController_1.createSocialLink)
    .put(auth_1.protect, socialController_1.saveAllSocialLinks);
router.route('/:id')
    .put(auth_1.protect, socialController_1.updateSocialLink)
    .delete(auth_1.protect, socialController_1.deleteSocialLink);
exports.default = router;
