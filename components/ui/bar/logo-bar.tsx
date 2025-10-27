import { useThemeColor } from '@/hooks/use-theme-color';
import { useAssets } from 'expo-asset';
import { Image, ImageProps } from 'expo-image';


export type LogoImageProps = ImageProps & {
    size: number
}

export default function LogoImage({ size, style }: LogoImageProps) {
    const [assets, error] = useAssets([require('@/assets/logo/logo.svg')]);
    const logo_color = useThemeColor({}, 'bar_text') 
    
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
