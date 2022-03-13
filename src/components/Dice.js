import React from "react";

export default function Dice(props) {
    const styles = {
        backgroundColor : props.selected ? "orange" : "white"
    }



    return(
       <>
           <div className='die-box'
                style={styles}
                onClick={props.selectedDice}
           >
            <div className='die-num'>{props.value}</div>
           </div>
        </>
    )
}

