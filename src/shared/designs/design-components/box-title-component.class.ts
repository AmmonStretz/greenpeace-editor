import { Color } from "@/shared/color.class";
import { DesignComponent, StringProperty, NumberProperty, ColorProperty, RangeProperty, PositionProperty } from "./design-component.class";

export class BoxTitleComponent extends DesignComponent {
  constructor() {
      super('Titel', {
          titleText: new StringProperty('Titeltext', `Hier könnte ein\n "cooler" Spruch\n stehen!`),
          size: new NumberProperty('Titelsize', 50),
          boxColor: new ColorProperty('TitleColor', new Color(255, 255, 0)),
          position: new PositionProperty('Position', { x: 72, y: 29 }),
          padding: new NumberProperty('Padding', 20),
          gap: new NumberProperty('gap', 20),
          corner: new NumberProperty('corner', 43),
          rotation: new RangeProperty('rotation', 6, -180, 180, 0.01),
      });
  }

  draw(p5: any): void {
      this.drawTitleFields(p5);
  }

  private drawTitleFields(p5: any) {
      p5.textStyle(p5.BOLD);
      p5.push();
      p5.rotate(this.props.rotation.value * p5.TWO_PI / 360);
      p5.textSize(20);
      const lines = this.props.titleText.value.split('\n');
      for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          this.drawTitleField(p5, line, i);
      }
      p5.pop();
  }

  private drawTitleField(p5: any, text: any, linenr: number) {
      p5.textSize(this.props.size.value);
      const newY = this.props.position.value.y + linenr * (p5.textAscent() + 2 * this.props.padding.value + this.props.gap.value);
      this.drawBox(p5, this.props.position.value.x, newY, p5.textWidth(text) + 2 * this.props.padding.value, p5.textAscent() + 2 * this.props.padding.value);
      p5.textAlign(p5.LEFT, p5.TOP);
      p5.fill(0);
      p5.text(text, this.props.position.value.x + this.props.padding.value, newY + this.props.padding.value);
  }

  private drawBox(p5: any, x: number, y: number, width: number, height: number) {
      const color: Color = this.props.boxColor.value;
      p5.fill(color.r, color.g, color.b);
      p5.noStroke();
      p5.beginShape();
      p5.vertex(x, y);
      p5.vertex(x + width + this.props.corner.value, y);
      p5.vertex(x + width, y + height);
      p5.vertex(x, y + height);
      p5.endShape(p5.CLOSE);
  }
}