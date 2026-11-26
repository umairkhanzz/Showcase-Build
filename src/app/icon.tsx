import { renderIcon } from "@/lib/og";

/** App icon (browser tabs, Android home screen, Google results). Generated at build time. */
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return renderIcon(size.width);
}
