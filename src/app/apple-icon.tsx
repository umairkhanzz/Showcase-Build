import { renderIcon } from "@/lib/og";

/** iOS home-screen icon. Square corners: iOS applies its own rounded mask. */
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return renderIcon(size.width, { rounded: false });
}
