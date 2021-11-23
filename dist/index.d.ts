declare const getAbsoluteFSPath: any;
declare type Spec = {
    name: string;
    url: string;
};
export { getAbsoluteFSPath, Spec, };
export declare const generateIndexHtml: (spec: Spec | Spec[], filePath: string) => string;
