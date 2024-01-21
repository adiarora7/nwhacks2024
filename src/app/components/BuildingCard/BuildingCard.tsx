import { Location } from "../Search/SearchBox"
import MotionWrapper from '../motion';
import styles from "./buildingCard.module.scss";

export default function BuildingCard({
    coordinates
  }:{
    coordinates?: Location
  }){

    const showCard = false;

    return(
        <div className={styles.card}>
            <h2 className={styles.cardtitle}>{coordinates?.name}</h2>
            <p className={styles.cardaddress}>{coordinates?.address}</p>
            <div className={styles.accesibilitytags}></div>
            <div className={styles.cardimg}></div>
            <div className={styles.button}></div>
        </div>
    )
}