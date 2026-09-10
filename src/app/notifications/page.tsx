"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type NotifType = "game_invite" | "game_update" | "player_request" | "booking" | "achievement" | "system";

interface Notification {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  time: string;
  read: boolean;
  avatar?: string;
  actionLabel?: string;
  actionHref?: string;
}

const notifications: Notification[] = [
  {
    id: "n1", type: "game_invite", title: "Rahul S. invited you",
    body: "5v5 Evening Match — Today at 7:00 PM, Pro Kick Turf",
    time: "2 min ago", read: false, avatar: "R", actionLabel: "View Game", actionHref: "/games/g1",
  },
  {
    id: "n2", type: "game_update", title: "Game is almost full!",
    body: "Doubles Game at Smash Point — only 1 spot left",
    time: "15 min ago", read: false, actionLabel: "Join Now", actionHref: "/games/g2",
  },
  {
    id: "n3", type: "player_request", title: "Priya M. wants to connect",
    body: "Badminton player in T. Nagar, 0.8 km away",
    time: "1 hr ago", read: false, avatar: "P", actionLabel: "View Profile", actionHref: "/players/p2",
  },
  {
    id: "n4", type: "booking", title: "Booking confirmed",
    body: "Pro Kick Turf — Tomorrow, 6:00 PM. Booking ID: SPX-2841",
    time: "3 hrs ago", read: true,
  },
  {
    id: "n5", type: "achievement", title: "Badge unlocked! 🏅",
    body: "You earned \"Team Player\" — played 10 games with different players",
    time: "Yesterday", read: true,
  },
  {
    id: "n6", type: "game_update", title: "Game cancelled",
    body: "7v7 Weekend League at Goal Zone was cancelled by the host",
    time: "Yesterday", read: true,
  },
  {
    id: "n7", type: "system", title: "Welcome to Spoaxio!",
    body: "Complete your profile to get matched with players near you",
    time: "2 days ago", read: true, actionLabel: "Complete Profile", actionHref: "/profile",
  },
];

const typeIcons: Record<NotifType, { bg: string; color: string; icon: React.ReactNode }> = {
  game_invite: {
    bg: "bg-primary/10", color: "text-primary",
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg>,
  },
  game_update: {
    bg: "bg-blue-500/10", color: "text-blue-400",
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
  player_request: {
    bg: "bg-purple-500/10", color: "text-purple-400",
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" /></svg>,
  },
  booking: {
    bg: "bg-cyan-500/10", color: "text-cyan-400",
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
  achievement: {
    bg: "bg-yellow-500/10", color: "text-yellow-400",
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.003 6.003 0 01-5.54 0m5.54 0L12 17.25l-2.52-7.522" /></svg>,
  },
  system: {
    bg: "bg-gray-100", color: "text-gray-400",
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>,
  },
};

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const fadeUp = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

export default function NotificationsPage() {
  const router = useRouter();
  const [notifs, setNotifs] = useState(notifications);
  const unreadCount = notifs.filter((n) => !n.read).length;

  function markAllRead() {
    setNotifs(notifs.map((n) => ({ ...n, read: true })));
  }

  return (
    <div className="fixed inset-0 bg-white flex flex-col">
      {/* Header */}
      <div className="px-5 pt-5 pb-3 shrink-0">
        <div className="flex items-center gap-3 mb-1">
          <button onClick={() => router.back()} className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-[11px] text-primary/60">{unreadCount} unread</p>
            )}
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-[11px] text-primary/50 font-medium">
              Mark all read
            </button>
          )}
        </div>
      </div>

      {/* Notification list */}
      <motion.div variants={stagger} initial="hidden" animate="show" className="flex-1 overflow-y-auto min-h-0 px-5 pb-6">
        <div className="space-y-2">
          {notifs.map((n) => {
            const ti = typeIcons[n.type];
            return (
              <motion.div
                key={n.id}
                variants={fadeUp}
                className={`p-3.5 rounded-2xl border transition-all ${
                  n.read
                    ? "bg-gray-50 border-gray-100"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex gap-3">
                  {n.avatar ? (
                    <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-primary">{n.avatar}</span>
                    </div>
                  ) : (
                    <div className={`w-9 h-9 ${ti.bg} rounded-full flex items-center justify-center shrink-0`}>
                      <div className={ti.color}>{ti.icon}</div>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-0.5">
                      <p className={`text-xs font-medium ${n.read ? "text-gray-400" : "text-gray-900"}`}>{n.title}</p>
                      {!n.read && <div className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1" />}
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed mb-2">{n.body}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-gray-500">{n.time}</span>
                      {n.actionLabel && n.actionHref && (
                        <button
                          onClick={() => router.push(n.actionHref!)}
                          className="text-[10px] font-medium text-primary/70 hover:text-primary transition-colors"
                        >
                          {n.actionLabel}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
