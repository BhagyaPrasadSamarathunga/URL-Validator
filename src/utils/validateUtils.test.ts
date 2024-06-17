import { checkUrlType, checkUrlValidity } from "./validateUtils";

describe('utils/validateUtils', () => {
    describe('check URL type', () => {
      it('should return URL type as file', () => {
        const url = 'https://example.com/path/to/file.txt';
        const fileUrl = checkUrlType(url);
        expect(fileUrl).toEqual('file');
      });
  
      it('should return URL type as folder', () => {
        const url = 'https://en.ryte.com/wiki/URL_Directory';
        const folderUrl = checkUrlType(url);
        expect(folderUrl).toEqual('folder');
      });
    });
});

describe('utils/checkUrlValidity', () => {
    describe('check URL is valid or not', () => {
      it('should return URL is valid', () => {
        const url = 'https://example.com/path/to/file.txt';
        const fileUrl = checkUrlValidity(url);
        expect(fileUrl).toEqual(true);
      });
  
      it('should return URL is invalid', () => {
        const url = 'abc';
        const folderUrl = checkUrlValidity(url);
        expect(folderUrl).toEqual(false);
      });
    });
});