import { useEffect } from "react";
import { useState } from "react";
const axios = require("axios")


export const Todo = () => {

    const[text,setText] = useState("");
    const[arr,setArr] = useState([]);
    const[page,setPage] = useState(1);


    useEffect( () => {GetData()} , [page])

    function GetData(){

        axios.get(`http://localhost:2022/Todos?_limit=3&_page=${page}`).then( (res) => {setArr(res.data) })
    }

    return(
        <div>
            <input type="text" placeholder="enter here" onChange={ (event) => setText(event.target.value)}/>
            <button id= "bn" onClick={ () => {

                fetch("http://localhost:2022/Todos",
                {
                    method : "POST",
                    body : JSON.stringify({ title :text , status :false }),
                    headers : {"content-type" : "application/json"}
                   
                }).then( () => {GetData()})

            }}> Save </button>

            <div>
                { arr.map( (el) => <div  id="alltodo" key={el.id}> {el.title} </div>)}
            </div>

            <div className="btns">

                <button id= "btn" onClick={ () => {setPage(page-1)} }> Prev </button>

                <button id= "btn" onClick={ () => {setPage(page+1)} }> Next </button>

            </div>

        </div>


    )
}