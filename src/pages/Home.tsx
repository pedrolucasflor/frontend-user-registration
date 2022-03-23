import '../styles/home/Home.css'

export function Home() {
    return (
        <div className="home">
            <div className="home__buttons">
                <a className="home__button" href="/create-user">Cadastrar novo usuário</a>
                <a className="home__button" href="/users">Usuários</a>
            </div>
        </div>
    )
}