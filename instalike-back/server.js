import express from "express";
import routes from "./src/routes/postsRoutes.js";

// cria uma instância do Express, que será utilizada para criar o servidor web.
const app = express();
// servindo arquivos estaticos
app.use(express.static("upload"))
routes(app);

// inicia o servidor na porta 3000 e exibe uma mensagem no console quando o servidor estiver ouvindo.
app.listen(3000, () => {
    console.log("Servidor escutando...");
});

