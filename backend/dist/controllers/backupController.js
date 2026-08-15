"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.importDatabase = exports.exportDatabase = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const User_1 = require("../models/User");
const Home_1 = require("../models/Home");
const About_1 = require("../models/About");
const Skill_1 = require("../models/Skill");
const Education_1 = require("../models/Education");
const Project_1 = require("../models/Project");
const Travel_1 = require("../models/Travel");
const Social_1 = require("../models/Social");
const ContactInfo_1 = require("../models/ContactInfo");
const ContactMessage_1 = require("../models/ContactMessage");
const Settings_1 = require("../models/Settings");
// @desc    Export entire MongoDB database to JSON
// @route   GET /api/backup/export
// @access  Private (Admin)
exports.exportDatabase = (0, express_async_handler_1.default)(async (req, res) => {
    const user = await User_1.User.findOne().select('-password');
    const home = await Home_1.Home.findOne();
    const about = await About_1.About.findOne();
    const skills = await Skill_1.Skill.find().sort({ order: 1 });
    const education = await Education_1.Education.find().sort({ order: 1 });
    const projects = await Project_1.Project.find().sort({ order: 1 });
    const travel = await Travel_1.Travel.find().sort({ order: 1 });
    const socials = await Social_1.Social.find().sort({ order: 1 });
    const contact = await ContactInfo_1.ContactInfo.findOne();
    const contactMessages = await ContactMessage_1.ContactMessage.find().sort({ createdAt: -1 });
    const settings = await Settings_1.Settings.findOne();
    const backup = {
        user,
        home,
        about,
        skills,
        education,
        projects,
        travel,
        socials,
        contact,
        contactMessages,
        settings,
        exportedAt: new Date().toISOString(),
        version: '1.0.0',
    };
    res.json(backup);
});
// @desc    Import database JSON backup
// @route   POST /api/backup/import
// @access  Private (Admin)
exports.importDatabase = (0, express_async_handler_1.default)(async (req, res) => {
    const data = req.body;
    if (!data) {
        res.status(400);
        throw new Error('No JSON backup data provided');
    }
    if (data.home) {
        await Home_1.Home.deleteMany({});
        await Home_1.Home.create(data.home);
    }
    if (data.about) {
        await About_1.About.deleteMany({});
        await About_1.About.create(data.about);
    }
    if (data.skills && Array.isArray(data.skills)) {
        await Skill_1.Skill.deleteMany({});
        await Skill_1.Skill.insertMany(data.skills);
    }
    if (data.education && Array.isArray(data.education)) {
        await Education_1.Education.deleteMany({});
        await Education_1.Education.insertMany(data.education);
    }
    if (data.projects && Array.isArray(data.projects)) {
        await Project_1.Project.deleteMany({});
        await Project_1.Project.insertMany(data.projects);
    }
    if (data.travel && Array.isArray(data.travel)) {
        await Travel_1.Travel.deleteMany({});
        await Travel_1.Travel.insertMany(data.travel);
    }
    if (data.socials && Array.isArray(data.socials)) {
        await Social_1.Social.deleteMany({});
        await Social_1.Social.insertMany(data.socials);
    }
    if (data.contact) {
        await ContactInfo_1.ContactInfo.deleteMany({});
        await ContactInfo_1.ContactInfo.create(data.contact);
    }
    if (data.contactMessages && Array.isArray(data.contactMessages)) {
        await ContactMessage_1.ContactMessage.deleteMany({});
        await ContactMessage_1.ContactMessage.insertMany(data.contactMessages);
    }
    if (data.settings) {
        await Settings_1.Settings.deleteMany({});
        await Settings_1.Settings.create(data.settings);
    }
    res.json({ message: 'Database imported successfully' });
});
