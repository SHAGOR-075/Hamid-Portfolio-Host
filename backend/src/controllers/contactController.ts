import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { ContactInfo } from '../models/ContactInfo';
import { ContactMessage } from '../models/ContactMessage';
import { buildIdQuery } from '../utils/buildIdQuery';
import { isValidEmail, sendContactNotificationEmail } from '../utils/sendEmail';

// @desc    Get Contact Info details
// @route   GET /api/contact
// @access  Public
export const getContactInfo = asyncHandler(async (req: Request, res: Response) => {
  const contact = await ContactInfo.findOne();
  if (!contact) {
    res.status(404);
    throw new Error('Contact information not found');
  }
  res.json(contact);
});

// @desc    Update Contact Info
// @route   PUT /api/contact
// @access  Private (Admin)
export const updateContactInfo = asyncHandler(async (req: Request, res: Response) => {
  let contact = await ContactInfo.findOne();
  if (contact) {
    Object.assign(contact, req.body);
    const updated = await contact.save();
    res.json(updated);
  } else {
    const created = await ContactInfo.create(req.body);
    res.status(201).json(created);
  }
});

// @desc    Submit new message from public contact form & dispatch email notification
// @route   POST /api/contact/messages
// @access  Public
export const submitContactMessage = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !subject || !message) {
    res.status(400);
    throw new Error('Please fill in all required fields (name, email, subject, message)');
  }

  if (!isValidEmail(email)) {
    res.status(400);
    throw new Error('Please enter a valid email address (e.g. name@domain.com)');
  }

  const customId = `msg_${Date.now()}`;
  const newMessage = await ContactMessage.create({
    customId,
    name: name.trim(),
    email: email.trim(),
    subject: subject.trim(),
    message: message.trim(),
    status: 'unread',
    starred: false,
  });

  const emailSent = await sendContactNotificationEmail({
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
export const getContactMessages = asyncHandler(async (req: Request, res: Response) => {
  const messages = await ContactMessage.find().sort({ createdAt: -1 });
  res.json(messages);
});

// @desc    Update message status or starred state
// @route   PATCH /api/contact/messages/:id
// @access  Private (Admin)
export const updateContactMessageStatus = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  let msg = await ContactMessage.findOne(buildIdQuery(id));
  if (!msg) {
    res.status(404);
    throw new Error('Message not found');
  }

  if (req.body.status !== undefined) msg.status = req.body.status;
  if (req.body.starred !== undefined) msg.starred = req.body.starred;

  const updated = await msg.save();
  res.json(updated);
});

// @desc    Delete contact message
// @route   DELETE /api/contact/messages/:id
// @access  Private (Admin)
export const deleteContactMessage = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const msg = await ContactMessage.findOneAndDelete(buildIdQuery(id));
  if (!msg) {
    res.status(404);
    throw new Error('Message not found');
  }
  res.json({ message: 'Message deleted successfully', id });
});
