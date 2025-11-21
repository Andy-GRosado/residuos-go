import BasicInput, { BasicInputProps } from "./input";


export default function TextAreaInput(props: BasicInputProps) {
    return (
        <BasicInput
            {...props}
            multiline
            placeholder={props.placeholder ?? "Escribe algo..."}
            autoCapitalize={props.autoCapitalize ?? 'sentences'}
            numberOfLines={props.numberOfLines ?? 4}
        />
    );
}
