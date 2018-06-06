declare module "react-hot-loader";

interface RequireImport {
    default: any;
}
declare module '*.scss' {
    const content: any;
    export default content;
}
declare module "*.svg" {
    const svgcontent: any;
    export default svgcontent;
}
declare module "*.png" {
    const content: any;
    export default content;
}