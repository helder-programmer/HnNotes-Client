import 'styled-components';
import { ITheme } from '../theme';


declare module 'style-components' {
    type ThemeType = typeof ITheme;
    export interface DefaultTheme extends ThemeType {};
}