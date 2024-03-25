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
    Input,
    HStack,
    Textarea,
    Select,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    VStack,
    InputLeftAddon,
    InputLeftElement,
    InputGroup,
    Radio,
    RadioGroup,
    Checkbox,
  } from "@chakra-ui/react";

  export default function AddTextPropertyCard({
      transform,
      updateTransform,
    }) {
      
    return (
        <Flex
            flexDirection="column"
            width="100%"
            height="100%"
            overflowY={'auto'}
        >
          <HStack
            alignItems="start"
            mb={4}
          >  
            <Heading 
              size='sm'
              ml={2}
              mr={2}
              mt={2}
              color="gray.600"
            >
              Content:
            </Heading>
            <Textarea 
              backgroundColor={"white"}
              placeholder="Start typing some text..."
              value={transform.properties.text}
              onChange={(e) => updateTransform({...transform.properties, text: e.target.value})}
              height={"12vh"}
            ></Textarea >
          </HStack>

        <HStack
          alignItems="start"
          mb={4}
        >
          <Heading 
            size='sm'
            ml={2}
            mr={2}
            color="gray.600"
          >
            Position:
          </Heading>

          <HStack>
            <InputGroup>
              <InputLeftAddon width="4vh" justifyContent={'center'}>X</InputLeftAddon>
              <NumberInput defaultValue={transform.properties.x} precision={0}
                onChange={(value) => updateTransform({...transform.properties, x: value})}
              >
                <NumberInputField prefix="X: " />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput> 
            </InputGroup>

            <InputGroup>
              <InputLeftAddon width="4vh" justifyContent={'center'}>Y</InputLeftAddon>
              <NumberInput defaultValue={transform.properties.y} precision={0}
                onChange={(value) => updateTransform({...transform.properties, y: value})}
              >
                <NumberInputField prefix="Y: " />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              </InputGroup>  
           
            </HStack>
          </HStack>


          <HStack
            alignItems="start"
            mb={4}
          >  
            <Heading 
              size='sm'
              ml={2}
              mr={2}
              mt={2}
              color="gray.600"
              flex={3}
            >
              Error Correction:
            </Heading>

            <Select
              flex={5}
              value={transform.properties.errorCorrectionLevel}
              onChange={(e) => updateTransform({...transform.properties, errorCorrectionLevel: e.target.value})}
            >
              <option value='L'>L (7% can be restored)</option>
              <option value='M'>M (15% can be restored)</option>
              <option value='Q'>Q (25% can be restored)</option>
              <option value='H'>H (30% can be restored)</option>
            </Select>
          </HStack>






          <HStack
            alignItems="start"
            mb={2}
          >  
            <Heading 
              size='sm'
              ml={2}
              mr={2}
              mt={2}
              color="gray.600"
              flex={3}
            >
              Sizes:
            </Heading>
          </HStack>

          <HStack
            alignItems="start"
            mt={2}
            mb={4}
          >  
              <InputGroup width={"100%"}>
                <InputLeftAddon justifyContent={'center'}>Margin</InputLeftAddon>
                <NumberInput defaultValue={transform.properties.margin} precision={0}
                  onChange={(value) => updateTransform({...transform.properties, margin: value})}
                >
                  <NumberInputField/>
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput> 
              </InputGroup>

              <InputGroup>
                <InputLeftAddon justifyContent={'center'}>Width</InputLeftAddon>
                <NumberInput defaultValue={transform.properties.width} precision={0}
                  onChange={(value) => updateTransform({...transform.properties, width: value})}
                >
                  <NumberInputField/>
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput> 
              </InputGroup>
          </HStack>
          

          <HStack
            alignItems="start"
            mb={4}
          >  
            <Heading 
              size='sm'
              ml={2}
              mr={2}
              mt={2}
              color="gray.600"
              flex={3}
            >
              Colors:
            </Heading>
          </HStack>

          <HStack
            alignItems="start"
            mb={4}
          >
            <InputGroup>
              <InputLeftAddon justifyContent={'center'}>Foreground</InputLeftAddon>
              <Input 
                type="color"
                value={transform.properties.fgColor}
                onChange={(e) => updateTransform({...transform.properties, fgColor: e.target.value})}
              />
            </InputGroup>

            <InputGroup>
              <InputLeftAddon justifyContent={'center'}>Background</InputLeftAddon>
              <Input 
                type="color"
                value={transform.properties.bgColor}
                onChange={(e) => updateTransform({...transform.properties, bgColor: e.target.value})}
              />
            </InputGroup>

          </HStack>


        </Flex>
    )
  }