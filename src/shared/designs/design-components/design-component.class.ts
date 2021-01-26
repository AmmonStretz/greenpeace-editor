import { Color } from "@/shared/color.class";
import { Design } from "@/shared/design.class";

export abstract class DesignComponent {
    constructor(
        public name: string,
        public props: { [key: string]: DesignComponentProperty<any> } = {},
    ) { }
    abstract draw(p5: any): void;
}
export abstract class DesignComponentProperty<T> {
    constructor(
        public name: string,
        public type: string,
        public value: T
    ) { }
}
export class StringProperty extends DesignComponentProperty<string> {
    constructor(
        public name: string,
        public value: string
    ) {
        super(name, 'string', value);
    }
}
export class NumberProperty extends DesignComponentProperty<number> {
    constructor(
        public name: string,
        public value: number
    ) {
        super(name, 'number', value);
    }
}
export class ColorProperty extends DesignComponentProperty<Color> {
    constructor(
        public name: string,
        public value: Color
    ) {
        super(name, 'color', value);
    }
}
export class PositionProperty extends DesignComponentProperty<{ x: number; y: number }> {
    constructor(
        public name: string,
        public value: { x: number; y: number },
    ) {
        super(name, 'position', value);
    }
}
export class RangeProperty extends DesignComponentProperty<number> {
    constructor(
        public name: string,
        public value: number,
        public min: number,
        public max: number,
        public stepsize: number,
    ) {
        super(name, 'range', value);
    }
}
export class ImageProperty extends DesignComponentProperty<any> {

    public static defaultImg: any;

    constructor(
        public name: string,
        public value: any,
        public file: File | null
    ) {
        super(name, 'img', value);

    }
    public loadDefaultImage(p5: any) {
        if (!p5) return;
        if (ImageProperty.defaultImg) {
            this.value = ImageProperty.defaultImg;
        } else if (!this.value) {
            const defaultImage: any = document.getElementById('default');
            p5.loadImage(defaultImage.currentSrc, (img: any) => {
                this.value = img;
                ImageProperty.defaultImg = img;
            });
        }
    }
    public loadImg(p5: any) {
        console.log(this.file);

        if (this.file == null) return;
        const imageType = /image.*/;
        if (this.file.type.match(imageType)) {
            const reader = new FileReader();
            reader.onload = (e) => {
                console.log(e);

                this.value = p5.createImg(reader.result, "");
                this.value.hide();
            };
            reader.readAsDataURL(this.file);
        } else {
            console.log(false);
            // output.innerHTML = "File not supported!";
        }
    }
}
export class LogoProperty extends DesignComponentProperty<number> {

    public static logos: any[] = [];
    public static colors: string[] = [];
    private static loaded = false;

    constructor(
        public name: string,
        public value: number,
    ) {
        super(name, 'logo', value);
    }
    public get logo() {
        if (LogoProperty.logos.length > 1 + this.value) {
            return null;
        }
        return LogoProperty.logos[this.value];
    }
    public static loadDefaultLogo(p5: any) {
        if(LogoProperty.logos.length > 0  || !p5) return;
        
        [['logo_white', '#fff'], ['logo_black', '#000'], ['logo_green', '#73c82c']].forEach(logo => {
            const defaultImage: any = document.getElementById(logo[0]);
            p5.loadImage(defaultImage.currentSrc, (img: any) => {
                if(LogoProperty.logos.length >= 3) return;
                LogoProperty.logos.push(img);
                LogoProperty.colors.push(logo[1]);
                
                
            });
        });
    }
}