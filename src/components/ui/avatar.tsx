import Image from "next/image";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

type AvatarProps = {
  className?: string;
  /** Load eagerly (use for the avatar shown above the fold in the hero). */
  priority?: boolean;
};

/** Round profile photo. The image comes from `site.avatar` (src/assets/profile). */
export function Avatar({ className, priority }: AvatarProps) {
  return (
    <Image
      src={site.avatar}
      alt={site.name}
      sizes="40px"
      placeholder="blur"
      priority={priority}
      className={cn("size-10 shrink-0 rounded-full object-cover ring-2 ring-background", className)}
    />
  );
}
