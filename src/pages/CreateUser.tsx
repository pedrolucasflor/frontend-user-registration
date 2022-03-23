import { styled } from '@stitches/react';
import * as LabelPrimitive from '@radix-ui/react-label';

import UserRegistrationApi from '../api/UserRegistrationApi';

const Form = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    minWidth: '400px',
    padding: '40px',
    borderRadius: '4px',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.15)'

})

const FormRow = styled('div', {
    marginBottom: '15px',
    width: '100%'
})

const StyledLabel = styled(LabelPrimitive.Root, {
    fontSize: 15,
    fontWeight: 500,
    color: '#767676',
    userSelect: 'none',
  });

const Label = StyledLabel;

const Input = styled('input', {
    all: 'unset',
    width: 'calc(100% - 20px)',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    padding: '0 10px',
    height: 35,
    fontSize: 15,
    lineHeight: 1,
    color: '#767676',
    boxShadow: `0 0 0 1px #CDCDCD`,
    '&:focus': { boxShadow: `0 0 0 2px #CDCDCD` },
});

const AddRowButton = styled('button', {
    border: 0,
    width: '22px',
    height: '22px',
    marginTop: '5px',
    fontSize: '18px',
    borderRadius: '50%',
    backgroundColor: '#767676',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer'
})

const SubmitButton = styled('button', {
    border: 0,
    margin: '15px auto 0 auto',
    padding: '10px 20px',
    fontWeight: 'bold',
    borderRadius: 4,
    backgroundColor: '#354d3b',
    color: '#fff'
})
export function CreateUser() {
    const user = {
        name: '',
        birthdate: '',
        phoneNumbers: [],
        adresses: [],
        socialMedia: {
            facebookId: '',
            linkedinId: '',
            twitterId: '',
            instagramId: ''
        },
        cpf: '',
        rg: ''
    }

    let phoneNumbersCount = 1;

    async function addUser() {
        try {
            await UserRegistrationApi.addUser(user)
        } catch (e) {
            console.log(e)
        }
    }
 
    return (
        <Form>
            <FormRow>
                <Label htmlFor="name" css={{ lineHeight: '35px', width: '100%'}}>
                Nome
                </Label>
                <Input type="text" id="name" onChange={(e) => user.name = e.target.value}/>
            </FormRow>
            <FormRow>
                <Label htmlFor="birthDate" css={{ lineHeight: '35px', width: '100%'}}>
                Data de nascimento
                </Label>
                <Input type="date" id="birthDate" onChange={(e) => user.birthdate = e.target.value}/>
            </FormRow>
            <FormRow>
                <Label css={{ lineHeight: '35px', width: '100%'}}>
                    Telefone(s)
                </Label>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Input type="text" placeholder="Número"/>
                    <Input type="text" placeholder="Ex: Celular" css={{ width: '70px', margin: '0 10px' }}/>
                    <AddRowButton>+</AddRowButton>
                </div>
            </FormRow>
            <FormRow>
                <Label css={{ lineHeight: '35px', width: '100%'}}>
                    Endereço(s)
                </Label>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Input type="text" placeholder="Endereço"/>
                    <Input type="text" placeholder="Ex: Casa" css={{ width: '70px', margin: '0 10px' }}/>
                    <AddRowButton>+</AddRowButton>
                </div>
            </FormRow>
            <FormRow>
                <Label css={{ lineHeight: '35px', width: '100%'}}>
                    Redes sociais
                </Label>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Input type="text" id="facebookId" placeholder="Facebook" css={{ width: '70px' }} onChange={(e) => user.socialMedia.facebookId = e.target.value} />
                    <Input type="text" id="linkedinId" placeholder="Linkedin" css={{ width: '70px' }} onChange={(e) => user.socialMedia.linkedinId = e.target.value} />
                    <Input type="text" id="linkedinId" placeholder="Twitter" css={{ width: '70px' }} onChange={(e) => user.socialMedia.twitterId = e.target.value} />
                    <Input type="text" id="instagramId" placeholder="Instagram" css={{ width: '70px' }} onChange={(e) => user.socialMedia.instagramId = e.target.value} />
                </div>
            </FormRow>
            <FormRow>
                <Label htmlFor="cpf" css={{ lineHeight: '35px', width: '100%'}}>
                CPF
                </Label>
                <Input type="text" id="cpf" onChange={(e) => user.cpf = e.target.value}/>
            </FormRow>
            <FormRow>
                <Label htmlFor="rg" css={{ lineHeight: '35px', width: '100%'}}>
                RG
                </Label>
                <Input type="text" id="rg" onChange={(e) => user.rg = e.target.value} />
            </FormRow>
            <SubmitButton type="button" onClick={addUser}>Adicionar usuário</SubmitButton>
        </Form>
    );
}