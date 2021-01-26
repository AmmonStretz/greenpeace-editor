import { Color } from "../color.class";
import { Design } from "../design.class";
import { BoxTitleComponent } from "./design-components/box-title-component.class";
import { ImageBackgroundComponent } from "./design-components/image-background-component.class";
import { LogoComponent } from "./design-components/logo-component.class";

export class BlueDesign extends Design {
    constructor() {
        super('BlueDesign', 'BlueDesign.png', [new ImageBackgroundComponent(), new LogoComponent(), new BoxTitleComponent()]);
    }
    draw(p5: any): void {
        p5.background(255)
        this.components.forEach(component => {
            p5.push();
            component.draw(p5);
            p5.pop();
        });
    }
}