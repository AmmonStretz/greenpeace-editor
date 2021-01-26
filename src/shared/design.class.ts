import { DesignComponent } from "./designs/design-components/design-component.class";


export abstract class Design {

    public static p5: any;

    constructor(
        public name: string,
         // defines the name of the DesignIcon it is inside "assets/design-icons"
         // for example YellowDesign.png
        public src: string,
        public components: DesignComponent[],
    ){}
    public abstract draw(p5: any): void;
}