import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    switch: {
        borderColor: '#B87243',
        borderRadius: 4,
        borderWidth: 1,
        width: 20,
        height: 20,
    },
    remember_pwd: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    text_link: {
        color: 'green',
        fontSize: 12,
    },
    text: {
        fontSize: 12,
    },
    text_login: {
        fontWeight: 'bold',
        fontSize: 25,
    },
    button: {
        backgroundColor: '#B87243',
        justifyContent: 'center',
        alignItems: 'center',
        height: 44,
        width: '50%',
        marginTop: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    text_button: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#FCEADE',
    },
    container: {
        height: 380,
        width: '90%',
        backgroundColor: '#FCEADE',
        borderRadius: 15,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 30,
    },
    view_global: {
        flex: 1,
        padding: 20,
        backgroundColor: '#B87243',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text_input: {
        width: '100%',
        color: '#000000',
        fontSize: 16,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderWidth: 2,
        borderColor: '#000000',
    },
    view_pwd: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    error: {
        width: '100%',
        color: '#FF0000',
        fontSize: 12,
    },
});