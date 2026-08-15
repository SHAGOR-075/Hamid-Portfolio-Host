"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const homeController_1 = require("../controllers/homeController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.route('/')
    .get(homeController_1.getHomeData)
    .put(auth_1.protect, homeController_1.updateHomeData);
exports.default = router;
