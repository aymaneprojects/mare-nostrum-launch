import { BarChart3, Cloud, MessageSquareText, MessagesSquare, Star } from "lucide-react";
import type { LiveKind } from "@/lib/live/types";

export const KIND_ICON: Record<LiveKind, typeof BarChart3> = {
  open: MessageSquareText,
  poll: BarChart3,
  wall: MessagesSquare,
  cloud: Cloud,
  rating: Star,
};
