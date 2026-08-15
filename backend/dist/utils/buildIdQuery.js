"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildIdQuery = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const buildIdQuery = (id) => {
    if (mongoose_1.default.Types.ObjectId.isValid(id) && id.length === 24) {
        return { $or: [{ _id: id }, { customId: id }] };
    }
    return { customId: id };
};
exports.buildIdQuery = buildIdQuery;
