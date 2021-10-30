import { useState, useEffect } from 'react';


// Pixel
// 1. รับ input จากแม่ เป็นค่า 0, 1, 2 - value
// 2. รับ function onclick มาจากแม่
// function PrintMyName (props) {
//     console.log(props.name);
//     return(
//         <h1><b><i>Hello my name is {props.name}</i></b></h1>
//     );
// }

// render <div>Hello my name is Pond</div>

// <PrintMyName name="Pond"/>


// ขั้นตอนทำ state 
// color: gray, blue, red

const colors = ['#E5E7EB', '#2563EB', '#E11D48'];

// value can be 0, 1, or 2 only
function Pixels({ value, clickedOnBoard }) {
    const [color, setColor] = useState(colors[0]);


    // 1. ดักจับการเปลี่ยนแปลงของ value
    // 2. ใช้ useEffect เพื่อดักจับการเปลี่ยนแปลงของ value
    // uesEffect(Fn, array ; () => {}, []) การทำงานของมันคือ Fn จะทำทุกครั้งที่ค่าใน [] เปลี่ยนไป
    //  ชนิดตัวแปรที่เป็นไปได้ใน js
    // integer: 1,2,3,4,5
    // float: 1.23, 2.555, 12.556
    // string: '123', '345345'
    // boolean: true, false
    // array: []
    // object: {}

    useEffect(() => {
        // value = 0, 1, 2
        // colors = ['gray', 'blue', 'red'];
        // console.log(colors[0], colors[1], colors[2]);
        setColor(colors[value]);
    }, [value]); // value = 0, 1 ,2

    return (
        <button className='px-button' onClick={(e) => clickedOnBoard()} style={{ backgroundColor: color }} />
        // <PrintMyName name="Pond"/>
        // props.onClick(event);
    );
}


export default Pixels;
