import React, { createRef } from 'react';
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
    color: '#fff',
    cursor: 'pointer'
})

const ErrorMessage = styled('span', {
    color: 'red',
    textAlign: 'center'
})

export class CreateUser extends React.Component  {
    state = {
        user: {
            name: '',
            birthdate: '',
            phoneNumbers: [{
                number: '',
                label: ''
            }],
            addresses: [{
                name: '',
                label: ''
            }],
            socialMedia: {
                facebookId: '',
                linkedinId: '',
                twitterId: '',
                instagramId: ''
            },
            cpf: '',
            rg: ''
        },
        phoneNumbersCount: 0,
        addressCount: 0,
        error: false,
        errorMessage: ''
    }

    phoneNumberNumberInput = createRef<HTMLInputElement>()
    phoneNumberLabelInput = createRef<HTMLInputElement>()
    addressNameInput = createRef<HTMLInputElement>()
    addressLabelInput = createRef<HTMLInputElement>()

    addPhoneNumberRow = () => {
        this.setState({ phoneNumbers: this.state.phoneNumbersCount++ })
        this.state.user.phoneNumbers.push({ number: '', label: '' })
        const numberInput = this.phoneNumberNumberInput ? this.phoneNumberNumberInput.current : null
        const labelInput = this.phoneNumberLabelInput ? this.phoneNumberLabelInput.current : null
        
        if (numberInput && labelInput) {
            numberInput.value = ''
            labelInput.value = ''
            numberInput.focus()
        }
    }

    addAddressRow = () => {
        this.setState({ address: this.state.addressCount++ })
        this.state.user.addresses.push({ name: '', label: '' })
        const nameInput = this.addressNameInput ? this.addressNameInput.current : null
        const labelInput = this.addressLabelInput ? this.addressLabelInput.current : null
        
        if (nameInput && labelInput) {
            nameInput.value = ''
            labelInput.value = ''
            nameInput.focus()
        }
    }

    addUser = async () => {
        try {
            this.setState({ errorMessage: '' })

            if (this.isUserValid()) {
                const query = {
                    name: this.state.user.name,
                    birthdate: this.state.user.birthdate,
                    phoneNumbers: this.state.user.phoneNumbers.filter(e => e.number.trim().length > 0),
                    addresses: this.state.user.addresses.filter(e => e.name.trim().length > 0),
                    socialMedia: {
                        facebookId: this.state.user.socialMedia.facebookId,
                        linkedinId: this.state.user.socialMedia.linkedinId,
                        twitterId: this.state.user.socialMedia.twitterId,
                        instagramId: this.state.user.socialMedia.instagramId
                    },
                    cpf: this.state.user.cpf,
                    rg: this.state.user.rg
                }

                await UserRegistrationApi.addUser(query)
                window.location.replace('/users')
            } else {
                this.setState({ error: true })
            }
        } catch (e) {
            console.log(e)
        }
    }

    isUserValid() {
        if (this.state.user.name.trim().length === 0) {
            this.setState({ errorMessage: 'O campo nome é obrigatório' })
            return false
        }

        if (this.state.user.birthdate.trim().length === 0) {
            this.setState({ errorMessage: 'O campo data de nascimento é obrigatório' })
            return false
        }

        if (this.state.user.phoneNumbers.length === 1 && this.state.user.phoneNumbers[0].number.trim().length === 0) {
            this.setState({ errorMessage: 'O usuário deve ter pelo menos um telefone cadastrado' })
            return false
        }

        if (this.state.user.cpf.trim().length === 0) {
            this.setState({ errorMessage: 'O campo CPF é obrigatório' })
            return false
        }

        if (this.state.user.rg.trim().length === 0) {
            this.setState({ errorMessage: 'O campo RG é obrigatório' })
            return false
        }

        return true
    }
 
    render () {
        const user = this.state.user

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
                    {
                        user.phoneNumbers.map((phoneNumber : any, index) => (
                            (index + 1) < user.phoneNumbers.length &&
                            <div key={index}>
                                {index} {phoneNumber.number} {phoneNumber.label}<br/>
                                {/* <Input type="text" placeholder={phoneNumber.number} />
                                <Input type="text" placeholder={phoneNumber.label} css={{ width: '70px', margin: '0 10px' }} /> */}
                            </div>
                        ))
                    }
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Input ref={this.phoneNumberNumberInput} type="text" placeholder="Número" onChange={(e) => user.phoneNumbers[this.state.phoneNumbersCount].number = e.target.value}/>
                        <Input ref={this.phoneNumberLabelInput} type="text" placeholder="Ex: Celular" onChange={(e) => user.phoneNumbers[this.state.phoneNumbersCount].label = e.target.value} css={{ width: '70px', margin: '0 10px' }}/>
                        <AddRowButton onClick={this.addPhoneNumberRow}>+</AddRowButton>
                    </div>
                </FormRow>
                <FormRow>
                    <Label css={{ lineHeight: '35px', width: '100%'}}>
                        Endereço(s)
                    </Label>
                    {
                        user.addresses.map((address : any, index) => (
                            (index + 1) < user.addresses.length &&
                            <div key={index}>
                                {index} {address.name} {address.label}<br/>
                                {/* <Input type="text" placeholder={address.number} />
                                <Input type="text" placeholder={address.label} css={{ width: '70px', margin: '0 10px' }} /> */}
                            </div>
                        ))
                    }
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Input ref={this.addressNameInput} type="text" placeholder="Endereço"  onChange={(e) => user.addresses[this.state.addressCount].name = e.target.value}/>
                        <Input ref={this.addressLabelInput} type="text" placeholder="Ex: Casa" onChange={(e) => user.addresses[this.state.addressCount].label = e.target.value} css={{ width: '70px', margin: '0 10px' }}/>
                        <AddRowButton onClick={this.addAddressRow}>+</AddRowButton>
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
                {
                    (this.state.error && this.state.errorMessage.length > 0) && (
                        <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
                    )
                }
                <SubmitButton type="button" onClick={this.addUser}>Adicionar usuário</SubmitButton>
            </Form>
        )
    }
}