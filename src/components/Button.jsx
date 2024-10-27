
import Styles from "../Styles/Button.module.css"
import { useNavigate } from 'react-router-dom';

function Button({text,color,bgColor,font}) {
    
  return (
    <div className={Styles.btn} >
        <button style={{...style.btn,color:color?color:"white",
            backgroundColor:bgColor?bgColor:"black",
            fontSize:font?font:"15px"
        }}>{text}</button>
    </div>
  )
}
const style={

    

}
export default Button
