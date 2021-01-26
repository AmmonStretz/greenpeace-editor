export class Color {
  constructor(public r: number, public g: number, public b: number) { }

  decToHex(n: number): string {
    if (n < 0) n = 0xFFFFFFFF + n + 1;
    return n.toString(16).toUpperCase();
  }
  hexToDec(s: string): number {
    return parseInt('0x'+s);
  }
}