import "./Excel.css"
import Smsbar from "./Smsbar"

// https://docs.google.com/spreadsheets/d/1BbATnPvoXQFqbwDwFxQ9-vb-VCypl3Jund8-sBXjz2U/edit?usp=sharing

const Excel=(props)=>{

  function extractSheetInfo(url) {
    const sheetIdRegex = /\/d\/([a-zA-Z0-9-_]+)/;

    const sheetIdMatch = url.match(sheetIdRegex);

    const sheetId = sheetIdMatch ? sheetIdMatch[1] : null;

    return sheetId;
}

const sheetId = extractSheetInfo(props.src);



  return(
    <>
    <iframe src={props.src}  width={"100%"} height={"600vw"}></iframe>
    <Smsbar sheetName = {props.sheetName} sheetId={sheetId}/>
    </>
  
)
}
export default Excel