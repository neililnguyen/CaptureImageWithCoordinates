// src/components/CameraCapture.tsx
import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import { Button, Box, Typography } from '@mui/material';
import { Fade } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt'; // Biểu tượng cho camera

export interface CaptureImageWithCoordinates { image: string; dateTime: string; location: { latitude: number; longitude: number } | null };
interface CameraCaptureProps {
    onImageCaptured: (imageData: CaptureImageWithCoordinates) => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onImageCaptured }) => {
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [currentDateTime, setCurrentDateTime] = useState<string>('');
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [isFrontCamera, setIsFrontCamera] = useState<boolean>(true); // Trạng thái camera

    useEffect(() => {
        const date = new Date();
        setCurrentDateTime(date.toLocaleString());

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            });
        }
    }, []);

    const capture = () => {
        if (webcamRef.current && canvasRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) {
                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');
                const img = new Image();
                img.src = imageSrc;

                img.onload = () => {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    context?.drawImage(img, 0, 0);
                    context!.font = '24px Arial';
                    context!.fillStyle = 'white';
                    context!.fillText(`Ngày giờ: ${currentDateTime}`, 10, 30);
                    if (location) {
                        context!.fillText(`Vị trí: Latitude ${location.latitude}, Longitude ${location.longitude}`, 10, 60);
                    }

                    const imageWithInfo = canvas.toDataURL('image/jpeg');
                    setCapturedImage(imageWithInfo);
                    onImageCaptured({ image: imageWithInfo, dateTime: currentDateTime, location });
                };
            }
        }
    };

    // Hàm để chuyển đổi camera
    const toggleCamera = () => {
        setIsFrontCamera((prev) => !prev);
    };

    return (
        <Box sx={{ textAlign: 'center' }}>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                width="100%"
                videoConstraints={{ facingMode: isFrontCamera ? "user" : "environment" }} // Chuyển đổi camera
            />
            <Button variant="contained" onClick={capture} sx={{ mt: 2 }}>
                Chụp Hình
            </Button>
            <Button variant="contained" onClick={toggleCamera} sx={{ mt: 2, marginLeft: 1 }}>
                <CameraAltIcon /> {isFrontCamera ? 'Camera Sau' : 'Camera Trước'}
            </Button>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            {/* {capturedImage && (
        <Fade in={true}>
          <img src={capturedImage} alt="Captured" style={{ marginTop: '20px', borderRadius: '8px', maxWidth: '100%' }} />
        </Fade>
      )} */}
        </Box>
    );
};

export default CameraCapture;
