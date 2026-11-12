import { SHARE_ALT, SHARE_SIZE, shareCardJpeg } from "./_lib/shareCard";

export const alt = SHARE_ALT;
export const size = SHARE_SIZE;
export const contentType = "image/jpeg";

export default function Image() {
  return shareCardJpeg();
}
