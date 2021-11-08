import * as React from 'react';
import {TextInput, KeyboardAvoidingView, findNodeHandle} from 'react-native';
import {RegisterOptions, FieldError} from 'react-hook-form';

interface ValidationMap {
    [key: string]: RegisterOptions;
}

interface ErrorMap {
    [key: string]: FieldError | undefined;
}

interface Props {
    children: JSX.Element | JSX.Element[];
    register: (
        field: { name: string },
        validation?: RegisterOptions
    ) => void;
    errors: ErrorMap;
    validation: ValidationMap;
    setValue: (name: string, value: string, validate?: boolean) => void;
}

export default ({
                    register,
                    errors,
                    setValue,
                    validation,
                    children,
                }: Props) => {
    const Inputs = React.useRef<Array<TextInput>>([]);

    React.useEffect(() => {
        (Array.isArray(children) ? [...children] : [children]).forEach((child) => {
            if (child.props.name)
                register({name: child.props.name}, validation[child.props.name]);
        });
    }, [register]);

    return (
        <>
            {(Array.isArray(children) ? [...children] : [children]).map(
                (child, i) => {
                    return child.props.name
                        ? React.createElement(child.type, {
                            ...{
                                ...child.props,
                                ref: (e: TextInput) => {
                                    Inputs.current[i] = e;
                                },
                                onChangeText: (v: string) =>
                                    setValue(child.props.name, v, true),
                                onSubmitEditing: () => {
                                    Inputs.current[i + 1]
                                        ? Inputs.current[i + 1].focus()
                                        : Inputs.current[i].blur();
                                },
                                //onBlur: () => triggerValidation(child.props.name),
                                blurOnSubmit: false,
                                // name: child.props.name,
                                error: errors[child.props.name],
                            },
                        })
                        : child;
                }
            )}
        </>
    );
};
