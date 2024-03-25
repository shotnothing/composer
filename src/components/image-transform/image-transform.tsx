import React, {useState} from 'react';

import {
    Flex,
    Stack,
    Box,
    Tab,
    Tabs,
    TabList,
    TabPanels,
    TabPanel,
    Text,
    Heading,
    Spacer,
    Divider,
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Card,
    HStack,
  } from "@chakra-ui/react";

import {
    AddIcon
} from '@chakra-ui/icons';

import ImageTransformCardList from './image-transform-card-list';

import AddTextPropertyCard from './property-cards/add-text-property-card';
import AddCustomTextPropertyCard from './property-cards/add-custom-text-property-card';
import DuplicatePropertyCard from './property-cards/duplicate-property-card';
import AddQRCodePropertyCard from './property-cards/add-qr-code-property-card';
import AddCustomQRCodePropertyCard from './property-cards/add-custom-qr-code-property-card';

export default function ImageTransform({images, transforms, setTransforms}) { 
    const [selectedTransform, setSelectedTransform] = useState(0);

    const transformTypes = [
        {
            type: 'Add QR Code', 
            description: 'Add a QR Code to each image.',
            propertyCard: AddQRCodePropertyCard, 
            defaultProperties: {
                text: 'www.example.com',
                x: 0,
                y: 0,
                errorCorrectionLevel: 'H',
                margin: 4,
                fgColor: '#000000',
                bgColor: '#ffffff',
                width: 100,
                scale: 4,
                displayFunction: (properties) => properties.text,
            },
        },
        {
            type: 'Add Custom QR Code', 
            description: 'Add custom QR Code to each image, from a CSV list of urls.',
            propertyCard: AddCustomQRCodePropertyCard, 
            defaultProperties: {
                texts: ['001', '002', '003', '004', '005', '006', '007', '008', '009', '010'],
                x: 0,
                y: 0,
                errorCorrectionLevel: 'H',
                margin: 4,
                fgColor: '#000000',
                bgColor: '#ffffff',
                width: 100,
                scale: 4,
                displayFunction: (properties) => `${
                    properties.texts.filter(text => text.replace(/^\n|\n$/g, '').length > 0).length
                } Lines`,
            },
        },
        {
            type: 'Add Text', 
            description: 'Add text to each image.',
            propertyCard: AddTextPropertyCard, 
            defaultProperties: {
                text: 'Placeholder Text',
                fontFamily: 'Courier New',
                fontSize: 40,
                color: '#ff9100',
                fontWeight: 'bold',
                xAnchor: 'center',
                yAnchor: 'middle',
                x: 0,
                y: 0,
                wrap: true,
                wrapWidth: 200,
                displayFunction: (properties) => properties.text,
            },

        },
        {
            type: 'Add Custom Text', 
            description: 'Add custom text to each image, from a CSV list of texts.',
            propertyCard: AddCustomTextPropertyCard, 
            defaultProperties: {
                texts: ['Placeholder Text 1', 'Placeholder Text 2', 'Placeholder Text 3', 'Placeholder Text 4'],
                fontFamily: 'Courier New',
                fontSize: 40,
                color: '#ff9100',
                fontWeight: 'bold',
                xAnchor: 'center',
                yAnchor: 'middle',
                x: 0,
                y: 0,
                wrap: true,
                wrapWidth: 200,
                displayFunction: (properties) => `${
                    properties.texts.filter(text => text.replace(/^\n|\n$/g, '').length > 0).length
                } Lines`,
            },
        },
        {
            type: 'Duplicate', 
            description: 'Duplicate images to fit dimension requirements of other transforms.',
            propertyCard: DuplicatePropertyCard, 
            defaultProperties: {
                copies: 2,
                displayFunction: (properties) => `${properties.copies} Copies`,
            },
        },
    ]

    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef<HTMLButtonElement | null>(null);

    const [id_acc, setIdAcc] = useState(transforms.length + 1);

    const deleteTransform = (id) => {
        setTransforms(transforms.filter(transform => transform.id !== id))
    }
    
    const updateTransform = (id, properties) => {
        const newTransforms = transforms.map(transform => {
            if (transform.id === id) {
                return {
                    ...transform,
                    properties: { ...transform.properties, ...properties },
                    display: properties.displayFunction(properties),
                }
            }
            return transform
        })
        setTransforms(newTransforms)
    }

    const selectedTransformFull = transforms.find(transform => transform.id === selectedTransform.toString())
    const PropertyCard = selectedTransformFull ? selectedTransformFull.propertyCard : null

    return (
        <div>
            <HStack>
            <Box
                mt={2}
                borderRadius="lg"
                p={4}
                width="40%"
                height="62vh" // I can't get 100% to work here
                backgroundColor="gray.100"
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems='center'
                    flexDirection='row'
                    mb={2}
                >
                    <Heading 
                        size='md'
                        color={'gray.500'}
                    >
                        Transforms
                    </Heading>
                    <Button
                        mb={0}
                        color={'gray.500'}
                        ref={btnRef}
                        onClick={onOpen}
                    ><AddIcon /></Button>
                </Box>
                <Box
                    height="53vh" // I can't get 100% to work here
                    overflowY='auto'
                >
                    <ImageTransformCardList 
                        transforms={transforms} 
                        setTransforms={setTransforms} 
                        deleteTransform={deleteTransform}
                        selectedTransform={selectedTransform}
                        setSelectedTransform={setSelectedTransform}
                    />
                </Box>
            </Box>

            <Box
                mt={2}
                borderRadius="lg"
                p={4}
                width="60%"
                height="62vh" // I can't get 100% to work here
                borderWidth="1px"
            >
                <Heading 
                    mt={2}
                    mb={4}
                    size='md'
                    color={'gray.500'}
                >Properties</Heading>

                <Divider
                    mb={4}  
                ></Divider>

                <Flex
                    justifyContent='center'
                    alignItems='center'
                    height='90%'
                >
                    {!selectedTransformFull && (
                        <Text
                            color='gray.500'
                            mb={8}
                        >
                            Select a transform to view its properties
                        </Text>
                    )}
                    {selectedTransformFull && 
                        <selectedTransformFull.propertyCard
                            transform = {selectedTransformFull}
                            updateTransform = {
                                (properties) => updateTransform(selectedTransformFull.id, properties)
                            }
                        />
                    }
                </Flex>
                
            </Box>

            </HStack>





            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Select Transformation</DrawerHeader>

                <DrawerBody>
                    {transformTypes.map((transformType, index) => (
                        <Card
                            key={index}
                            display="flex"
                            justifyContent="space-between"
                            alignItems='center'
                            flexDirection='row'
                            mb={4}
                            p = {2}
                        >
                            <Box>
                                <Heading size='sm'>{transformType.type}</Heading>
                                <Text
                                    color='gray.600'
                                >{transformType.description}</Text>
                            </Box>
                            <Button
                                onClick={() => {
                                    setTransforms([...transforms, {
                                        id: id_acc.toString(),
                                        type: transformType.type,
                                        propertyCard: transformType.propertyCard,
                                        properties: transformType.defaultProperties,
                                        display: transformType.defaultProperties.displayFunction(transformType.defaultProperties),
                                    }])
                                    onClose()
                                    setIdAcc(id_acc + 1)
                                }}
                            >Add</Button>
                        </Card>
                    ))}
                </DrawerBody>

                <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={onClose}>
                    Cancel
                    </Button>
                </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
  }
  

