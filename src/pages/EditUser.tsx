import React, { createRef } from "react";
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

const ErrorMessage = styled('span', {
    color: 'red',
    textAlign: 'center'
})

export class EditUser extends React.Component {
    constructor(props) {
        super(props)
    }

    state = {
        user: {
            name: '',
            birthdate: '',
            phoneNumbers: [{
                id: 0,
                number: '',
                label: ''
            }],
            addresses: [{
                id: 0,
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
    
    nameInput = createRef<HTMLInputElement>()
    birthdateInput = createRef<HTMLInputElement>()
    phoneNumberNumberInput = createRef<HTMLInputElement>()
    phoneNumberLabelInput = createRef<HTMLInputElement>()
    addressNameInput = createRef<HTMLInputElement>()
    addressLabelInput = createRef<HTMLInputElement>()
    facebookInput = createRef<HTMLInputElement>()
    linkedinInput = createRef<HTMLInputElement>()
    twitterInput = createRef<HTMLInputElement>()
    instagramInput = createRef<HTMLInputElement>()
    cpfInput = createRef<HTMLInputElement>()
    rgInput = createRef<HTMLInputElement>()

    findUser = async (id) => {
        try {
            const response = await UserRegistrationApi.findUser(id)
            this.setState({ user: response })
        } catch (e) {
            console.log(e)
        }
    }

    fillInputsWithUserData () {
        const nameInput = this.nameInput ? this.nameInput.current : null
        const birthdateInput = this.birthdateInput ? this.birthdateInput.current : null
        const phoneNumberNumberInput = this.phoneNumberNumberInput ? this.phoneNumberNumberInput.current : null
        const phoneNumberLabelInput = this.phoneNumberLabelInput ? this.phoneNumberLabelInput.current : null
        const addressNameInput = this.addressNameInput ? this.addressNameInput.current : null
        const addressLabelInput = this.addressLabelInput ? this.addressLabelInput.current : null
        const facebookInput = this.facebookInput ? this.facebookInput.current : null
        const linkedinInput = this.linkedinInput ? this.linkedinInput.current : null
        const twitterInput = this.twitterInput ? this.twitterInput.current : null
        const instagramInput = this.instagramInput ? this.instagramInput.current : null
        const cpfInput = this.cpfInput ? this.cpfInput.current : null
        const rgInput = this.rgInput ? this.rgInput.current : null
        
        nameInput ? nameInput.value = this.state.user.name : null
        birthdateInput ? birthdateInput.value = this.state.user.birthdate.split('T')[0] : null
        facebookInput ? facebookInput.value = this.state.user.socialMedia.facebookId : null
        linkedinInput ? linkedinInput.value = this.state.user.socialMedia.linkedinId : null
        twitterInput ? twitterInput.value = this.state.user.socialMedia.twitterId : null
        instagramInput ? instagramInput.value = this.state.user.socialMedia.instagramId : null
        cpfInput ? cpfInput.value = this.state.user.cpf : null
        rgInput ? rgInput.value = this.state.user.rg : null

        if (phoneNumberNumberInput && phoneNumberLabelInput) {
            const phoneNumber = this.state.user.phoneNumbers.length > 0 ? this.state.user.phoneNumbers[this.state.user.phoneNumbers.length - 1] : { number: '', label: '' }
            phoneNumberNumberInput.value = phoneNumber.number
            phoneNumberLabelInput.value = phoneNumber.label
        }

        if (addressNameInput && addressLabelInput) {
            const phoneNumber = this.state.user.addresses.length > 0 ? this.state.user.addresses[this.state.user.addresses.length - 1] : { name: '', label: '' }
            addressNameInput.value = phoneNumber.name
            addressLabelInput.value = phoneNumber.label
        }
    }
    
    addPhoneNumberRow = () => {
        this.setState({ phoneNumbers: this.state.phoneNumbersCount++ })
        this.state.user.phoneNumbers.push({ id: this.state.phoneNumbersCount, number: '', label: '' })
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
        this.state.user.addresses.push({ id: this.state.addressCount, name: '', label: '' })
        const nameInput = this.addressNameInput ? this.addressNameInput.current : null
        const labelInput = this.addressLabelInput ? this.addressLabelInput.current : null
        
        if (nameInput && labelInput) {
            nameInput.value = ''
            labelInput.value = ''
            nameInput.focus()
        }
    }

    editUser = async () => {
        const { id } = this.props.match.params

        try {
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
                await UserRegistrationApi.updateUser(id, query)
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

    componentWillMount = async () => {
        const { id } = this.props.match.params

        try {
            await this.findUser(id)

            this.fillInputsWithUserData()
        } catch (e) {
            console.log(e)
        }
    }

    render () {
        return (
            <div>
                <Form>
                    <FormRow>
                        <Label htmlFor="name" css={{ lineHeight: '35px', width: '100%'}}>
                        Nome
                        </Label>
                        <Input ref={this.nameInput} type="text" id="name" onChange={(e) => this.state.user.name = e.target.value}/>
                    </FormRow>
                    <FormRow>
                        <Label htmlFor="birthDate" css={{ lineHeight: '35px', width: '100%'}}>
                        Data de nascimento
                        </Label>
                        <Input ref={this.birthdateInput} type="date" id="birthDate" onChange={(e) => this.state.user.birthdate = e.target.value}/>
                    </FormRow>
                    <FormRow>
                        <Label css={{ lineHeight: '35px', width: '100%'}}>
                            Telefone(s)
                        </Label>
                        {
                            this.state.user.phoneNumbers.map((phoneNumber : any, index) => (
                                (index + 1) < this.state.user.phoneNumbers.length &&
                                <div key={index}>
                                    {phoneNumber.number} {phoneNumber.label}<br/>
                                    {/* <Input type="text" placeholder={phoneNumber.number} />
                                    <Input type="text" placeholder={phoneNumber.label} css={{ width: '70px', margin: '0 10px' }} /> */}
                                </div>
                            ))
                        }
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Input ref={this.phoneNumberNumberInput} type="text" placeholder="Número" onChange={(e) => this.state.user.phoneNumbers[this.state.phoneNumbersCount].number = e.target.value}/>
                            <Input ref={this.phoneNumberLabelInput} type="text" placeholder="Ex: Celular" onChange={(e) => this.state.user.phoneNumbers[this.state.phoneNumbersCount].label = e.target.value} css={{ width: '70px', margin: '0 10px' }}/>
                            <AddRowButton onClick={this.addPhoneNumberRow}>+</AddRowButton>
                        </div>
                    </FormRow>
                    <FormRow>
                        <Label css={{ lineHeight: '35px', width: '100%'}}>
                            Endereço(s)
                        </Label>
                        {
                            this.state.user.addresses.map((address : any, index) => (
                                (index + 1) < this.state.user.addresses.length &&
                                <div key={index}>
                                    {address.name} {address.label}<br/>
                                    {/* <Input type="text" placeholder={address.number} />
                                    <Input type="text" placeholder={address.label} css={{ width: '70px', margin: '0 10px' }} /> */}
                                </div>
                            ))
                        }
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Input ref={this.addressNameInput} type="text" placeholder="Endereço"  onChange={(e) => this.state.user.addresses[this.state.addressCount].name = e.target.value}/>
                            <Input ref={this.addressLabelInput} type="text" placeholder="Ex: Casa" onChange={(e) => this.state.user.addresses[this.state.addressCount].label = e.target.value} css={{ width: '70px', margin: '0 10px' }}/>
                            <AddRowButton onClick={this.addAddressRow}>+</AddRowButton>
                        </div>
                    </FormRow>
                    <FormRow>
                        <Label css={{ lineHeight: '35px', width: '100%'}}>
                            Redes sociais
                        </Label>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Input ref={this.facebookInput} type="text" id="facebookId" placeholder="Facebook" css={{ width: '70px' }} onChange={(e) => this.state.user.socialMedia.facebookId = e.target.value} />
                            <Input ref={this.linkedinInput} type="text" id="linkedinId" placeholder="Linkedin" css={{ width: '70px' }} onChange={(e) => this.state.user.socialMedia.linkedinId = e.target.value} />
                            <Input ref={this.twitterInput} type="text" id="twitterId" placeholder="Twitter" css={{ width: '70px' }} onChange={(e) => this.state.user.socialMedia.twitterId = e.target.value} />
                            <Input ref={this.instagramInput} type="text" id="instagramId" placeholder="Instagram" css={{ width: '70px' }} onChange={(e) => this.state.user.socialMedia.instagramId = e.target.value} />
                        </div>
                    </FormRow>
                    <FormRow>
                        <Label htmlFor="cpf" css={{ lineHeight: '35px', width: '100%'}}>
                        CPF
                        </Label>
                        <Input ref={this.cpfInput} type="text" id="cpf" onChange={(e) => this.state.user.cpf = e.target.value}/>
                    </FormRow>
                    <FormRow>
                        <Label htmlFor="rg" css={{ lineHeight: '35px', width: '100%'}}>
                        RG
                        </Label>
                        <Input ref={this.rgInput} type="text" id="rg" onChange={(e) => this.state.user.rg = e.target.value} />
                    </FormRow>
                    {
                    (this.state.error && this.state.errorMessage.length > 0) && (
                        <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
                    )
                }
                    <SubmitButton type="button" onClick={this.editUser}>Atualizar usuário</SubmitButton>
                </Form>
            </div>
        )
    }
}