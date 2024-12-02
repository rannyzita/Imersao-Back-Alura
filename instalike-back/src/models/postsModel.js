import conectarAoBanco from "../config/dbConfig.js";
// conecta ao banco de dados utilizando a função `conectarAoBanco` e a string de conexão. 
// a palavra-chave `async/await` permite lidar com operações assíncronas de forma mais síncrona.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// função assíncrona para obter todos os posts do banco de dados.
// 1. Conecta ao banco de dados específico (imersao-instabytes).
// 2. Acessa a coleção "posts".
// 3. Utiliza o método `find()` para encontrar todos os documentos (posts) e o método `toArray()` para transformá-los em um array.
export default async function getTodosPosts() {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}