
import Styles from "../Styles/Button.module.css"
import { useNavigate } from 'react-router-dom';

function Button({text,color,bgColor}) {
    
  return (
    <div className={Styles.btn} >
        <button style={{...style.btn,color:color?color:"white",
            backgroundColor:bgColor?bgColor:"black",
            
        }}>{text}</button>
    </div>
  )
}
const style={

    

}
export default Button
