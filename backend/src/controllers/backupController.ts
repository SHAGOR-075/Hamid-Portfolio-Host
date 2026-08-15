import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { User } from '../models/User';
import { Home } from '../models/Home';
import { About } from '../models/About';
import { Skill } from '../models/Skill';
import { Education } from '../models/Education';
import { Project } from '../models/Project';
import { Travel } from '../models/Travel';
import { Social } from '../models/Social';
import { ContactInfo } from '../models/ContactInfo';
import { ContactMessage } from '../models/ContactMessage';
import { Settings } from '../models/Settings';

// @desc    Export entire MongoDB database to JSON
// @route   GET /api/backup/export
// @access  Private (Admin)
export const exportDatabase = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findOne().select('-password');
  const home = await Home.findOne();
  const about = await About.findOne();
  const skills = await Skill.find().sort({ order: 1 });
  const education = await Education.find().sort({ order: 1 });
  const projects = await Project.find().sort({ order: 1 });
  const travel = await Travel.find().sort({ order: 1 });
  const socials = await Social.find().sort({ order: 1 });
  const contact = await ContactInfo.findOne();
  const contactMessages = await ContactMessage.find().sort({ createdAt: -1 });
  const settings = await Settings.findOne();

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
export const importDatabase = asyncHandler(async (req: Request, res: Response) => {
  const data = req.body;
  if (!data) {
    res.status(400);
    throw new Error('No JSON backup data provided');
  }

  if (data.home) {
    await Home.deleteMany({});
    await Home.create(data.home);
  }
  if (data.about) {
    await About.deleteMany({});
    await About.create(data.about);
  }
  if (data.skills && Array.isArray(data.skills)) {
    await Skill.deleteMany({});
    await Skill.insertMany(data.skills);
  }
  if (data.education && Array.isArray(data.education)) {
    await Education.deleteMany({});
    await Education.insertMany(data.education);
  }
  if (data.projects && Array.isArray(data.projects)) {
    await Project.deleteMany({});
    await Project.insertMany(data.projects);
  }
  if (data.travel && Array.isArray(data.travel)) {
    await Travel.deleteMany({});
    await Travel.insertMany(data.travel);
  }
  if (data.socials && Array.isArray(data.socials)) {
    await Social.deleteMany({});
    await Social.insertMany(data.socials);
  }
  if (data.contact) {
    await ContactInfo.deleteMany({});
    await ContactInfo.create(data.contact);
  }
  if (data.contactMessages && Array.isArray(data.contactMessages)) {
    await ContactMessage.deleteMany({});
    await ContactMessage.insertMany(data.contactMessages);
  }
  if (data.settings) {
    await Settings.deleteMany({});
    await Settings.create(data.settings);
  }

  res.json({ message: 'Database imported successfully' });
});
