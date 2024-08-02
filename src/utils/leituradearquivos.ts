import fs from 'fs/promises'

const caminhoBancoDeDados = 'src/bancodedados.json'

export async function lerDados(): Promise<TUsuario[]> {
    const dados = await fs.readFile(caminhoBancoDeDados)
    const parse = JSON.parse(dados.toString())

    return parse
}

export async function adicionarDados(usuario: TUsuario) {
    const dados = await lerDados()
    dados.push(usuario)

    fs.writeFile(caminhoBancoDeDados, JSON.stringify(dados, null, '\t'))
}