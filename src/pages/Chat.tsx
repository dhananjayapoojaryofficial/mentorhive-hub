import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import {
  Search,
  Send,
  Paperclip,
  MoreVertical,
  Phone,
  Video,
  Circle,
  CalendarCheck,
  ChevronRight,
  CheckCheck,
  Check,
  Smile,
  X,
  Info,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

/* ─────────────── Types ─────────────── */
type MessageType = "text" | "session-clarification";
type MessageStatus = "sent" | "delivered" | "read";

interface SessionCard {
  title: string;
  date: string;
  time: string;
  question: string;
}

interface Message {
  id: string;
  sender: "me" | "them";
  type: MessageType;
  text?: string;
  session?: SessionCard;
  timestamp: string;
  status?: MessageStatus;
}

interface Conversation {
  id: string;
  name: string;
  role: "Mentor" | "Learner";
  skill: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  online: boolean;
  initials: string;
  color: string;
  messages: Message[];
}

/* ─────────────── Mock Data ─────────────── */
const initialConversations: Conversation[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Mentor",
    skill: "React / Frontend",
    lastMessage: "Sure! Let's go over Hooks in our next session.",
    lastTime: "10:42 AM",
    unread: 2,
    online: true,
    initials: "SC",
    color: "bg-violet-500",
    messages: [
      { id: "m1", sender: "me", type: "text", text: "Hi Sarah! Quick question about useCallback vs useMemo.", timestamp: "10:30 AM", status: "read" },
      { id: "m2", sender: "them", type: "text", text: "Hey! Great question. useCallback memoizes a function reference, while useMemo memoizes a computed value. They're both performance optimizations but serve different purposes.", timestamp: "10:33 AM" },
      { id: "m3", sender: "me", type: "text", text: "Oh got it! So useMemo returns a value and useCallback returns a function?", timestamp: "10:35 AM", status: "read" },
      { id: "m4", sender: "them", type: "text", text: "Exactly! You only want to use them when the computation or callback is expensive though. Premature optimization can hurt readability.", timestamp: "10:37 AM" },
      {
        id: "m5",
        sender: "me",
        type: "session-clarification",
        session: {
          title: "React Advanced Patterns",
          date: "Feb 25, 2026",
          time: "10:00 AM",
          question: "Can we dedicate the first 15 minutes to Hooks deep-dive? Specifically useReducer and custom hooks.",
        },
        timestamp: "10:40 AM",
        status: "read",
      },
      { id: "m6", sender: "them", type: "text", text: "Sure! Let's go over Hooks in our next session.", timestamp: "10:42 AM" },
    ],
  },
  {
    id: "2",
    name: "Marcus Johnson",
    role: "Mentor",
    skill: "UI/UX Design",
    lastMessage: "I've shared the Figma file in the session notes.",
    lastTime: "Yesterday",
    unread: 0,
    online: true,
    initials: "MJ",
    color: "bg-sky-500",
    messages: [
      { id: "m1", sender: "them", type: "text", text: "Hey! Ready for our UI/UX Review session tomorrow?", timestamp: "Yesterday 2:00 PM" },
      { id: "m2", sender: "me", type: "text", text: "Yes! Should I prepare anything specific?", timestamp: "Yesterday 2:05 PM", status: "read" },
      { id: "m3", sender: "them", type: "text", text: "Bring 2–3 screens you've designed. We'll do a critique and improve them together.", timestamp: "Yesterday 2:08 PM" },
      {
        id: "m4",
        sender: "me",
        type: "session-clarification",
        session: {
          title: "UI/UX Design Review",
          date: "Feb 27, 2026",
          time: "2:00 PM",
          question: "Should I bring mobile or web designs? Also, is Figma required or can I use Adobe XD?",
        },
        timestamp: "Yesterday 2:12 PM",
        status: "read",
      },
      { id: "m5", sender: "them", type: "text", text: "Either works! Figma preferred but XD is fine. I've shared the Figma file in the session notes.", timestamp: "Yesterday 2:15 PM" },
    ],
  },
  {
    id: "3",
    name: "Priya Sharma",
    role: "Learner",
    skill: "Python",
    lastMessage: "Thank you so much, this really helped!",
    lastTime: "Mon",
    unread: 0,
    online: false,
    initials: "PS",
    color: "bg-green-500",
    messages: [
      { id: "m1", sender: "them", type: "text", text: "Hi! I'm struggling with Python decorators. Can we cover that in our session?", timestamp: "Mon 9:00 AM" },
      { id: "m2", sender: "me", type: "text", text: "Absolutely! Decorators are a bit tricky at first but very powerful once you get them.", timestamp: "Mon 9:05 AM", status: "read" },
      { id: "m3", sender: "them", type: "text", text: "Is there anything I should read beforehand?", timestamp: "Mon 9:07 AM" },
      { id: "m4", sender: "me", type: "text", text: "Check out the official Python docs on closures first. That'll make decorators much easier to grasp.", timestamp: "Mon 9:10 AM", status: "read" },
      { id: "m5", sender: "them", type: "text", text: "Thank you so much, this really helped!", timestamp: "Mon 9:12 AM" },
    ],
  },
  {
    id: "4",
    name: "Aisha Patel",
    role: "Mentor",
    skill: "Data Science",
    lastMessage: "We'll use pandas and seaborn for the viz part.",
    lastTime: "Sun",
    unread: 1,
    online: false,
    initials: "AP",
    color: "bg-amber-500",
    messages: [
      { id: "m1", sender: "me", type: "text", text: "Hi Aisha! Looking forward to the data viz session.", timestamp: "Sun 4:00 PM", status: "read" },
      { id: "m2", sender: "them", type: "text", text: "Me too! We have a lot to cover — EDA, plotting, and storytelling with data.", timestamp: "Sun 4:05 PM" },
      { id: "m3", sender: "me", type: "text", text: "Should I install any specific libraries?", timestamp: "Sun 4:07 PM", status: "read" },
      { id: "m4", sender: "them", type: "text", text: "We'll use pandas and seaborn for the viz part.", timestamp: "Sun 4:10 PM" },
    ],
  },
  {
    id: "5",
    name: "Luca Ferrara",
    role: "Mentor",
    skill: "Node.js / Backend",
    lastMessage: "Let me know if you have questions after the recording.",
    lastTime: "Sat",
    unread: 0,
    online: false,
    initials: "LF",
    color: "bg-rose-500",
    messages: [
      { id: "m1", sender: "them", type: "text", text: "Session recording has been attached to your dashboard.", timestamp: "Sat 6:00 PM" },
      { id: "m2", sender: "me", type: "text", text: "Great, thanks! The REST API section was super clear.", timestamp: "Sat 6:10 PM", status: "read" },
      { id: "m3", sender: "them", type: "text", text: "Let me know if you have questions after the recording.", timestamp: "Sat 6:12 PM" },
    ],
  },
];

/* ─────────────── Sub-components ─────────────── */

function StatusTick({ status }: { status?: MessageStatus }) {
  if (status === "read") return <CheckCheck className="h-3.5 w-3.5 text-blue-400" />;
  if (status === "delivered") return <CheckCheck className="h-3.5 w-3.5 text-muted-foreground" />;
  if (status === "sent") return <Check className="h-3.5 w-3.5 text-muted-foreground" />;
  return null;
}

function SessionClarificationCard({ session, isMine }: { session: SessionCard; isMine: boolean }) {
  return (
    <div
      className={cn(
        "rounded-xl border p-3 text-xs space-y-2 max-w-xs",
        isMine
          ? "border-primary/30 bg-primary/5 text-primary-foreground"
          : "border-border bg-card text-foreground"
      )}
    >
      <div className="flex items-center gap-2 font-semibold text-sm">
        <CalendarCheck className="h-4 w-4 text-primary shrink-0" />
        Session Clarification
      </div>
      <div className="rounded-lg bg-primary/10 px-3 py-2 space-y-0.5">
        <p className="font-semibold text-foreground">{session.title}</p>
        <p className="text-muted-foreground flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {session.date} at {session.time}
        </p>
      </div>
      <p className="text-muted-foreground leading-relaxed">{session.question}</p>
    </div>
  );
}

/* ─────────────── Main Component ─────────────── */
export default function Chat() {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [activeId, setActiveId] = useState<string>("1");
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [showClarification, setShowClarification] = useState(false);
  const [clarificationText, setClarificationText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const active = conversations.find((c) => c.id === activeId)!;

  const filteredConvos = conversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.skill.toLowerCase().includes(search.toLowerCase())
  );

  // scroll to bottom when active chat changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeId, active?.messages.length]);

  // mark as read on open
  useEffect(() => {
    setConversations((prev) =>
      prev.map((c) => (c.id === activeId ? { ...c, unread: 0 } : c))
    );
  }, [activeId]);

  // simulate typing indicator after sending
  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const replies: Record<string, string> = {
        "1": "Got it! I'll make sure we cover that thoroughly. 😊",
        "2": "Sounds good! I'll prep extra examples for that topic.",
        "3": "Perfect! See you at the session!",
        "4": "Great question! We'll definitely address that.",
        "5": "Happy to help! Just ping me anytime.",
      };
      const reply: Message = {
        id: `m${Date.now()}`,
        sender: "them",
        type: "text",
        text: replies[activeId] ?? "Thanks for reaching out! Talk soon.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeId
            ? { ...c, messages: [...c.messages, reply], lastMessage: reply.text!, lastTime: "now" }
            : c
        )
      );
    }, 1500);
  };

  const sendMessage = (type: MessageType = "text") => {
    const text = input.trim();
    const clarification = clarificationText.trim();
    if (type === "text" && !text) return;
    if (type === "session-clarification" && !clarification) return;

    const session = active?.messages.find((m) => m.type === "session-clarification")?.session;

    const msg: Message = {
      id: `m${Date.now()}`,
      sender: "me",
      type,
      text: type === "text" ? text : undefined,
      session:
        type === "session-clarification"
          ? {
              title: session?.title ?? "Upcoming Session",
              date: session?.date ?? "—",
              time: session?.time ?? "—",
              question: clarification,
            }
          : undefined,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              messages: [...c.messages, msg],
              lastMessage: type === "text" ? text : "📅 Session clarification sent",
              lastTime: "now",
            }
          : c
      )
    );

    setInput("");
    setClarificationText("");
    setShowClarification(false);
    simulateTyping();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <div className="flex flex-1 overflow-hidden pt-16">
        {/* ── Conversation List ── */}
        <aside
          className={cn(
            "flex w-full flex-col border-r border-border bg-card sm:w-80 xl:w-96",
            mobileView === "chat" && "hidden sm:flex"
          )}
        >
          {/* Header */}
          <div className="border-b border-border px-4 py-4">
            <h2 className="mb-3 text-lg font-extrabold text-foreground">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="pl-9 text-sm"
                placeholder="Search conversations…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y divide-border">
            {filteredConvos.map((c) => (
              <button
                key={c.id}
                onClick={() => { setActiveId(c.id); setMobileView("chat"); setShowInfo(false); }}
                className={cn(
                  "flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-muted/50",
                  activeId === c.id && "bg-primary/5 border-l-2 border-l-primary"
                )}
              >
                <div className="relative shrink-0">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white",
                      c.color
                    )}
                  >
                    {c.initials}
                  </div>
                  {c.online && (
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card bg-green-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold text-foreground">{c.name}</span>
                    <span className="shrink-0 text-[10px] text-muted-foreground">{c.lastTime}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-xs text-muted-foreground">{c.lastMessage}</span>
                    {c.unread > 0 && (
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                        {c.unread}
                      </span>
                    )}
                  </div>
                  <span className="mt-0.5 inline-block rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                    {c.role} · {c.skill}
                  </span>
                </div>
              </button>
            ))}
            {filteredConvos.length === 0 && (
              <p className="py-10 text-center text-sm text-muted-foreground">No conversations found.</p>
            )}
          </div>
        </aside>

        {/* ── Chat Window ── */}
        <main
          className={cn(
            "flex flex-1 flex-col overflow-hidden",
            mobileView === "list" && "hidden sm:flex"
          )}
        >
          {active ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
                <div className="flex items-center gap-3">
                  <button
                    className="sm:hidden mr-1"
                    onClick={() => setMobileView("list")}
                  >
                    <ChevronRight className="h-5 w-5 rotate-180 text-muted-foreground" />
                  </button>
                  <div className="relative">
                    <div
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white",
                        active.color
                      )}
                    >
                      {active.initials}
                    </div>
                    {active.online && (
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-card bg-green-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{active.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      {active.online ? (
                        <><Circle className="h-2 w-2 fill-green-500 text-green-500" /> Online</>
                      ) : (
                        "Offline"
                      )}
                      <span className="mx-1">·</span>
                      {active.role} — {active.skill}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" title="Voice call">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" title="Video call">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn("h-8 w-8", showInfo && "bg-primary/10 text-primary")}
                    onClick={() => setShowInfo(!showInfo)}
                    title="Info"
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-1 overflow-hidden">
                {/* Messages */}
                <div className="flex flex-1 flex-col overflow-hidden">
                  <div className="flex-1 overflow-y-auto space-y-4 px-4 py-5">
                    {/* Date divider */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 border-t border-border" />
                      <span className="text-[11px] text-muted-foreground">Today</span>
                      <div className="flex-1 border-t border-border" />
                    </div>

                    {active.messages.map((msg) => {
                      const isMine = msg.sender === "me";
                      return (
                        <div
                          key={msg.id}
                          className={cn(
                            "flex gap-2",
                            isMine ? "flex-row-reverse" : "flex-row"
                          )}
                        >
                          {!isMine && (
                            <div
                              className={cn(
                                "flex h-7 w-7 shrink-0 items-center justify-center self-end rounded-full text-[10px] font-bold text-white",
                                active.color
                              )}
                            >
                              {active.initials}
                            </div>
                          )}
                          <div
                            className={cn(
                              "flex flex-col gap-1 max-w-[70%]",
                              isMine ? "items-end" : "items-start"
                            )}
                          >
                            {msg.type === "text" && (
                              <div
                                className={cn(
                                  "rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                                  isMine
                                    ? "rounded-br-sm bg-primary text-primary-foreground"
                                    : "rounded-bl-sm bg-muted text-foreground"
                                )}
                              >
                                {msg.text}
                              </div>
                            )}
                            {msg.type === "session-clarification" && msg.session && (
                              <SessionClarificationCard
                                session={msg.session}
                                isMine={isMine}
                              />
                            )}
                            <div className="flex items-center gap-1">
                              <span className="text-[10px] text-muted-foreground">{msg.timestamp}</span>
                              {isMine && <StatusTick status={msg.status} />}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Typing indicator */}
                    {isTyping && (
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white",
                            active.color
                          )}
                        >
                          {active.initials}
                        </div>
                        <div className="rounded-2xl rounded-bl-sm bg-muted px-4 py-3 flex gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
                          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
                          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Session Clarification Panel */}
                  {showClarification && (
                    <div className="border-t border-border bg-muted/30 p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                          <CalendarCheck className="h-4 w-4 text-primary" />
                          Session Clarification
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowClarification(false)}>
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                      {(() => {
                        const s = active.messages.find((m) => m.type === "session-clarification")?.session;
                        return s ? (
                          <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs">
                            <p className="font-semibold text-foreground">{s.title}</p>
                            <p className="text-muted-foreground">{s.date} at {s.time}</p>
                          </div>
                        ) : (
                          <div className="rounded-lg border border-dashed border-border bg-card px-3 py-2 text-xs text-muted-foreground">
                            No upcoming session linked. Your mentor will see this message with session context.
                          </div>
                        );
                      })()}
                      <Textarea
                        rows={3}
                        placeholder="Type your clarification or question about the session…"
                        value={clarificationText}
                        onChange={(e) => setClarificationText(e.target.value)}
                        className="resize-none text-sm"
                      />
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => setShowClarification(false)}>Cancel</Button>
                        <Button
                          size="sm"
                          className="gap-1.5"
                          disabled={!clarificationText.trim()}
                          onClick={() => sendMessage("session-clarification")}
                        >
                          <Send className="h-3.5 w-3.5" />
                          Send Clarification
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Input Bar */}
                  {!showClarification && (
                    <div className="border-t border-border bg-card px-4 py-3">
                      <div className="flex items-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0 mb-1"
                          onClick={() => setShowClarification(true)}
                          title="Session Clarification"
                        >
                          <CalendarCheck className="h-4 w-4 text-primary" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 mb-1">
                          <Paperclip className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Textarea
                          ref={inputRef}
                          rows={1}
                          placeholder={`Message ${active.name}…`}
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={handleKeyDown}
                          className="flex-1 resize-none min-h-[38px] max-h-24 text-sm py-2"
                        />
                        <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 mb-1">
                          <Smile className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Button
                          size="icon"
                          className="h-8 w-8 shrink-0 mb-1"
                          disabled={!input.trim()}
                          onClick={() => sendMessage()}
                          title="Send (Enter)"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="mt-1.5 text-[10px] text-muted-foreground">
                        Press <kbd className="rounded border border-border px-1 font-mono">Enter</kbd> to send ·{" "}
                        <kbd className="rounded border border-border px-1 font-mono">Shift+Enter</kbd> for new line ·{" "}
                        <button
                          className="text-primary underline-offset-2 hover:underline"
                          onClick={() => setShowClarification(true)}
                        >
                          Send session clarification
                        </button>
                      </p>
                    </div>
                  )}
                </div>

                {/* Info Panel */}
                {showInfo && (
                  <aside className="hidden xl:flex w-64 flex-col border-l border-border bg-card p-4 gap-4 overflow-y-auto">
                    <div className="text-center">
                      <div
                        className={cn(
                          "mx-auto mb-2 flex h-14 w-14 items-center justify-center rounded-full text-sm font-bold text-white",
                          active.color
                        )}
                      >
                        {active.initials}
                      </div>
                      <p className="font-bold text-foreground">{active.name}</p>
                      <p className="text-xs text-muted-foreground">{active.role} — {active.skill}</p>
                      <span
                        className={cn(
                          "mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                          active.online
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-muted text-muted-foreground"
                        )}
                      >
                        <Circle className={cn("h-1.5 w-1.5 fill-current", active.online ? "text-green-500" : "text-muted-foreground")} />
                        {active.online ? "Online" : "Offline"}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <p className="font-semibold text-muted-foreground uppercase tracking-wide text-[10px]">Session Info</p>
                      {(() => {
                        const s = active.messages.find((m) => m.type === "session-clarification")?.session;
                        return s ? (
                          <div className="rounded-lg border border-border bg-muted/30 p-3 space-y-1">
                            <p className="font-semibold text-foreground">{s.title}</p>
                            <p className="text-muted-foreground">{s.date}</p>
                            <p className="text-muted-foreground">{s.time}</p>
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No upcoming session linked.</p>
                        );
                      })()}
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <p className="font-semibold text-muted-foreground uppercase tracking-wide text-[10px]">Stats</p>
                      <div className="rounded-lg border border-border bg-muted/30 p-3 space-y-1.5">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Messages</span>
                          <span className="font-semibold">{active.messages.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Role</span>
                          <span className="font-semibold">{active.role}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Skill</span>
                          <span className="font-semibold">{active.skill}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 mt-auto">
                      <Button variant="outline" size="sm" className="w-full text-xs gap-1.5">
                        <CalendarCheck className="h-3.5 w-3.5" /> Book a Session
                      </Button>
                      <Button variant="outline" size="sm" className="w-full text-xs gap-1.5 text-destructive border-destructive/30 hover:bg-destructive/5">
                        Block User
                      </Button>
                    </div>
                  </aside>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center text-muted-foreground">
              Select a conversation to start chatting.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
