"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContactMessage = exports.updateContactMessageStatus = exports.getContactMessages = exports.submitContactMessage = exports.updateContactInfo = exports.getContactInfo = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const ContactInfo_1 = require("../models/ContactInfo");
const ContactMessage_1 = require("../models/ContactMessage");
const buildIdQuery_1 = require("../utils/buildIdQuery");
const sendEmail_1 = require("../utils/sendEmail");
// @desc    Get Contact Info details
// @route   GET /api/contact
// @access  Public
exports.getContactInfo = (0, express_async_handler_1.default)(async (req, res) => {
    const contact = await ContactInfo_1.ContactInfo.findOne();
    if (!contact) {
        res.status(404);
        throw new Error('Contact information not found');
    }
    res.json(contact);
});
// @desc    Update Contact Info
// @route   PUT /api/contact
// @access  Private (Admin)
exports.updateContactInfo = (0, express_async_handler_1.default)(async (req, res) => {
    let contact = await ContactInfo_1.ContactInfo.findOne();
    if (contact) {
        Object.assign(contact, req.body);
        const updated = await contact.save();
        res.json(updated);
    }
    else {
        const created = await ContactInfo_1.ContactInfo.create(req.body);
        res.status(201).json(created);
    }
});
// @desc    Submit new message from public contact form & dispatch email notification
// @route   POST /api/contact/messages
// @access  Public
exports.submitContactMessage = (0, express_async_handler_1.default)(async (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
        res.status(400);
        throw new Error('Please fill in all required fields (name, email, subject, message)');
    }
    if (!(0, sendEmail_1.isValidEmail)(email)) {
        res.status(400);
        throw new Error('Please enter a valid email address (e.g. name@domain.com)');
    }
    const customId = `msg_${Date.now()}`;
    const newMessage = await ContactMessage_1.ContactMessage.create({
        customId,
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        status: 'unread',
        starred: false,
    });
    const emailSent = await (0, sendEmail_1.sendContactNotificationEmail)({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
    });
    res.status(201).json({
        ...newMessage.toObject(),
        emailSent,
        message: emailSent
            ? 'Message received and email notification sent successfully.'
            : 'Message received. Email notification could not be sent right now.',
    });
});
// @desc    Get all contact messages
// @route   GET /api/contact/messages
// @access  Private (Admin)
exports.getContactMessages = (0, express_async_handler_1.default)(async (req, res) => {
    const messages = await ContactMessage_1.ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
});
// @desc    Update message status or starred state
// @route   PATCH /api/contact/messages/:id
// @access  Private (Admin)
exports.updateContactMessageStatus = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    let msg = await ContactMessage_1.ContactMessage.findOne((0, buildIdQuery_1.buildIdQuery)(id));
    if (!msg) {
        res.status(404);
        throw new Error('Message not found');
    }
    if (req.body.status !== undefined)
        msg.status = req.body.status;
    if (req.body.starred !== undefined)
        msg.starred = req.body.starred;
    const updated = await msg.save();
    res.json(updated);
});
// @desc    Delete contact message
// @route   DELETE /api/contact/messages/:id
// @access  Private (Admin)
exports.deleteContactMessage = (0, express_async_handler_1.default)(async (req, res) => {
    const { id } = req.params;
    const msg = await ContactMessage_1.ContactMessage.findOneAndDelete((0, buildIdQuery_1.buildIdQuery)(id));
    if (!msg) {
        res.status(404);
        throw new Error('Message not found');
    }
    res.json({ message: 'Message deleted successfully', id });
});
