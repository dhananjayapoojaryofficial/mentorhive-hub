import { createContext, useContext, useState, ReactNode } from "react";

export interface Session {
  id: string;
  title: string;
  teacher: string;
  teacherId: string;
  date: string;
  time: string;
  duration: string;
  type: "Free" | "Paid";
  price?: number;
  category: string;
  description: string;
  maxSeats: number;
  enrolledCount: number;
  rating: number;
  imageGradient: string;
}

const GRADIENTS = [
  "from-violet-500 to-purple-700",
  "from-rose-500 to-pink-700",
  "from-emerald-500 to-teal-700",
  "from-amber-500 to-orange-700",
  "from-cyan-500 to-blue-700",
  "from-sky-500 to-indigo-700",
  "from-fuchsia-500 to-pink-700",
  "from-lime-500 to-green-700",
];

const INITIAL_SESSIONS: Session[] = [
  {
    id: "s1",
    title: "React Advanced Patterns",
    teacher: "Sarah Chen",
    teacherId: "2",
    date: "Mar 10, 2026",
    time: "10:00 AM",
    duration: "90 min",
    type: "Paid",
    price: 29,
    category: "Web Development",
    description: "Deep dive into advanced React patterns: render props, compound components, custom hooks, and more.",
    maxSeats: 20,
    enrolledCount: 14,
    rating: 4.9,
    imageGradient: "from-violet-500 to-purple-700",
  },
  {
    id: "s2",
    title: "UI/UX Design Fundamentals",
    teacher: "Marcus Johnson",
    teacherId: "4",
    date: "Mar 12, 2026",
    time: "2:00 PM",
    duration: "60 min",
    type: "Free",
    category: "Design",
    description: "Learn the core principles of UI/UX design including color theory, typography, and layout.",
    maxSeats: 30,
    enrolledCount: 22,
    rating: 4.7,
    imageGradient: "from-rose-500 to-pink-700",
  },
  {
    id: "s3",
    title: "Python for Data Science",
    teacher: "Dr. Priya Kapoor",
    teacherId: "5",
    date: "Mar 14, 2026",
    time: "11:00 AM",
    duration: "120 min",
    type: "Paid",
    price: 39,
    category: "Data Science",
    description: "Hands-on session covering NumPy, Pandas, and Matplotlib for data analysis.",
    maxSeats: 25,
    enrolledCount: 18,
    rating: 4.8,
    imageGradient: "from-emerald-500 to-teal-700",
  },
  {
    id: "s4",
    title: "Node.js REST API Masterclass",
    teacher: "James Liu",
    teacherId: "6",
    date: "Mar 16, 2026",
    time: "4:00 PM",
    duration: "90 min",
    type: "Paid",
    price: 35,
    category: "Backend",
    description: "Build production-ready REST APIs with Node.js, Express, and MongoDB.",
    maxSeats: 15,
    enrolledCount: 10,
    rating: 4.6,
    imageGradient: "from-amber-500 to-orange-700",
  },
  {
    id: "s5",
    title: "Introduction to Machine Learning",
    teacher: "Dr. Priya Kapoor",
    teacherId: "5",
    date: "Mar 18, 2026",
    time: "9:00 AM",
    duration: "60 min",
    type: "Free",
    category: "Data Science",
    description: "An introduction to ML concepts: supervised vs unsupervised, key algorithms, and real-world applications.",
    maxSeats: 50,
    enrolledCount: 41,
    rating: 4.9,
    imageGradient: "from-cyan-500 to-blue-700",
  },
  {
    id: "s6",
    title: "Responsive Web Design with Tailwind CSS",
    teacher: "Sarah Chen",
    teacherId: "2",
    date: "Mar 20, 2026",
    time: "3:00 PM",
    duration: "75 min",
    type: "Free",
    category: "Web Development",
    description: "Build beautiful, fully responsive websites using Tailwind CSS utility classes.",
    maxSeats: 40,
    enrolledCount: 28,
    rating: 4.8,
    imageGradient: "from-sky-500 to-indigo-700",
  },
];

interface SessionsContextValue {
  sessions: Session[];
  addSession: (data: Omit<Session, "id" | "enrolledCount" | "rating" | "imageGradient">) => void;
}

const SessionsContext = createContext<SessionsContextValue | null>(null);

export const SessionsProvider = ({ children }: { children: ReactNode }) => {
  const [sessions, setSessions] = useState<Session[]>(INITIAL_SESSIONS);

  const addSession = (data: Omit<Session, "id" | "enrolledCount" | "rating" | "imageGradient">) => {
    const newSession: Session = {
      ...data,
      id: `s-${Date.now()}`,
      enrolledCount: 0,
      rating: 0,
      imageGradient: GRADIENTS[Math.floor(Math.random() * GRADIENTS.length)],
    };
    setSessions((prev) => [newSession, ...prev]);
  };

  return (
    <SessionsContext.Provider value={{ sessions, addSession }}>
      {children}
    </SessionsContext.Provider>
  );
};

export const useSessions = () => {
  const ctx = useContext(SessionsContext);
  if (!ctx) throw new Error("useSessions must be used inside SessionsProvider");
  return ctx;
};
