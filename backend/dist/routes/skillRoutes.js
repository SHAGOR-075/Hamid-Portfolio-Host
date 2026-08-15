"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const skillController_1 = require("../controllers/skillController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.route('/')
    .get(skillController_1.getSkills)
    .post(auth_1.protect, skillController_1.createSkill)
    .put(auth_1.protect, skillController_1.reorderSkills);
router.route('/:id')
    .put(auth_1.protect, skillController_1.updateSkill)
    .delete(auth_1.protect, skillController_1.deleteSkill);
exports.default = router;
