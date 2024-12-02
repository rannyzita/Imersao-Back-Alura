import { GoogleGenerativeAI } from '@google/generative-ai';

// Cria uma instância do cliente Google Generative AI, utilizando a chave API do Gemini como configuração.
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Obtém o modelo generativo Gemini 1.5-Flash da instância do cliente.
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Função assíncrona que gera uma descrição alternativa para uma imagem
export default async function gerarDescricaoComGemini(imageBuffer) {
  // Cria o prompt para o modelo de linguagem, solicitando uma descrição em português do Brasil para a imagem.
    const prompt = "Gere uma descrição em português do Brasil para a seguinte imagem de forma direta e deixando somente a descrição da imagem";

  // Bloco try-catch para lidar com possíveis erros durante a geração da descrição.
    try {
    // Cria um objeto que representa a imagem, convertendo o buffer de imagem para base64.
    const image = {
        inlineData: {
        data: imageBuffer.toString('base64'),
        mimeType: 'image/png', // Assumindo que a imagem é um PNG, ajuste conforme necessário
        },
    };

    // Utiliza o modelo para gerar o conteúdo, passando o prompt e a imagem como entrada.
    const res = await model.generateContent([prompt, image]);

    // Extrai o texto gerado da resposta do modelo e retorna.
    // Se não houver texto gerado, retorna a string "Alt-text não disponível.".
    return res.response.text() || "Alt-text não disponível.";
    } catch (error) {
    // Caso ocorra algum erro durante a geração do texto, loga o erro no console e 
    // relança um novo erro com uma mensagem mais amigável.
    console.error("Erro ao obter alt-text:", error.message, error);
    throw new Error("Erro ao obter o alt-text do Gemini.");
    }
}