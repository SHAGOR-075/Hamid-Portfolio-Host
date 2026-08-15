"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (id) => {
    const secret = process.env.JWT_SECRET || 'shagor_portfolio_jwt_secret_key_2026_super_secure';
    const expiresIn = process.env.JWT_EXPIRE || '30d';
    return jsonwebtoken_1.default.sign({ id }, secret, {
        expiresIn: expiresIn,
    });
};
exports.generateToken = generateToken;
