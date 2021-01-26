export interface ButtonConfig {
    icon: string;
}
export interface ParentButton extends ButtonConfig {
    isOpen: boolean;
    children: FunctionalButton[];
}
export interface FunctionalButton extends ButtonConfig {
    eventMode: string;
}