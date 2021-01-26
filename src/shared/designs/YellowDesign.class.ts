import { Design } from "../design.class";
import { DesignComponent } from "./design-components/design-component.class";

class YellowTitleCompoent extends DesignComponent {
    constructor() {
        super('YellowTitle');
    }
    
    draw(p5: any): void{
        p5.textSize(30);
        p5.textAlign(p5.LEFT, p5.TOP);
        p5.fill(0);
        p5.text('40', 10, 10);
    }
}

export class YellowDesign extends Design {
    constructor() {
        super('YellowDesign', 'YellowDesign.png', [new YellowTitleCompoent()]);
    }
    draw(p5: any): void {
        p5.background(255,255,0)
        this.components.forEach(component => {
            component.draw(p5);
        });
    }
}