// import { Header } from "./Header";
import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
//import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
//import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { SERVER_URI } from "../config/keys";
import '../App.css'

function Upload() {

    //let navigate = useNavigate();

    useEffect(() => {
        //    if (!localStorage.getItem('token')) {
        //         navigate("/login")
        //    }
    }, [])



    const [file, setFile] = useState("");
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [progress, setProgress] = useState(null);
    console.log(progress)

    let UploadVideoUrl = `${SERVER_URI}/upload`

    function Upload() {

        let formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('description', description);

        axios.post(UploadVideoUrl, formData, {
            onUploadProgress: data => {
                //Set the progress value to show the progress bar
                setProgress(Math.round((100 * data.loaded) / data.total))
            }
        })
            .then((response) => {
                console.log("response", response)
                if (!response.data.status) {
                    console.log(response.data.data);
                }
                alert(`success : ${response.data.message}`);
                setProgress(null);
                window.location.reload();
            })
            .catch((error) => {
                console.log("error :", error.response.data.message)
                alert(`Error: ${error.response.data.message}`);
                setProgress(null);
                window.location.reload();
            })
    }

    return (

        <div className='video_upload'>
            {/* <Header /> */}
            <h3> Upload video</h3>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} className="form-control" placeholder="bookCover" />
            <br />
            <TextField style={{ background: "white" }} value={title} onChange={(e) => setTitle(e.target.value)} label="Title" variant="outlined" />
            <br />
            <TextField style={{ background: "white" }} value={description} onChange={(e) => setDescription(e.target.value)} label="Description" variant="outlined" />
            <br />
            <Button onClick={Upload} variant="contained" sx={{ bgcolor: 'green' }}> Upload Video</Button>
            <br />
            {progress && (
            <Box className='progress_div' >
                <CircularProgress />
                <br />
                <Typography variant="body2" color="text.secondary">
                    {`${progress}%`}
                </Typography>
                <h4>uploading</h4>
            </Box>
            )}
        </div>
    )
}

export default Upload;