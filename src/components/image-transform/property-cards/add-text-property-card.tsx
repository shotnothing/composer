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
              Text:
            </Heading>
            <Textarea 
              backgroundColor={"white"}
              placeholder="Start typing some text..."
              value={transform.properties.text}
              onChange={(e) => updateTransform({...transform.properties, text: e.target.value})}
              height={"15vh"}
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
              mt={2}
              color="gray.600"
            >
              Font:
            </Heading>

            <VStack>


              <HStack
                width={"100%"}
              >
              <Select
                flex="5"
                value={transform.properties.fontFamily}
                onChange={(e) => updateTransform({...transform.properties, fontFamily: e.target.value})}
              >
                <option value="Arial">Arial</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Courier New">Courier New</option>
                <option value="Georgia">Georgia</option>
                <option value="Verdana">Verdana</option>
                <option value="Tahoma">Tahoma</option>
                <option value="Trebuchet MS">Trebuchet MS</option>
                <option value="Garamond">Garamond</option>
                <option value="Brush Script MT">Brush Script MT</option>
              </Select>

              <Input 
                flex="1"
                type="color"
                value={transform.properties.color}
                onChange={(e) => updateTransform({...transform.properties, color: e.target.value})}
              />

              </HStack>

              <HStack>
                <Select
                  value={transform.properties.fontWeight}
                  onChange={(e) => updateTransform({...transform.properties, fontWeight: e.target.value})}
                >
                  <option value="normal">Normal</option>
                  <option value="bold">Bold</option>
                </Select>

                <NumberInput defaultValue={transform.properties.fontSize} min={1} max={999}
                  onChange={(value) => updateTransform({...transform.properties, fontSize: value})}
                >
                  <NumberInputField />
                    <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>     
                </NumberInput>
              </HStack>
            </VStack>
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

          <VStack>  

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

            <Text
              color={'gray.500'}
              fontWeight={'bold'}
            >Anchors</Text>

          <HStack>
          <RadioGroup colorScheme='gray' onChange={(v) => updateTransform({...transform.properties, xAnchor: v})} value={transform.properties.xAnchor} mr={20}>
              <Stack direction='column'>
                <Radio value='left'>Left</Radio>
                <Radio value='center'>Center</Radio>
                <Radio value='right'>Right</Radio>
              </Stack>
            </RadioGroup>

            <RadioGroup colorScheme='gray' onChange={(v) => updateTransform({...transform.properties, yAnchor: v})} value={transform.properties.yAnchor}>
              <Stack direction='column'>
                <Radio value='top'>Top</Radio>
                <Radio value='middle'>Middle</Radio>
                <Radio value='bottom'>Bottom</Radio>
              </Stack>
            </RadioGroup>
          </HStack>
          </VStack>  
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
            Wrap:
          </Heading>

          <NumberInput 
            precision={0}
            min={0}
            max={999}
            defaultValue={transform.properties.wrapWidth} 
            onChange={(value) => updateTransform({...transform.properties, wrapWidth: value})}
            isDisabled={!transform.properties.wrap}
          >
            <NumberInputField/>
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>


          <Checkbox 
            defaultChecked
            defaultValue={transform.properties.wrap} 
            onChange={(event) => updateTransform({...transform.properties, wrap: event.target.checked})}
          >Enable</Checkbox>
        </HStack>



        </Flex>
    )
  }