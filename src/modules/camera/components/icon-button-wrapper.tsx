import { TouchableOpacity, TouchableOpacityProps } from "react-native";


export type IconButtonWrapperProps = {
    containerProps?: TouchableOpacityProps;
    size: number,
    children: React.ReactElement,
    handleClick?: () => any;
}

export function IconButtonWrapper({children, ...props}: IconButtonWrapperProps) {
    
    return (
        <TouchableOpacity 
            {...props.containerProps}
            style={[
                { 
                    maxWidth: props.size, width: props.size, 
                    maxHeight: props.size, height: props.size,
                    borderRadius: props.size,
                    borderWidth: 1,
                    borderColor: 'white',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                props.containerProps && props.containerProps.style
            ]}
            onPress={props.handleClick}
            activeOpacity={0.7}
        >
            {children}
        </TouchableOpacity>
    )
}
