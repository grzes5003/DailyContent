import React, {useEffect} from 'react';
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
// Components
import SizedBox from '../components/SizedBox';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {connect, ConnectedProps, useDispatch, useSelector} from 'react-redux';
import * as yup from "yup";
import {RootState} from "../types";
import {userActions} from "../_actions/user.actions";
import {useAppDispatch, useAppSelector} from "../_helpers/store.hooks";
import {authActions} from "../_actions/auth.actions";
import {useNavigation} from "@react-navigation/native";
import {selectLoggedIn} from "../_reducers/auth.reducer";
import Container from "@react-navigation/native-stack/lib/typescript/src/views/DebugContainer.native";
import Toast from "react-native-toast-message";

// const mapState = (state: RootState) => ({
//     loggedIn: state.authentication.loggedIn
// })
//
// const mapDispatch = {
//     login: (username: string, password: string) => (userActions.login(username, password))
// }

// const connector = connect(mapState, mapDispatch)
// type PropsFromRedux = ConnectedProps<typeof connector>
// type Props = PropsFromRedux;

interface FormData {
    username: string;
    password: string;
}

const schema = yup.object().shape({
    username: yup.string()
        // .email("Please enter valid email")
        .required('Username Address is Required'),
    password: yup.string()
        .min(1, ({min}) => `Password must be at least ${min} characters`)
        .required('Password is required'),
}).required();

const LoginScreen = () => {
    const usernameInput = React.useRef<TextInput>(null);
    const passwordInput = React.useRef<TextInput>(null);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const selectAuthErrors = useAppSelector((state) => state.auth.error)
    const selectAuthLoading = useAppSelector((state) => state.auth.loading)
    const selectAuthLogged = useAppSelector(selectLoggedIn)

    const {control, handleSubmit} = useForm<FormData>({
        defaultValues: {
            username: '',
            password: '',
        },
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(schema)
    });

    // const handleResponse = (username: string, password: string) => new Promise((resolve, reject) => {
    //     console.log(`Data: ${username}, ${password}`);
    //     dispatch(authActions.login({username, password}));
    //
    //     selectAuthErrors.length === 0 ? resolve() : reject(selectAuthErrors);
    // });

    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const onSubmit = handleSubmit(({username, password}) => {
        console.log(`Data: ${username}, ${password}`)
        Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Bad login or password'
        });
        dispatch(authActions.login({username, password}))
        // if (selectAuthErrors.length === 0) {
        //     navigation.navigate("Home")
        // } else {
        //     Alert.alert(selectAuthErrors)
        // }
    });


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.root}>
                <SafeAreaView style={styles.safeAreaView}>
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.content}
                    >
                        <Text style={styles.title}>Welcome back!</Text>

                        <SizedBox height={8}/>

                        <Text style={styles.subtitle}>Sign in to your account</Text>

                        <SizedBox height={32}/>

                        <Pressable onPress={() => usernameInput.current?.focus()}>
                            <View style={styles.form}>
                                <Text style={styles.label}>Username</Text>

                                <Controller
                                    control={control}
                                    name="username"
                                    //~ @ts-ignore
                                    render={({
                                                 field: {onBlur, onChange, value},
                                                 fieldState: {invalid, error}
                                             }) => (
                                        <>
                                            <TextInput
                                                autoCapitalize="none"
                                                autoCompleteType="username"
                                                autoCorrect={false}
                                                keyboardType="email-address"
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                onSubmitEditing={() => passwordInput.current?.focus()}
                                                ref={usernameInput}
                                                returnKeyType="next"
                                                style={styles.textInput}
                                                textContentType="username"
                                                value={value}
                                            />
                                            {invalid && error &&
                                            <Text style={styles.textError}>{error.message}</Text>
                                            }
                                        </>
                                    )}
                                />


                            </View>
                        </Pressable>

                        <SizedBox height={16}/>

                        <Pressable onPress={() => passwordInput.current?.focus()}>
                            <View style={styles.form}>
                                <Text style={styles.label}>Password</Text>

                                <Controller
                                    control={control}
                                    name="password"
                                    render={({
                                                 field: {onBlur, onChange, value},
                                                 fieldState: {invalid, error}
                                             }) => (
                                        <>
                                            <TextInput
                                                autoCapitalize="none"
                                                autoCompleteType="password"
                                                autoCorrect={false}
                                                onBlur={onBlur}
                                                onChangeText={onChange}
                                                onSubmitEditing={onSubmit}
                                                ref={passwordInput}
                                                returnKeyType="done"
                                                secureTextEntry
                                                style={styles.textInput}
                                                textContentType="password"
                                                value={value}
                                            />
                                            {invalid && error &&
                                            <Text style={styles.textError}>{error.message}</Text>
                                            }
                                        </>
                                    )}
                                />
                            </View>
                        </Pressable>

                        <SizedBox height={16}/>

                        <View style={styles.forgotPasswordContainer}>
                            <Text onPress={() => {
                                Alert.alert('No implemented :/')
                            }} style={styles.textButton}>Forgot password?</Text>
                        </View>

                        <SizedBox height={16}/>

                        <TouchableOpacity onPress={onSubmit}>
                            <View style={styles.button}>
                                <Text style={styles.buttonTitle}>Login</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.orText}>
                            <Text style={[styles.buttonTitle, {textAlign: 'center'}]}>Or</Text>
                        </View>
                        <TouchableOpacity onPress={onSubmit}>
                            <View style={styles.button}>
                                <Text style={styles.buttonTitle}>Register</Text>
                            </View>
                        </TouchableOpacity>

                    </KeyboardAvoidingView>
                </SafeAreaView>
                <Toast />
            </View>
        </TouchableWithoutFeedback>
    );
};

// export default connector(LoginScreen)
export default LoginScreen

const styles = StyleSheet.create({
    orText: {
        marginTop: '2%',
        marginBottom: '2%',
        width: '100%',
        display: "flex",
        justifyContent: 'center',
        textAlign: "center"
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'rgb(93, 95, 222)',
        borderRadius: 8,
        height: 48,
        justifyContent: 'center',
    },
    buttonTitle: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '600',
        lineHeight: 22,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 32,
    },
    forgotPasswordContainer: {
        alignItems: 'flex-end',
    },
    form: {
        alignItems: 'center',
        backgroundColor: 'rgb(58, 58, 60)',
        borderRadius: 8,
        flexDirection: 'row',
        height: 48,
        paddingHorizontal: 16,
    },
    label: {
        color: 'rgba(235, 235, 245, 0.6)',
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 20,
        width: 80,
    },
    root: {
        backgroundColor: '#000000',
        flex: 1,
    },
    safeAreaView: {
        flex: 1,
    },
    subtitle: {
        color: 'rgba(235, 235, 245, 0.6)',
        fontSize: 17,
        fontWeight: '400',
        lineHeight: 22,
    },
    textButton: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '400',
        lineHeight: 20,
    },
    textInput: {
        color: '#FFFFFF',
        flex: 1,
    },
    textError: {
        color: 'red'
    },
    title: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: '700',
        lineHeight: 34,
    },
});
