import { DesignComponent, RangeProperty, PositionProperty, ImageProperty, LogoProperty, NumberProperty, StringProperty } from "./design-component.class";
export class LogoComponent extends DesignComponent {
  constructor() {
    super('Logo', {
      groupName: new StringProperty('Ortsgruppe', `Berlin`),
      scale: new RangeProperty('Skalierung', 1, 0, 1, 0.01),
      textSize: new NumberProperty('textSize', 70),
      position: new PositionProperty('Position', { x: 28, y: 70 }),
      textPosition: new PositionProperty('TextPosition', { x: 84, y: 100 }),
      logo: new LogoProperty('Logo', 0),
    });
  }

  draw(p5: any): void {
    p5.push();
    if (this.props.logo instanceof LogoProperty) {
      if (LogoProperty.logos.length > 0) {
        p5.scale(this.props.scale.value);
        const logo = LogoProperty.logos[this.props.logo.value]
        p5.translate(p5.width - this.props.position.value.x - logo.width, p5.height - this.props.position.value.y - logo.height);
        p5.image(
          logo,
          0,
          0,
          logo.width,
          logo.height
        );
        p5.translate(this.props.textPosition.value.x, this.props.textPosition.value.y);
        p5.textAlign(p5.LEFT, p5.TOP);
        p5.textSize(this.props.textSize.value);
        p5.textStyle(p5.BOLD);

        p5.fill(LogoProperty.colors[this.props.logo.value]);
        p5.text(this.props.groupName.value, 0, 0);
      }
    }
    
    p5.pop();
  }
  drawText() {
    console.log(123);
    
  }
}