import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors()); // Permite requisições do frontend (Vue)

// --- Tipagens (Interfaces) ---
interface Curso {
    id: number;
    nome: string;
    descricao: string;
}

interface DadosMatricula {
    nome: string;
    email: string;
    cursoId: number;
}

// --- Banco de Dados Simulado ---
const cursosDisponiveis: Curso[] = [
    { id: 1, nome: "Desenvolvimento Web Full Stack", descricao: "Aprenda Vue.js e Node.js" },
    { id: 2, nome: "Introdução ao Banco de Dados", descricao: "Modelagem e SQL" },
    { id: 3, nome: "Estruturas de Dados em C", descricao: "Pilhas, Filas e Árvores" },
    { id: 4, nome: "Programação em Java", descricao: "Orientação a Objetos e JDK" },
    { id: 5, nome: "Desenvolvimento Mobile", descricao: "React Native e Flutter" }
];

const matriculasRealizadas: DadosMatricula[] = [];

// --- Rotas ---

// GET /cursos: Retorna a lista de cursos
app.get('/cursos', (req: Request, res: Response) => {
    res.status(200).json(cursosDisponiveis);
});

// POST /matricula: Recebe e valida os dados do aluno
app.post('/matricula', (req: Request, res: Response) => {
    const { nome, email, cursoId }: DadosMatricula = req.body;

    // Validação básica
    if (!nome || !email || !cursoId) {
        return res.status(400).json({ 
            erro: "Dados incompletos. Informe nome, e-mail e selecione um curso." 
        });
    }

    if (!email.includes('@')) {
        return res.status(400).json({ 
            erro: "E-mail inválido." 
        });
    }

    const cursoExiste = cursosDisponiveis.find(c => c.id === cursoId);
    if (!cursoExiste) {
        return res.status(400).json({ 
            erro: "O curso selecionado não existe." 
        });
    }

    // Salvando no banco simulado
    const novaMatricula: DadosMatricula = { nome, email, cursoId };
    matriculasRealizadas.push(novaMatricula);

    // 201 Created
    return res.status(201).json({ 
        mensagem: "Matrícula realizada com sucesso!",
        matricula: novaMatricula 
    });
});

// Inicialização do servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});