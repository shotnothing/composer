import React, { useState, useMemo } from 'react';

import {
    Image,
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Link,
    Avatar,
    FormControl,
    FormHelperText,
    InputRightElement,
    Text,
    SimpleGrid,
    HStack,
    AspectRatio,
    VStack,
    Spacer,
    Select,
} from "@chakra-ui/react";

import {
    ArrowLeftIcon,
    ArrowRightIcon,
    Search2Icon, 
    ChevronLeftIcon,
    ChevronRightIcon,
} from '@chakra-ui/icons';

interface ImageData {
    filename: string;
    url: string;
}

interface ImagePreviewProps {
    images: ImageData[];
}

import {pipeline} from '../transforms/pipeline';

const ImagePreview: React.FC<ImagePreviewProps> = ({ images, transforms }) => {
    let newImages = pipeline(images, transforms)

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [filteredImages, setfilteredImages] = useState(newImages);



    const handlePreviousImage = () => {
        setCurrentImageIndex((currentImageIndex) => 
            (((currentImageIndex - 1) % filteredImages.length) + filteredImages.length) % filteredImages.length
        );
    };

    const handleNextImage = () => {
        setCurrentImageIndex((currentImageIndex) => (currentImageIndex + 1) % filteredImages.length);
    };

    const handleSearchImage = (filename: string) => {
        setfilteredImages((filteredImages) => 
            images.filter((image) => image.name
                .toLowerCase()
                .includes(filename.toLowerCase()
        )));
        setCurrentImageIndex(0);
    };

    function handleImageChange(event) {
        const selectedImageIndex = Number(event.target.value);
        setCurrentImageIndex(selectedImageIndex);
    }

    

    return (
        <Flex
            flexDirection="column" 
            alignItems="center"
        >
            <Heading 
                size='md'
                mb={4}
                color={'gray.600'}
            >
            Preview
            </Heading>

            <Box
                borderWidth="2px"
                borderRadius="md"
                borderStyle='dotted'
                p={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="18vw"
                height="29vw"
                mb={4} 
            > 
                {filteredImages.length > 0 && (
                    <Image 
                        src={newImages[currentImageIndex].url}
                        alt={newImages[currentImageIndex].name} 
                        objectFit="contain"
                        width="100%"
                        height="100%"
                    />
                )}
                {filteredImages.length === 0 && (
                    <Text
                        color="gray.400"
                    >
                        No images selected
                    </Text>
                )}

            </Box>
          
            <InputGroup
                width="100%"
                mb={2}
            >
                <Input 
                    placeholder="Filter by name"
                    onChange={(event) => handleSearchImage(event.target.value)}
                    isDisabled={true}
                />
                <InputRightElement>
                    <Search2Icon 
                        color="gray.300"
                    />
                </InputRightElement>
            </InputGroup>


            <HStack
                justifyContent="space-between"
                width={"100%"}
            >
                <Button 
                    onClick={handlePreviousImage}
                >
                    <ChevronLeftIcon />
                </Button>
                
                <Select 
                    value={currentImageIndex}
                    onChange={handleImageChange}
                >
                    {newImages.map((image, index) => (
                        <option key={index} value={index}>
                            {image.name}
                        </option>
                    ))}
                </Select>

                <Button 
                    onClick={handleNextImage}
                >
                    <ChevronRightIcon />
                </Button>
            </HStack>

        </Flex>
    );
};

export default ImagePreview;