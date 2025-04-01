const express = require("express");
const app = express();
const port = 4000;

app.set("port", port);

app.use(express.json());

let users = [];

const saveCadas = async (newCadas) => {
  return new Promise((resolve) =>
    setTimeout(() => {
      users.push(newCadas);
      resolve();
    }, 1000)
  );
};

app.post("/cadastro", async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    return res.status(400).json({ mensagem: "Preencha todos os campos" });
  }

  const newCadas = { email, senha };
  await saveCadas(newCadas);
  res.status(201).json({ mensagem: "Cadastro Salvo" });
});

app.get("/users", (req, res) => {
  const { email } = req.params;

  const cadastro = users.find((item) => item.email === email);

  if (!cadastro) {
    return res.status(404).json({ error: "Cadastro não encontrado." });
  }

  res.json(users);
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
