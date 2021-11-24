import React from 'react';
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
import {connect, ConnectedProps, useDispatch} from 'react-redux';
import * as yup from "yup";
import {RootState} from "../types";
import {userActions} from "../_actions/user.actions";
import {useAppDispatch} from "../_helpers/store.hooks";
import {authActions} from "../_actions/auth.actions";

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
    const dispatch = useDispatch()

    const {control, handleSubmit} = useForm<FormData>({
        defaultValues: {
            username: '',
            password: '',
        },
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(schema)
    });

    const onSubmit = handleSubmit(({username, password}) => {
        console.log(`Data: ${username}, ${password}`)
        Alert.alert('Data', `Username: ${username}\nPassword: ${password}`);
        // props.login(email,password);
        dispatch(authActions.login({username, password}))
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
                            <Text style={styles.textButton}>Forgot password?</Text>
                        </View>

                        <SizedBox height={16}/>

                        <TouchableOpacity onPress={onSubmit}>
                            <View style={styles.button}>
                                <Text style={styles.buttonTitle}>Continue</Text>
                            </View>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </View>
        </TouchableWithoutFeedback>
    );
};

// export default connector(LoginScreen)
export default LoginScreen

const styles = StyleSheet.create({
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
