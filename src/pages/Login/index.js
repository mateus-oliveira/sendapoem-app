import React, {Component} from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    AsyncStorage,
} from 'react-native';

import api from '../../services/api';

import styles from './styles';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',

            author: null,
            token: null,
            color: '#000000',

            error: {
                email_error: '',
                password_error: '',
            },

            rememberMe: null,
            remember_pwd: '#FFF',
        };
    }

    async componentDidMount() {
        try {
            const email = await AsyncStorage.getItem('EMAIL');
            const password = await AsyncStorage.getItem('PASSWORD');
            if (email && password) {
                this.setState({
                    email,
                    password,
                });
                this.login_authenticate();
            }
        } catch (error) {
            console.log(error);
        }
    }

    login_authenticate = async () => {
        const {email, password} = this.state;

        if (email === '' && password === '') {
            this.setState({
                error: {
                    email_error: 'Email inválido!',
                    password_error: 'Senha inválida!',
                },
            });
        } else if (password === '') {
            this.setState({error: {password_error: 'Senha inválida!'}});
        } else if (
            this.state.email === '' ||
            this.state.email.indexOf('@') === -1
        ) {
            this.setState({error: {email_error: 'Email inválido!'}});
        } else {
            try {
                await api
                    .post('/login', {
                        email,
                        password,
                    })
                    .then(response =>
                        this.setState({
                            author: response.data.author,
                            token: response.data.token,
                        }),
                    );
            } catch (error) {
                console.log(error);
            }

            const {author} = this.state;

            if (author) {
                this.setState({
                    error: {
                        email_error: '',
                        password_error: '',
                    },
                });

                const data = {
                    author: this.state.author,
                    token: this.state.token,
                };

                console.log('author', author);
            } else {
                this.setState({
                    error: {
                        email_error: '',
                        password_error: 'Dados inválidos!',
                    },
                });

                await this.forgetCredentials();
            }
        }
    };

    toggleRememberMe = async () => {
        await this.setState({rememberMe: !this.state.rememberMe});

        if (this.state.rememberMe) {
            this.setState({remember_pwd: '#000C42'});
            await this.rememberCredentials();
        } else {
            this.setState({remember_pwd: '#FFF'});
            await this.forgetCredentials();
        }

        console.log(this.state.rememberMe);
    };

    rememberCredentials = async () => {
        try {
            await AsyncStorage.setItem('EMAIL', this.state.email);
            await AsyncStorage.setItem('PASSWORD', this.state.password);
        } catch (error) {
            console.log(error);
        }
    };

    forgetCredentials = async () => {
        try {
            await AsyncStorage.removeItem('PASSWORD');
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        const {email_error, password_error} = this.state.error;

        return (
            <KeyboardAvoidingView style={styles.view_global}>
                <View style={styles.container}>
                    <Text style={styles.text_login}>Login</Text>

                    <TextInput
                        selectionColor={'#B87243'}
                        style={styles.text_input}
                        placeholder="Email"
                        placeholderTextColor="#000000"
                        onChangeText={email => {
                            let memo = this.state.email;
                            memo = email;
                            this.setState({email: memo});
                        }}
                        value={this.state.email}
                    />
                    <Text style={styles.error}>{email_error}</Text>

                    <TextInput
                        selectionColor={'#B87243'}
                        style={styles.text_input}
                        placeholder="Senha"
                        placeholderTextColor="#000000"
                        onChangeText={pwd => {
                            let memo = this.state.password;
                            memo = pwd;
                            this.setState({password: memo});
                        }}
                        secureTextEntry={true}
                    />
                    <Text style={styles.error}>{password_error}</Text>

                    <View style={styles.view_pwd}>
                        <View style={styles.remember_pwd}>
                            <TouchableOpacity
                                style={{
                                    ...styles.switch,
                                    backgroundColor: this.state.remember_pwd,
                                }}
                                onPress={this.toggleRememberMe}
                            />
                            <Text style={{...styles.text, marginLeft: 5}}>
                                Lembrar da senha
                            </Text>
                        </View>
                        <Text
                            onPress={() => {}}
                            style={styles.text_link}>
                            Esqueceu a senha?
                        </Text>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.login_authenticate}>
                        <Text style={styles.text_button}>Entrar</Text>
                    </TouchableOpacity>

                    <Text style={styles.text}>
                        Ainda não fez seu cadastro. Clique{' '}
                        <Text
                            onPress={() => {}}
                            style={styles.text_link}>
                            aqui
                        </Text>
                    </Text>
                </View>
            </KeyboardAvoidingView>
        );
    }
}