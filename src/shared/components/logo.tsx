import { useAssets } from 'expo-asset';
import { Image, ImageProps } from 'expo-image';


export type LogoImageProps = ImageProps & {
    size: number
}

export default function LogoImage({ size, style }: LogoImageProps) {
    // const [assets, error] = useAssets([require('@/src/shared/assets/images/logo-icon.png')]);
    const [assets, error] = useAssets([require('@/src/shared/assets/logo/logo.svg')]);

    if (!assets) {
        return null
    }

    return (
        <Image 
            source={assets[0]}
            style={[{width: size, height: size}, style]}
            contentFit='contain'
        />
    )
}
