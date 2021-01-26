import { DesignComponent, RangeProperty, PositionProperty, ImageProperty } from "./design-component.class";
export class ImageBackgroundComponent extends DesignComponent {
  constructor() {
    super('Hintergrund', {
      image: new ImageProperty('Bilddatei', null, null),
      scale: new RangeProperty('Skalierung', 1, 0, 1, 0.01),
      position: new PositionProperty('Position', { x: 0, y: 0 }),
    });
  }

  draw(p5: any): void {
    if (this.props.image instanceof ImageProperty) {
      if (this.props.image.value == null && this.props.image.file != null) {
        this.props.image.loadImg(p5);
      } else if (this.props.image.value == null && this.props.image.file == null) {
        const img: any = document.getElementById('default');
        p5.loadImage(img.currentSrc, (img: any) => {
          this.props.image.value = img;
        });
      }
    }
    if (this.props.image.value) {
      p5.image(
        this.props.image.value,
        this.props.position.value.x,
        this.props.position.value.y,
        this.props.image.value.width * this.props.scale.value,
        this.props.image.value.height * this.props.scale.value
      );
    }
  }
}