declare const getAbsoluteFSPath: any;
export { getAbsoluteFSPath };
declare type Spec = {
    name: string;
    url: string;
};
export declare const generateIndexHtml: (spec: Spec | Spec[], filePath: string) => string;
