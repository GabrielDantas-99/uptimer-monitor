import { GalleryVerticalEnd, AudioWaveform, Command, ClockArrowUp, LockKeyhole, UsersRound, Settings2, FileScan, Gauge, Bot } from "lucide-react";

export const NAV_LINKS = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Uptime",
      url: "#",
      icon: ClockArrowUp,
      isActive: true,
      items: [
        {
          title: "All Tests",
          url: "#",
        },
        {
          title: "New Uptime Test",
          url: "#",
        },
      ],
    },
    {
      title: "SSL",
      url: "#",
      icon: LockKeyhole,
      items: [
        {
          title: "All Tests",
          url: "#",
        },
        {
          title: "New SSL Test",
          url: "#",
        },
      ],
    },
    {
      title: "Contact Groups",
      url: "#",
      icon: UsersRound,
      items: [
        {
          title: "All Contact Group",
          url: "#",
        },
        {
          title: "New Contact Group",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Process Digitalization",
      url: "#",
      icon: FileScan,
    },
    {
      name: "Resource Manager",
      url: "#",
      icon: Gauge,
    },
    {
      name: "AI Client",
      url: "#",
      icon: Bot,
    },
  ],
}
