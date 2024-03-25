import { useState } from "react";
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
    Spacer,
} from "@chakra-ui/react";

import ImageCard from "./image-card";

export default function ImageCardList({ 
        images, 
        deleteImage,
        searchInput
    }: { 
        images: any[], 
        deleteImage: (index: number) => void,
        searchInput: string
    },) {
    const filteredImages = images.filter(image => new RegExp(searchInput, 'i').test(image.name));
    return (
        <Flex
            direction="column"
            justifyContent="space-between"
            height="100%"
        >
            <SimpleGrid 
            columns={1}
            overflowY="auto"
            maxHeight="50vh"
            >
                {images && filteredImages
                    .map((image, index) => (
                    <ImageCard key={index} image={image} index={index} deleteImage={deleteImage}/>
                ))}
            </SimpleGrid>
            
            <HStack>
                {images.length > 0 && (
                    <Text as="span">{images.length} images</Text>
                )}
                {images.length > filteredImages.length && (
                    <Text as="span" ml='auto'> ({filteredImages.length} results)</Text>
                )}
            </HStack>
        </Flex>
    )

}