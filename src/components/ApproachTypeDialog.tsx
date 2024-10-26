// src/components/ApproachTypeDialog.tsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, RadioGroup, FormControlLabel, Radio, Grid, Box, Typography, Slide, Card, CardMedia, CardContent, IconButton, Modal } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CameraCapture, { CaptureImageWithCoordinates } from './CameraCapture';
import { Email, Message, Person, Phone } from '@mui/icons-material';

interface ApproachTypeDialogProps {
    open: boolean;
    onSelect: (type?: string, imageDatas?: CaptureImageWithCoordinates[]) => void;
}

const Transition = React.forwardRef(function Transition(props: any, ref: any) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ApproachTypeDialog: React.FC<ApproachTypeDialogProps> = ({ open, onSelect }) => {
    const [selectedType, setSelectedType] = useState('');
    const [capturedImages, setCapturedImages] = useState<CaptureImageWithCoordinates[]>([]);
    const [openImage, setOpenImage] = useState<string | null>(null);

    const handleSelect = () => {
        if (selectedType) {
            onSelect(selectedType, capturedImages);
        }
    };

    const handleImageCaptured = (imageData: { image: string; dateTime: string; location: { latitude: number; longitude: number } | null }) => {
        setCapturedImages((prev) => [...prev, imageData]);
    };

    const handleDeleteImage = (index: number) => {
        setCapturedImages((prev) => prev.filter((_, idx) => idx !== index));
    };

    const handleCloseModal = () => {
        setOpenImage(null);
    };

    return (
        <Dialog fullWidth maxWidth='lg' open={open} onClose={() => onSelect()} TransitionComponent={Transition}>
            <DialogTitle>Chọn hình thức tiếp cận</DialogTitle>
            <DialogContent>
                <RadioGroup value={selectedType} onChange={(e) => setSelectedType(e.target.value)} row>
                    <FormControlLabel value="Phone" control={<Radio />} label={<Box sx={{ display: 'flex', alignItems: 'center' }}><Phone sx={{ marginRight: 1 }} />Phone</Box>} />
                    <FormControlLabel value="Message" control={<Radio />} label={<Box sx={{ display: 'flex', alignItems: 'center' }}><Message sx={{ marginRight: 1 }} />Message</Box>} />
                    <FormControlLabel value="Email" control={<Radio />} label={<Box sx={{ display: 'flex', alignItems: 'center' }}><Email sx={{ marginRight: 1 }} />Email</Box>} />
                    <FormControlLabel value="Trực tiếp" control={<Radio />} label={<Box sx={{ display: 'flex', alignItems: 'center' }}><Person sx={{ marginRight: 1 }} />Trực tiếp</Box>} />
                </RadioGroup>

                {/* Hiển thị CameraCapture khi chọn "Trực tiếp" */}
                {selectedType === "Trực tiếp" && (
                    <Grid item xs={12}>
                        <CameraCapture onImageCaptured={handleImageCaptured} />
                        {/* Hiển thị danh sách ảnh đã chụp */}
                        {capturedImages.length > 0 && (
                            <Box mt={2}>
                                <Grid container spacing={2}>
                                    {capturedImages.map((imgData, index) => (
                                        <Grid item xs={12} sm={4} key={index}>
                                            <Card sx={{ position: 'relative' }}>
                                                <CardMedia
                                                    component="img"
                                                    image={imgData.image}
                                                    alt={`Captured ${index}`}
                                                    sx={{ borderRadius: '8px', height: 'auto' }}
                                                />
                                                {/* <CardContent>
                                                    <Typography variant="body2">
                                                        Ngày giờ: {imgData.dateTime} - Vị trí: {imgData.location ? `Latitude ${imgData.location.latitude}, Longitude ${imgData.location.longitude}` : 'Không xác định'}
                                                    </Typography>
                                                </CardContent> */}
                                                <IconButton
                                                    aria-label="fullscreen"
                                                    onClick={() => setOpenImage(imgData.image)}
                                                    sx={{ position: 'absolute', top: 10, right: 40, color: 'blue' }}
                                                >
                                                    <FullscreenIcon />
                                                </IconButton>
                                                <IconButton
                                                    aria-label="delete"
                                                    onClick={() => handleDeleteImage(index)}
                                                    sx={{ position: 'absolute', top: 10, right: 10, color: 'red' }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                                {/* <a href={imgData.image} download={`captured-image-${index}.jpg`}>
                                                    <Button variant="contained" style={{ margin: '10px' }}>
                                                        Tải về
                                                    </Button>
                                                </a> */}
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        )}
                    </Grid>
                )}
            </DialogContent>

            {/* Modal hiển thị ảnh toàn màn hình */}
            <Modal
                open={!!openImage}
                onClose={handleCloseModal}
                sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <Box sx={{ maxWidth: '90%', maxHeight: '90%', overflow: 'auto' }}>
                    <img src={openImage || ''} alt="Fullscreen" style={{ width: '100%', height: 'auto', borderRadius: '8px', scale: 1.5 }} />
                </Box>
            </Modal>

            <DialogActions>
                <Button onClick={() => onSelect()}>Hủy</Button>
                <Button onClick={handleSelect} variant="contained">Chọn</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ApproachTypeDialog;
