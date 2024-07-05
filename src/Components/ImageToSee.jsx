import axios from "axios";
import { useEffect, useState } from "react";



const ImageToSee = () => {
    const [images, setImages] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:8000/imageGet")
        .then(res => {
            console.log(res.data)
            setImages(res.data)
        })
        .then(err => console.log(err))
        console.log("Hello Here");
    },[])
    return (
        <div className="">
            <h3>Hii</h3>
            {
                images?.map(image => <img className="w-96" key={image?._id} src={image?.imageUrl} alt={`Captured Image ${image?.imageUrl}`} style={{ margin: '5px' }} />)
            }
        </div>
    );
};

export default ImageToSee;