import axios from "axios";
import React, { useState, useEffect } from "react";
//import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import ProductCard from "./ProductCard";
import { SERVER_URI } from "../config/keys";
import '../App.css'


function GetAllVideosList() {

    let [data, setData] = useState([]);
    //let navigate = useNavigate();


    //console.log(data)



    async function getBooksData() {
         await axios.get(`${SERVER_URI}/getVideos`)
            .then((response) => {
                //console.log(response.data.data)
                setData(response.data.data)
                //alert(`success : ${response.data.message}`)
                Swal.fire({
                    // position: 'top-end',
                    icon: 'success',
                    title: response.data.message,
                    showConfirmButton: false,
                    showClass: {
                      popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                    },
                    timer: 2500
                  }).then(() => {
                    // localStorage.setItem("loggedInUser", values.email);
                    //  navigate("/");
                    //  window.location.reload()
                  })
                })
                .catch((error) => {
                  console.log("error", error.response.data.message)
                  // alert(`Error: ${error.response.data.message}`)
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    showClass: {
                      popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                      popup: 'animate__animated animate__fadeOutUp'
                    },
                    text: error.response.data.message
                  })
                  //window.location.reload();
                })
        //     })
        //     .catch((error) => {
        //         console.log("error :", error.response.data.message)
        //         alert(`Error: ${error.response.data.message}`)
        //     })
        // console.log(result)
        // // setData(result)
    }

    useEffect(() => {
        // if (!localStorage.getItem('token')) {
        //     navigate("/login")
        // }
        getBooksData();

    }, [])

    return (
        <div className="video_div">
            <h2> All videos List</h2>
            <div className="product-wrapper">
                {data.map((item, index) => (
                    <ProductCard
                        key={item._id}
                        id={item._id}
                        name={`${item.title}`}
                        video={item.videoLink}
                    />
                ))}
            </div>

        </div>
    )
}
export default GetAllVideosList;