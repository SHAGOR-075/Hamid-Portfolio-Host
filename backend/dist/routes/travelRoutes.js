"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const travelController_1 = require("../controllers/travelController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.route('/')
    .get(travelController_1.getTravelPosts)
    .post(auth_1.protect, travelController_1.createTravelPost)
    .put(auth_1.protect, travelController_1.saveAllTravelPosts);
router.route('/:id')
    .get(travelController_1.getTravelPostById)
    .put(auth_1.protect, travelController_1.updateTravelPost)
    .delete(auth_1.protect, travelController_1.deleteTravelPost);
exports.default = router;
