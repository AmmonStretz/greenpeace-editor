import { Design } from "../design.class";
import { DesignComponent, StringProperty } from "./design-components/design-component.class";

class RedTitleCompoent extends DesignComponent {
    constructor() {
        super('RedTitle', {
            'title_text': new StringProperty('Titeltext', 'bla')
        });
    }
    
    draw(p5: any): void{
        p5.textSize(30);
        p5.textAlign(p5.LEFT, p5.TOP);
        p5.fill(0);
        p5.text(this.props.title_text.value, 10, 10);
    }
}

export class RedDesign extends Design {
    constructor() {
        super('RedDesign', 'RedDesign.png', [new RedTitleCompoent(), new RedTitleCompoent()]);        
    }
    draw(p5: any): void {
        p5.background(255,0,0)
        this.components.forEach(component => {
            component.draw(p5);
        });
    }
}