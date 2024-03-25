import { useState } from "react";
import { useDropzone } from 'react-dropzone';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Spacer,
  Divider,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  HStack,
  Center,
  Text,
  useToast
} from "@chakra-ui/react";
import { 
    AttachmentIcon,
    SearchIcon,
    Search2Icon,
    PlusSquareIcon
} from '@chakra-ui/icons';

import ImageCardList from "./image-card-list";

export default function ImageUploader({ images, setImages }) {
    const [searchInput, setSearchInput] = useState('');
    const fileNotUploadedToast = useToast()
  
    const deleteImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const { getRootProps, getInputProps } = useDropzone({
        accept: {'image/*': ['.jpeg', '.jpg', '.png'],},
        onDrop: (acceptedFiles) => {
            const files = acceptedFiles;
            const uploadedImages = Array.from(files).map(file => ({
                url: URL.createObjectURL(file),
                name: file.name
            }));
            setImages(uploadedImages);
        }
    });

    return (

        <Stack
        spacing={4}
        >

        <Divider />
        
        <FormControl>
            <InputGroup>
            <Input
                type="file" 
                multiple
                accept="image/png, image/jpeg"
                hidden
                id="file-input"
                onChange={(event) => {
                    const files = event.target.files;
                    const files_length = files.length;
                    const uploadedImages = Array.from(files)
                    .filter(file => !images.some(image => image.name === file.name))
                    .map(file => ({
                        url: URL.createObjectURL(file),
                        name: file.name
                    }));
                    setImages(oldImages => [...oldImages, ...uploadedImages]);
                    const files_diff = files_length - uploadedImages.length;
                    if(files_diff > 0){
                        fileNotUploadedToast.closeAll()
                        fileNotUploadedToast({
                            title: `${files_diff} file${files_diff > 1 ? 's' : ''} not uploaded`,
                            description: "Files cannot have the same name",
                            status: 'warning',
                            duration: 3000,
                          })
                    }
                }}
            />



                <Button
                    leftIcon={<AttachmentIcon />}
                    onClick={() => {
                        const fileInput = document.getElementById('file-input');
                        fileInput.value = '';
                        fileInput.click();
                    }}
                    mr={5}
                >
                    Choose Files
                </Button>

                {images.length > 0 && (
                    <InputGroup width="50%">
                        <InputLeftElement
                            pointerEvents="none"
                            children={<Search2Icon color="gray.300" />}
                        />
                        <Input
                            value = {searchInput}
                            placeholder="Search"
                            onChange={(event) => {
                                // TODO: I should uhh sanitize this better
                                const sanitizedInput = event.target.value.replace(/[*+?^${}()|[\]\\]/g, '');
                                setSearchInput(sanitizedInput);
                            }}
                        />
                    </InputGroup>
                )}

                {images.length > 0 && (
                    <Button
                        colorScheme="red"
                        onClick={() => {
                            setImages([]);
                        }}
                        ml = "auto"
                    >
                        Clear All
                    </Button>
                )}


            </InputGroup>
        </FormControl>

        {images.length > 0 && (
            <Divider />
        )}

        <ImageCardList images={images} deleteImage={deleteImage} searchInput={searchInput}/>
        
        {images.length == 0 && (
            <Box {...getRootProps({onClick: e => e.stopPropagation()})} 
                height={{ base: "50vh", md: "50vh" }}
                width="100%" 
                borderWidth="2px" 
                borderRadius="md" 
                borderColor="gray.500" 
                borderStyle="dashed"
                display="flex" 
                alignItems="center" 
                justifyContent="center"
                >
                <input {...getInputProps()} />
                <Stack direction="row" spacing={2} align="center">
                    <PlusSquareIcon 
                        boxSize={6} 
                        color="gray.500"
                    />
                    <Text
                        textAlign="center"
                        color="gray.500"
                    >Drop Files </Text>
                </Stack>
            </Box>
        )}
        
        </Stack>
      
    );
  };