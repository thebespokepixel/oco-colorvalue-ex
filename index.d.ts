export class OCOValueEX extends TinyColor {
    static generateOCO(name_: any, colorArray_: any): any;
    constructor(color_: any, name_: any, options_: any);
    _name: any;
    get alphaActive(): boolean;
    get name(): any;
    toArrayIntRGBA(): string;
    toArrayRGBA(): string;
}
export function fromBytes(raw: any): OCOValueEX;
export function fromPrecise(raw: any): OCOValueEX;
import { TinyColor } from "@thebespokepixel/es-tinycolor";
