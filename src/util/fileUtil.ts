
export class FileUtil{

    static createFolderIfNotExists(folderPath: string){
        const fs = require('fs');

        if (!fs.existsSync(folderPath)){
            fs.mkdirSync(folderPath, { recursive: true });
        }
    }

    static getDirectoryFilesList(folderPath: string) : string[]{
        const fs = require('fs');
        const path = require('path');

        let files:string[] = fs.readdirSync(folderPath);

        return files;
    }

    static removeExtension(folderPath: string) : string[]{
        const fs = require('fs');
        const path = require('path');

        let files:string[] = fs.readdirSync(folderPath);

        for(let i = 0; i < files.length; i++){
            files[i] = path.parse(files[i]).name;
        }

        return files;
    }
}