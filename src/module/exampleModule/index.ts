export const moduleInfo = {
    moduleName: 'example',
    moduleVersion: '1.0.0',
    moduleDescription: 'This is an example',
    moduleAuthor: 'minerj101 & Avacado',
    moduleFormatVersion: 1,
    moduleDependencies: [],
};
/*You need to export every file here*/
export * from './exampleFile.js';
/*Every module needs an index.ts or file of same format but if you wish to use a different file name specify in ../index.ts*/
