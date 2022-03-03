declare interface PannelListValue {
    label: string;
    value: string;
}

declare interface PannelOptions {
    name?: string;
    className?: string;
    top?: string;
    left?: string;
    maxWidth?: string;
    background?: string;
    color?: string;
    title?: string;
    list?: Array<PannelListValue>;
}