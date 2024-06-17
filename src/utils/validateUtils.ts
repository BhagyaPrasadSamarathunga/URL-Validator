export const checkUrlType = (url:string) => {
    try { 
        const urlPath = new URL(url).pathname; 
        const fileExtensionPattern = /\.[0-9a-z]+$/i;
        if (fileExtensionPattern.test(urlPath)) {
            return 'file';
        } else {
            return 'folder';
        }
    }
    catch (error:any) {
        return `Error: ${error.message}`; 
    }
}

export const checkUrlValidity = (url:string) => { 
    try { 
        new URL(url); 
        return true; 
    } 
    catch (error) {
        return false; 
    } 
};