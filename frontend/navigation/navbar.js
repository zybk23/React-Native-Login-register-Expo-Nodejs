import {createAppContainer,createSwitchNavigator} from "react-navigation"

import SplashScreen from "../screen/SplashScreen";
import SignInScreen from "../screen/SignInScreen";
import SignUpScreen from "../screen/SignUpScreen";

const defaultNavOptions={
    headerStyle:{
        backgroundColor:"#C1C1C1"
    },
    headerTintColor:"#4D0000",
    headerTitleStyle:{
        fontSize:22,
        fontFamily:"sans-serif"
    },
};

const Screens=createSwitchNavigator({
    SplashScreen,
    SignInScreen,
    SignUpScreen,
},{
    defaultNavigationOptions:defaultNavOptions
});

export default createAppContainer(Screens)
