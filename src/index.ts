import app from "./app";
import rotas from "./rotas";

const PORTA = process.env.PORTA || 3000;

app.use(rotas);
app.listen(PORTA, () => console.log(`API rodando na porta ${PORTA}`));