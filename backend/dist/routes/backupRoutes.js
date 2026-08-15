"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const backupController_1 = require("../controllers/backupController");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.get('/export', auth_1.protect, backupController_1.exportDatabase);
router.post('/import', auth_1.protect, backupController_1.importDatabase);
exports.default = router;
