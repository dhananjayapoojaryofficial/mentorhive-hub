import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

type ProfileState = {
  name: string;
  email: string;
  role: "Learner" | "Teacher";
  location: string;
  bio: string;
  skills: string[];
  avatar: string;
};

type PasswordState = {
  current: string;
  next: string;
  confirm: string;
};

const Profile = () => {
  const [profile, setProfile] = useState<ProfileState>({
    name: "Ayesha Khan",
    email: "ayesha@skillbridge.io",
    role: "Teacher",
    location: "Bengaluru, IN",
    bio: "Full-stack mentor helping learners master React, TypeScript, and system design through real-world projects.",
    skills: ["React", "TypeScript", "System Design", "GraphQL"],
    avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&w=300&h=300&q=80",
  });

  const [passwords, setPasswords] = useState<PasswordState>({
    current: "",
    next: "",
    confirm: "",
  });

  const [skillInput, setSkillInput] = useState("");

  const avatarPreview = useMemo(() => profile.avatar, [profile.avatar]);

  const handleAvatarChange = (file?: File) => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setProfile((prev) => ({ ...prev, avatar: objectUrl }));
  };

  const handleSkillAdd = () => {
    const value = skillInput.trim();
    if (!value || profile.skills.includes(value)) return;
    setProfile((prev) => ({ ...prev, skills: [...prev.skills, value] }));
    setSkillInput("");
  };

  const handleSkillRemove = (skill: string) => {
    setProfile((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }));
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder: wire to API later.
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswords({ current: "", next: "", confirm: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-foreground">Profile</h1>
          <p className="mt-2 text-muted-foreground">Edit your profile, update your password, and manage teaching skills.</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Sidebar summary */}
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4 h-28 w-28 overflow-hidden rounded-full border border-border bg-muted">
                <img src={avatarPreview} alt="Profile" className="h-full w-full object-cover" />
              </div>
              <h2 className="text-lg font-bold text-foreground">{profile.name}</h2>
              <p className="text-sm text-muted-foreground">{profile.role} · {profile.location}</p>
              <p className="mt-2 text-xs text-muted-foreground">{profile.email}</p>

              <label className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:border-primary transition">
                Upload picture
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(e) => handleAvatarChange(e.target.files?.[0])}
                />
              </label>
            </div>
          </div>

          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <form onSubmit={handleProfileSubmit} className="rounded-xl border border-border bg-card p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Edit profile</h3>
                  <p className="text-xs text-muted-foreground">Basic info, bio, and teaching role.</p>
                </div>
                <Button type="submit" size="sm">Save changes</Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Full name</label>
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Your full name"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Email</label>
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Location</label>
                  <Input
                    value={profile.location}
                    onChange={(e) => setProfile((prev) => ({ ...prev, location: e.target.value }))}
                    placeholder="City, Country"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Role</label>
                  <select
                    value={profile.role}
                    onChange={(e) => setProfile((prev) => ({ ...prev, role: e.target.value as ProfileState["role"] }))}
                    className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm focus:border-primary focus:outline-none"
                  >
                    <option value="Learner">Learner</option>
                    <option value="Teacher">Teacher</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">Bio</label>
                <Textarea
                  value={profile.bio}
                  onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell learners about your experience, focus areas, and teaching style."
                  rows={4}
                />
              </div>
            </form>

            <div className="rounded-xl border border-border bg-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Skills (for teachers)</h3>
                  <p className="text-xs text-muted-foreground">Showcase the topics you mentor in.</p>
                </div>
                <Button type="button" size="sm" onClick={handleSkillAdd}>Add skill</Button>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSkillAdd();
                    }
                  }}
                  placeholder="e.g. Next.js, Data Structures"
                />
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Press Enter to add</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="flex items-center gap-2">
                    {skill}
                    <button
                      type="button"
                      className="text-xs text-muted-foreground hover:text-foreground"
                      onClick={() => handleSkillRemove(skill)}
                      aria-label={`Remove ${skill}`}
                    >
                      ×
                    </button>
                  </Badge>
                ))}
                {profile.skills.length === 0 && (
                  <p className="text-sm text-muted-foreground">No skills yet. Add your mentoring topics.</p>
                )}
              </div>
            </div>

            <form onSubmit={handlePasswordSubmit} className="rounded-xl border border-border bg-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Change password</h3>
                  <p className="text-xs text-muted-foreground">Secure your account with a new password.</p>
                </div>
                <Button type="submit" size="sm">Update password</Button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">Current password</label>
                  <Input
                    type="password"
                    value={passwords.current}
                    onChange={(e) => setPasswords((prev) => ({ ...prev, current: e.target.value }))}
                    placeholder="••••••••"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground">New password</label>
                  <Input
                    type="password"
                    value={passwords.next}
                    onChange={(e) => setPasswords((prev) => ({ ...prev, next: e.target.value }))}
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="space-y-1 md:w-1/2">
                <label className="text-xs font-semibold text-muted-foreground">Confirm new password</label>
                <Input
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords((prev) => ({ ...prev, confirm: e.target.value }))}
                  placeholder="••••••••"
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
