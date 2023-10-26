import { styled as styledNW } from "nativewind";
import styled from "styled-components/native";

const CustomViewSC = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};
`


export default styledNW(CustomViewSC);