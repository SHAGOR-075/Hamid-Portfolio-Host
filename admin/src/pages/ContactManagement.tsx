import React, { useEffect, useState } from 'react';
import { PageHeader } from '../components/common/PageHeader';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Textarea } from '../components/common/Textarea';
import { Modal } from '../components/common/Modal';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { EmptyState } from '../components/common/EmptyState';
import { storage } from '../services/storage';
import { contactService } from '../services/socialService';
import { ContactData, ContactMessage } from '../types';
import { formatDate } from '../lib/utils';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Save,
  Inbox,
  Star,
  Trash2,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Send,
} from 'lucide-react';
import toast from 'react-hot-toast';

export const ContactManagement: React.FC = () => {
  const [contactInfo, setContactInfo] = useState<ContactData | null>(null);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Message Detail Modal
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);

  // Delete message modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<ContactMessage | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await contactService.getContactData();
      const msgs = await contactService.getContactMessages();
      setContactInfo(data);
      setMessages(msgs);
      setIsLoading(false);
    };
    load();
  }, []);

  const handleSaveContactInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInfo) return;
    setIsSaving(true);
    try {
      await contactService.updateContactData(contactInfo);
      toast.success('Contact section information updated');
    } catch {
      toast.error('Failed to update contact info');
    } finally {
      setIsSaving(false);
    }
  };

  const handleViewMessage = async (msg: ContactMessage) => {
    setSelectedMessage(msg);
    setDetailModalOpen(true);
    if (msg.status === 'unread') {
      const updated = await contactService.updateContactMessage(msg.id, { status: 'read' });
      setMessages(messages.map((m) => (m.id === msg.id ? { ...m, status: 'read' } : m)));
    }
  };

  const handleToggleStar = async (msgId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = messages.find((m) => m.id === msgId);
    if (!msg) return;
    const nextStarred = !msg.starred;
    setMessages(messages.map((m) => (m.id === msgId ? { ...m, starred: nextStarred } : m)));
    await contactService.updateContactMessage(msgId, { starred: nextStarred });
  };

  const confirmDeleteMessage = async () => {
    if (!messageToDelete) return;
    await contactService.deleteContactMessage(messageToDelete.id);
    setMessages(messages.filter((m) => m.id !== messageToDelete.id));
    setDeleteModalOpen(false);
    setMessageToDelete(null);
    toast.success('Message deleted');
  };

  if (isLoading || !contactInfo) {
    return <div className="p-8 text-center text-zinc-500">Loading Contact CMS...</div>;
  }

  const unreadCount = messages.filter((m) => m.status === 'unread').length;

  return (
    <div className="space-y-6 text-left">
      <PageHeader
        title="Contact & Inbound Inquiries"
        subtitle="Configure your direct reach-out channels, response promises, and inspect received client inquiries."
        badge="Contact & Inbox"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Contact Section Configuration */}
        <div className="lg:col-span-6 space-y-6">
          <form
            onSubmit={handleSaveContactInfo}
            className="p-6 rounded-2xl bg-white dark:bg-[#0B1511] border border-zinc-200 dark:border-zinc-800/80 shadow-xs space-y-5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800/80">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-emerald-500" />
                <h2 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                  Public Contact Section Details
                </h2>
              </div>
              <Button type="submit" size="sm" isLoading={isSaving} leftIcon={<Save className="w-4 h-4" />}>
                Save Info
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Section Badge"
                value={contactInfo.badge}
                onChange={(e) => setContactInfo({ ...contactInfo, badge: e.target.value })}
                placeholder="GET IN TOUCH"
              />
              <Input
                label="Section Title"
                value={contactInfo.title}
                onChange={(e) => setContactInfo({ ...contactInfo, title: e.target.value })}
                placeholder="Let's Build Something Intelligent"
              />
            </div>

            <Textarea
              label="Contact Description"
              value={contactInfo.description}
              onChange={(e) => setContactInfo({ ...contactInfo, description: e.target.value })}
              rows={2}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Direct Email Address"
                type="email"
                value={contactInfo.email}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                placeholder="shagor.cse.ml@gmail.com"
                leftIcon={<Mail className="w-4 h-4" />}
                required
              />
              <Input
                label="Phone / WhatsApp"
                value={contactInfo.phone || ''}
                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                placeholder="+880 1700-000000"
                leftIcon={<Phone className="w-4 h-4" />}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Location Coordinates / City"
                value={contactInfo.location}
                onChange={(e) => setContactInfo({ ...contactInfo, location: e.target.value })}
                placeholder="Dhaka & Sylhet, Bangladesh"
                leftIcon={<MapPin className="w-4 h-4" />}
              />
              <Input
                label="Response Time Guarantee"
                value={contactInfo.responseTime}
                onChange={(e) =>
                  setContactInfo({ ...contactInfo, responseTime: e.target.value })
                }
                placeholder="Usually responds within 24 hours"
                leftIcon={<Clock className="w-4 h-4" />}
              />
            </div>
          </form>
        </div>

        {/* Right Column: Inbound Messages Inbox */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-zinc-200 dark:border-zinc-800/80">
            <div className="flex items-center gap-2">
              <Inbox className="w-5 h-5 text-emerald-500" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                Inbound Messages Inbox ({messages.length})
              </h2>
            </div>
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-500">
                {unreadCount} Unread
              </span>
            )}
          </div>

          {messages.length === 0 ? (
            <EmptyState
              icon={<MessageSquare className="w-8 h-8" />}
              title="No Inquiries Yet"
              description="When visitors submit questions via your public portfolio contact form, they will appear in this inbox."
            />
          ) : (
            <div className="space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  onClick={() => handleViewMessage(msg)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    msg.status === 'unread'
                      ? 'bg-emerald-500/5 dark:bg-emerald-950/20 border-emerald-500/40'
                      : 'bg-white dark:bg-[#0B1511] border-zinc-200 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {msg.status === 'unread' && (
                          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                        )}
                        <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
                          {msg.name}
                        </h4>
                        <span className="text-xs text-zinc-400 font-mono">
                          • {msg.email}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 truncate">
                        {msg.subject}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                        {msg.message}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="text-[11px] text-zinc-400">
                        {formatDate(msg.createdAt)}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={(e) => handleToggleStar(msg.id, e)}
                          className={`p-1 rounded transition-colors ${
                            msg.starred
                              ? 'text-amber-400'
                              : 'text-zinc-400 hover:text-amber-400'
                          }`}
                          title="Star message"
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setMessageToDelete(msg);
                            setDeleteModalOpen(true);
                          }}
                          className="p-1 rounded text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                          title="Delete message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Message View Modal */}
      <Modal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        title={selectedMessage?.subject || 'Inquiry Detail'}
        description={`From ${selectedMessage?.name} (${selectedMessage?.email}) on ${
          selectedMessage ? formatDate(selectedMessage.createdAt) : ''
        }`}
        maxWidth="lg"
      >
        {selectedMessage && (
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-[#07100C] border border-zinc-200 dark:border-zinc-800 space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-400 pb-2 border-b border-zinc-200 dark:border-zinc-800">
                <span>Sender: <strong>{selectedMessage.name}</strong></span>
                <span>Email: <strong className="text-emerald-500">{selectedMessage.email}</strong></span>
              </div>
              <p className="text-sm text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap leading-relaxed pt-2">
                {selectedMessage.message}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  storage.updateContactMessage(selectedMessage.id, {
                    status: selectedMessage.status === 'replied' ? 'read' : 'replied',
                  });
                  setMessages(
                    messages.map((m) =>
                      m.id === selectedMessage.id
                        ? {
                            ...m,
                            status: m.status === 'replied' ? 'read' : 'replied',
                          }
                        : m
                    )
                  );
                  setDetailModalOpen(false);
                  toast.success('Status updated');
                }}
              >
                Mark as {selectedMessage.status === 'replied' ? 'Read' : 'Replied'}
              </Button>

              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(
                  selectedMessage.subject
                )}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition-colors shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                Reply via Email
              </a>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Message Confirm */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteMessage}
        title="Delete Message?"
        message={`Are you sure you want to permanently remove inquiry from ${messageToDelete?.name}?`}
      />
    </div>
  );
};
