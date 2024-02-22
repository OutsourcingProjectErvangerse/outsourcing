import { createGlobalStyle } from 'styled-components'

const GlobalFontStyle = createGlobalStyle`

@font-face {
    font-family: 'GowunBatang-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/GowunBatang-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'NPSfontBold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2310@1.0/NPSfontBold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
}


@font-face {
    font-family: 'TTHakgyoansimSamulhamR';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2402_keris@1.0/TTHakgyoansimSamulhamR.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}



@font-face {
    font-family: 'SOGANGUNIVERSITYTTF';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2312-1@1.1/SOGANGUNIVERSITYTTF.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
} `

export default GlobalFontStyle
