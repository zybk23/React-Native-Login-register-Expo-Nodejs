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
import SignInScreen from "./SignInScreen";




const SignUpScreen = ({navigation}) => {

    const [data,setData]=useState({
        email:"",
        password:"",
        confirmPassword:"",
        checkTextInputChange:false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });
    const [res,setRes]=useState({
        err:"",
        res:""
    });


    const emailChange=(val)=>{
        if( val.length !== 0 ) {
            setData({
                ...data,
                email: val,
                checkTextInputChange: true
            });
        } else {
            setData({
                ...data,
                email: val,
                checkTextInputChange: false
            });
        }
    };
    const passwordChange=(val)=>{
        setData({
            ...data,
            password:val
        })
    };
    const confirmChange=(val)=>{
        setData({
            ...data,
            confirmPassword:val
        })
    };

    const registerUser=()=>{
      const{email,password,confirmPassword}=data;
        Axios.post("http://192.168.56.1:5000/api/register",{
            email,
            password,
            confirmPassword
        }).then(res=>{
            //console.log(res.data.access_token)
            if(!res.data.access_token){
                setRes({
                    err:res.data.message
                })
            }

        }).then(res1=>{
                Alert.alert(`${res.err}`,"Check",[
                    {text:"Ok"}
                ])

        })
            .catch(err=>console.log(err.response))

    };


    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    };

    const updateConfirmSecureTextEntry=()=>{
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    };
    const { colors } = useTheme();
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.text_header}>Register Now!</Text>
            </View>
            <Animatable.View
                animation="fadeInLeft"
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
                            />
                        </View>

                        {data.checkTextInputChange ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
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
                                secureTextEntry={data.secureTextEntry ? true:false}
                                style={styles.textInput}
                                onChangeText={(val)=>passwordChange(val)}
                                autoCapitalize="none"
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
                <View style={styles.action}>
                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>Confirm Password</Text>
                    <View style={styles.style1}>
                        <View style={{flexDirection:"row"}}>
                            <Feather
                                name="lock"
                                color={colors.text}
                                size={20}
                            />
                            <TextInput
                                type={"password"}
                                placeholder={"Your Password"}
                                placeholderTextColor="#666666"
                                secureTextEntry={data.confirm_secureTextEntry ? true:false}
                                style={[styles.textInput, {
                                    color: colors.text
                                }]}
                                onChangeText={(val)=>confirmChange(val)}
                                autoCapitalize="none"
                            />
                        </View>

                        <TouchableOpacity
                            onPress={updateConfirmSecureTextEntry}
                        >
                            {data.confirm_secureTextEntry ?
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
                <View style={styles.textPrivate}>
                    <Text style={styles.color_textPrivate}>
                        By signing up you agree to our
                    </Text>
                    <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                    <Text style={styles.color_textPrivate}>{" "}and</Text>
                    <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignInScreen')}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 5
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#009387'
                        }]}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {registerUser()}}
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

SignUpScreen.navigationOptions=nav=>{
    return{
        headerTitle:"Register"
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
        flex: 5,
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
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 5
    },
    color_textPrivate: {
        color: 'grey'
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
        marginTop: 10
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

export default SignUpScreen;
