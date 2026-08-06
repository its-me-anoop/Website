/**
 * Short booking references, e.g. "FL-7K2M9QDW". The alphabet omits
 * 0/O/1/I/L so references survive being read over the phone.
 */
const alphabet = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

export function createBookingReference(
  randomValues: (length: number) => Uint8Array = (length) =>
    crypto.getRandomValues(new Uint8Array(length))
): string {
  const bytes = randomValues(8);
  let code = "";
  for (const byte of bytes) {
    code += alphabet[byte % alphabet.length];
  }
  return `FL-${code}`;
}
