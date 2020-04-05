import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import api from './src/services/api';

export default class App extends Component {
    constructor (props){
        super(props);
        this.state = {
            user: null,
        }
    }

    create_user = async () => {
        try {
            await api.post('/author', {
                name: 'Mateus',
                email: 'joaoe@gmail.com',
                phone: '8499999999',
                password: 'admin1234',
            }).then(response => this.setState({user:response.data.author}))
        } catch(error){
            console.log(error)
        }
    }

    render (){
        const {user} = this.state;
        return (
            <View style={styles.container}>
                {user && <Text>Bem vindo, {user.name}!</Text>}
                <TouchableOpacity 
                    style={{height: 44, backgroundColor:'#FFF'}} 
                    onPress={() => this.create_user()}
                >
                    <Text>Criar Usuário</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0000FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
