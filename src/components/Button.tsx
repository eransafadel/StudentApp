import styles from "./Button.module.css"
interface Props {
    onClick: ()=>void,
    text:string,
}

const Button: React.FC<Props> = ({onClick,text})=>{
 
return <div className={styles.center}>
<button  className={styles.button} onClick={onClick}>{text} </button>
</div>

};

export default Button;