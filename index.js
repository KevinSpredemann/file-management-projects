import fileManager from './fileManager.js';
import readlineSync from 'readline-sync';
import path from 'path';
import url from 'url';

async function main() {    

    const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
    const baseDir = path.join(__dirname, 'my_files');

    fileManager.createDirectory(baseDir);

    while (true) {
        console.log('\nMenu:');
        console.log('1. Criar arquivo');
        console.log('2. Listar arquivo');
        console.log('3. Ler Arquivo');
        console.log('4. Escrever Arquivo');
        console.log('5. Deletar Arquivo');
        console.log('6. Sair');

        
        const choice = readlineSync.question('Escolha uma opcao: ');

        try {
            switch (choice) {
                case '1':
                    const fileName = readlineSync.question('Digite o nome do arquivo: ');
                    const fileContent = readlineSync.question('Digite o conteudo do novo arquivo (ou deixe em branco): ');
    
                    const createFilePath = path.join(baseDir, fileName);
                    const fileMessage = await fileManager.createFile(createFilePath, fileContent);
                    console.log(fileMessage);
                    break;
                case '2':
                    const files = await fileManager.listFiles(baseDir);
                    console.log('Arquivos no diretório:', files);
                    break;
                case '3':
                    const readFileName = readlineSync.question('Digite o nome do arquivo que voce desejar ler: ');
                    const readFilePath = await fileManager.readFile(path.join(baseDir, readFileName));
                    console.log('Conteúdo do arquivo:', readFilePath);
                    break;
                case '4':
                    const writeFileName = readlineSync.question('Digite o nome do arquivo que deseja escrever: ');
                    const writeFilePath = path.join(baseDir, writeFileName);
                    const newContent = readlineSync.question('Digite o conteudo que deseja escrever: ');
                    const writeMessage = await fileManager.writeFile(writeFilePath, newContent);
                    console.log(writeMessage);
                    break;
                case '5':
                    const deleteFileName = readlineSync.question('Digite o nome do arquivo que deseja deletar: ');
                    const deleteFilePath = path.join(baseDir, deleteFileName);
                    const deleteMessage = await fileManager.deleteFile(deleteFilePath);
                    console.log(deleteMessage);
                    break;
                case '6':
                    console.log('Saindo...');
                    return;
                default:
                    console.log('Opção inválida! Tente novamente.');          
            }
        } catch (error) {
            console.log(error);
        }
    }
}   

main()