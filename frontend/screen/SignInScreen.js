import React,{useState} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet ,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';
import Axios from "axios";




const SignInScreen = ({navigation}) => {

    const [data,setData]=useState({
        email:"",
        password:"",
        checkTextInputChange:false,
        secureTextEntry:true,
        isValidUser:true,
        isValidPassword:true
    });


    const emailChange=(val)=>{
        if(val.trim().length>=4) {
            setData({
                ...data,
                email: val,
                checkTextInputChange:true,
                isValidUser: true
            });
        }
        else{
            setData({
                ...data,
                email:val,
                checkTextInputChange:false,
                isValidUser:false
            })
        }
    };
    const passwordChange=(val)=>{
        if(val.trim().length>=6){
            setData({
                ...data,
                password:val,
                isValidPassword: true
            });
        }
        else{
            setData({
                ...data,
                password:val,
                isValidPassword:false
            })
        }
    };
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    };

    const handleValidUser=(val)=>{
        if(val.trim().length>=4){
            setData({
                ...data,
                isValidUser:true
            })
        }else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    };

    const login=()=>{
        const{ email, password }=data;
        Axios.post("http://192.168.56.1:5000/api/login",{
            email,
            password,
        }).then(res=>console.log(res))
    };

    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome!</Text>
            </View>
            <Animatable.View
                animation="zoomInUp"
                style={styles.footer}>
                <View style={styles.action}>
                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>Email</Text>
                    <View style={styles.style1}>
                        <View style={{flexDirection:"row"}}>
                            <FontAwesome
                                name="user-o"
                                color={colors.text}
                                size={20}
                            />
                            <TextInput
                                placeholder={"Your Email"}
                                placeholderTextColor="#666666"
                                style={[styles.textInput, {
                                    color: colors.text
                                }]}
                                autoCapitalize="none"
                                onChangeText={(val)=>emailChange(val)}
                                onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
                            />
                        </View>

                        {
                            data.checkTextInputChange ?
                                <Animatable.View
                                    animation="bounceIn"
                                >
                                    <Feather
                                        name="check-circle"
                                        color="green"
                                        size={20}
                                    />
                                </Animatable.View>
                                :null
                        }

                    </View>

                </View>
                <View style={styles.action}>
                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>Password</Text>
                    <View style={styles.style1}>
                        <View style={{flexDirection:"row"}}>
                            <Feather
                                name="lock"
                                color={colors.text}
                                size={20}
                            />
                            <TextInput
                                placeholder={"Your Password"}
                                placeholderTextColor="#666666"
                                secureTextEntry={data.secureTextEntry ? true : false}
                                style={[styles.textInput, {
                                    color: colors.text
                                }]}
                                autoCapitalize="none"
                                onChangeText={(val)=>passwordChange(val)}
                            />
                        </View>

                        <TouchableOpacity
                            onPress={updateSecureTextEntry}
                        >
                            {data.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                />
                                :
                                <Feather
                                    name="eye"
                                    color="grey"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>

                </View>
                <TouchableOpacity>
                    <Text style={{color: '#009387', marginTop:15}}>Forgot password?</Text>
                </TouchableOpacity>
                <View style={styles.button}>
                    <TouchableOpacity
                        onPress={() => login()}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#009387'
                        }]}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUpScreen')}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#009387'
                        }]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

            </Animatable.View>
        </View>
    );
};

SignInScreen.navigationOptions=nav=>{
    return{
        headerTitle:"Login"
    }
};

const styles = StyleSheet.create({
    style1:{
        flexDirection:"row",
        marginTop:10,
        justifyContent:"space-between"

    },
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        marginTop:10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        marginTop: -5,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 20
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default SignInScreen;
