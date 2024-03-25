import { useState } from "react";

import JSZip from 'jszip';
import { saveAs } from 'file-saver';

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
    PlusSquareIcon,
    DownloadIcon,
} from '@chakra-ui/icons';

import ImageCardList from "../image-uploader/image-card-list";

export default function ImageExport({ generateOutputImages }) {
    const outputImages = generateOutputImages();
    const [searchInput, setSearchInput] = useState('');

    const handleDownloadAll = async () => {
        const zip = new JSZip();
        const imageFolder = zip.folder("");
    
        await Promise.all(outputImages.map(async (image, index) => {
            const response = await fetch(image.url);
            const blob = await response.blob();
            imageFolder.file(image.name, blob, {binary: true});
        }));
    
        zip.generateAsync({type:"blob"}).then(content => {
            saveAs(content, "images.zip");
        });
    };

    return (
        <Stack
        spacing={4}
        >
            <Divider />

            <HStack
                width="100%"
                justifyContent="space-between"
            >
                <Text>Output: {outputImages.length} images</Text>
                {outputImages.length > 0 && (
                        <InputGroup width="50%">
                            <InputLeftElement
                                pointerEvents="none"
                                children={<Search2Icon color="gray.300" />}
                            />
                            <Input
                                value = {searchInput}
                                placeholder="Search"
                                onChange={(event) => {
                                    const sanitizedInput = event.target.value.replace(/[*+?^${}()|[\]\\]/g, '');
                                    setSearchInput(sanitizedInput);
                                }}
                            />
                        </InputGroup>
                    )}

                    {outputImages.length > 0 && (
                        <Button onClick={handleDownloadAll}
                            leftIcon={<DownloadIcon />}
                        >
                            Download All
                        </Button>
                    )}
            </HStack>

            <ImageCardList images={outputImages} searchInput={searchInput}/>
        </Stack>
    )

  };