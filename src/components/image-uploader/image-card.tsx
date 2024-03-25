import { useEffect, useState } from 'react';

import { Box, Button, Image, Text, VStack } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

interface ImageCardProps {
    image: any;
    index: number;
    deleteImage: (index: number) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, index, deleteImage }) => {
    const [imageResolution, setImageResolution] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const img = new window.Image();
        img.onload = () => {
            setImageResolution({ width: img.naturalWidth, height: img.naturalHeight });
        };
        img.src = image.url;
    }, [image.url]);
    
    return (
        <Box 
            borderWidth="1px" 
            borderRadius="md" 
            p={4} display="flex" 
            alignItems="center"
            minW="15vw"
        >
            <Image src={image.url} alt="Image" boxSize="100px" mr={4} />
            <VStack align="start" mr={4}>
                <Text fontWeight="bold">{image.name}</Text>
                <Text>{`${imageResolution.width} x ${imageResolution.height}`}</Text>
            </VStack>
            {deleteImage && (
                <Button colorScheme="red" ml="auto" onClick={() => deleteImage(index)}>
                    <DeleteIcon />
                </Button>
            )}
        </Box>
    );
};

export default ImageCard;