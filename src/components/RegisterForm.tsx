type RegisterLabel = {
    text: string;
}

export function RegisterForm(props: RegisterLabel) {
    return (
        <div>
            <p>{props.text}</p>
            <button>Enviar formulário</button>
        </div>
    );
}