import { Text, TextProps } from "react-native";
import { styled as styledNW } from "nativewind";
import styled from "styled-components/native";

const CustomTextSC = styled.Text`
    color: ${({theme}) => theme.colors.text};
`



export default styledNW(CustomTextSC);