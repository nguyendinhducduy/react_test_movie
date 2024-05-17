
import style from "./styles.module.scss";
import logo from "/logo.svg";
import img01 from "/img01.jpg";
import { Link } from "react-router-dom";

export default function Banner() {
    return (
        <div className={style.banner}>
            <Link className={style.banner__logo} to="/"><img src={logo} alt=""></img></Link>
            <img className={style.banner__background} src={img01} alt="" />
        </div>
    )
}
