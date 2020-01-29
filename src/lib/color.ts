export class Color {
  public r: number = 0;
  public g: number = 0;
  public b: number = 0;
  public a: number = 0;

  constructor(r: number, g: number, b: number, a: number) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

  alpha(a: number) {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${a})`;
  }

  get() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }
}
