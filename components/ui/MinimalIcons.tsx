'use client'

// 极简抽象图标库 - 完全符合UI设计规范V1.1
// 采用极简抽象风格，统一视觉重量，严格遵循配色规范

export const TargetIcon = ({ className = "h-6 w-6", color = "currentColor" }) => (
  <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <circle cx="12" cy="12" r="6" strokeWidth="2" />
    <circle cx="12" cy="12" r="2" strokeWidth="2" />
  </svg>
)

export const TrophyIcon = ({ className = "h-6 w-6", color = "currentColor" }) => (
  <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <rect x="4" y="2" width="16" height="6" strokeWidth="2" rx="1" />
    <path d="M6 8v8a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" strokeWidth="2" />
    <path d="M10 16v2a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-2" strokeWidth="2" />
  </svg>
)

export const RocketIcon = ({ className = "h-6 w-6", color = "currentColor" }) => (
  <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path d="M12 2L4 10l4 4-2 6 6-2 4 4 8-8-8-8z" strokeWidth="2" />
    <path d="M12 2v8" strokeWidth="2" />
  </svg>
)

export const SearchIcon = ({ className = "h-6 w-6", color = "currentColor" }) => (
  <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <circle cx="11" cy="11" r="8" strokeWidth="2" />
    <path d="m21 21-4.35-4.35" strokeWidth="2" />
  </svg>
)

export const DocumentIcon = ({ className = "h-6 w-6", color = "currentColor" }) => (
  <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <rect x="4" y="4" width="16" height="16" strokeWidth="2" rx="1" />
    <path d="M8 8h8" strokeWidth="2" />
    <path d="M8 12h8" strokeWidth="2" />
    <path d="M8 16h5" strokeWidth="2" />
  </svg>
)

export const ShieldIcon = ({ className = "h-6 w-6", color = "currentColor" }) => (
  <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z" strokeWidth="2" />
    <path d="M12 22V12" strokeWidth="2" />
  </svg>
)

export const LightbulbIcon = ({ className = "h-6 w-6", color = "currentColor" }) => (
  <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeWidth="2" />
  </svg>
)

export const CheckCircleIcon = ({ className = "h-6 w-6", color = "currentColor" }) => (
  <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <circle cx="12" cy="12" r="4" strokeWidth="2" />
  </svg>
)

export const CheckIcon = ({ className = "h-6 w-6", color = "currentColor" }) => (
  <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <rect x="6" y="6" width="12" height="12" strokeWidth="2" rx="1" />
    <path d="M10 12l2 2 2-2" strokeWidth="2" />
  </svg>
)

export const PlayIcon = ({ className = "h-6 w-6", color = "currentColor" }) => (
  <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path d="m5 3 14 9-14 9V3z" strokeWidth="2" />
  </svg>
)

export const ArrowUpIcon = ({ className = "h-6 w-6", color = "currentColor" }) => (
  <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path d="m5 15 7-7 7 7" strokeWidth="2" />
  </svg>
)

export const MessageIcon = ({ className = "h-6 w-6", color = "currentColor" }) => (
  <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <rect x="2" y="4" width="20" height="16" strokeWidth="2" rx="2" />
    <path d="m8 10 4 4 4-4" strokeWidth="2" />
  </svg>
)

export const ChartIcon = ({ className = "h-6 w-6", color = "currentColor" }) => (
  <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path d="M3 3v16a2 2 0 0 0 2 2h16" strokeWidth="2" />
    <path d="M7 16l4-4 4 4 4-4" strokeWidth="2" />
  </svg>
)

export const ClockIcon = ({ className = "h-6 w-6", color = "currentColor" }) => (
  <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <path d="M12 6v6l4 2" strokeWidth="2" />
  </svg>
)

export const LockIcon = ({ className = "h-6 w-6", color = "currentColor" }) => (
  <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="11" strokeWidth="2" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeWidth="2" />
  </svg>
)

export const GlobeIcon = ({ className = "h-6 w-6", color = "currentColor" }) => (
  <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth="2" />
    <path d="M2 12h20" strokeWidth="2" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" strokeWidth="2" />
  </svg>
)

export const LinkIcon = ({ className = "h-6 w-6", color = "currentColor" }) => (
  <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path d="m10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" strokeWidth="2" />
    <path d="m14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeWidth="2" />
  </svg>
)

export const CloudIcon = ({ className = "h-6 w-6", color = "currentColor" }) => (
  <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" strokeWidth="2" />
  </svg>
)

export const MobileIcon = ({ className = "h-6 w-6", color = "currentColor" }) => (
  <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <rect x="5" y="2" width="14" height="20" strokeWidth="2" rx="2" />
    <path d="M12 18h.01" strokeWidth="2" />
  </svg>
)

export const DesktopIcon = ({ className = "h-6 w-6", color = "currentColor" }) => (
  <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <rect x="2" y="3" width="20" height="14" strokeWidth="2" rx="2" />
    <path d="M8 21h8" strokeWidth="2" />
    <path d="M12 17v4" strokeWidth="2" />
  </svg>
)

export const LaptopIcon = ({ className = "h-6 w-6", color = "currentColor" }) => (
  <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path d="M3 6h18" strokeWidth="2" />
    <rect x="3" y="6" width="18" height="12" strokeWidth="2" rx="2" />
    <path d="M8 18h8" strokeWidth="2" />
  </svg>
)

export const PlugIcon = ({ className = "h-6 w-6", color = "currentColor" }) => (
  <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path d="M12 2v4" strokeWidth="2" />
    <path d="M16 6h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2" strokeWidth="2" />
    <path d="M8 6H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" strokeWidth="2" />
    <path d="M12 16v4" strokeWidth="2" />
  </svg>
)

export const PuzzleIcon = ({ className = "h-6 w-6", color = "currentColor" }) => (
  <svg className={className} fill="none" stroke={color} viewBox="0 0 24 24">
    <path d="M4 10a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4z" strokeWidth="2" />
    <path d="M8 10h8" strokeWidth="2" />
    <path d="M12 6v8" strokeWidth="2" />
  </svg>
)

export default {
  TargetIcon,
  TrophyIcon,
  RocketIcon,
  SearchIcon,
  DocumentIcon,
  ShieldIcon,
  LightbulbIcon,
  CheckCircleIcon,
  CheckIcon,
  PlayIcon,
  ArrowUpIcon,
  MessageIcon,
  ChartIcon,
  ClockIcon,
  LockIcon,
  GlobeIcon,
  LinkIcon,
  CloudIcon,
  MobileIcon,
  DesktopIcon,
  LaptopIcon,
  PlugIcon,
  PuzzleIcon
}