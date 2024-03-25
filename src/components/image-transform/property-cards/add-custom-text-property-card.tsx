import React, {useState, useRef} from 'react';
import * as Papa from 'papaparse';

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
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Tooltip,
  } from "@chakra-ui/react";
import { AttachmentIcon, InfoIcon } from '@chakra-ui/icons';

export default function AddCustomTextPropertyCard({
    transform,
    updateTransform,
  }) {
    const [delimiter, setDelimiter] = useState(';')

    const linesFound = transform.properties.texts
      .filter(text => text.replace(/^\n|\n$/g, '').length > 0)
      .length
      .toString()

      const fileInput = useRef(null);

      const handleUploadCSV = (e) => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onload = function(event) {
              const fileContent = event.target.result;
              updateTransform({...transform.properties, texts: fileContent.split(delimiter)});
          };
          reader.readAsText(file);
      };

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
            display={'flex'}
          >  
            <Heading 
              size='sm'
              ml={2}
              mr={2}
              mt={2}
              color="gray.600"
            >
              CSV:
            </Heading>
            <VStack
              alignItems="start"
              display={'flex'}
              width={'100%'}
            >
              <Textarea 
                backgroundColor={"white"}
                placeholder="Start typing some text..."
                value={transform.properties.texts.join(delimiter)}
                onChange={(e) => updateTransform({...transform.properties, texts: e.target.value.split(delimiter)})}
                height={"100%"}
              ></Textarea >

              <HStack
                width={'100%'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >

                <Box flex={4}>
                    <input 
                      type="file" 
                      accept=".csv" 
                      ref={fileInput} 
                      style={{ display: 'none' }} 
                      onChange={handleUploadCSV}
                    />
                    <Button 
                      mr={2} 
                      onClick={() => fileInput.current.click()}
                    >
                        Upload CSV
                    </Button>
                </Box>

                <Box flex={5}>
                  <HStack>
                    <Text
                      color={'orange.500'}
                      fontWeight={'bold'}
                    > {linesFound + ' '
                      }
                    Lines Found
                    </Text>
                    <Tooltip
                      label={`Any images without a line will be dropped`}
                      aria-label="A tooltip"
                    >
                      <InfoIcon color={'gray.600'}/>
                    </Tooltip>
                  </HStack>

                </Box>
              </HStack>

                <VStack
                height={'16vh'}
                spacing={0}
                backgroundColor={'gray.100'}
                p={1}
                width={'100%'}
                >
                  <Text
                    color={'gray.600'}
                    fontWeight={'bold'}
                  >Lines Preview</Text>
                  <SimpleGrid
                    overflowY={'scroll'}
                    flex={3}
                    borderColor={'gray.300'}
                    borderWidth={1}
                    width={'100%'}
                  >
                    {transform.properties.texts.map((text, index) => (
                      <Card
                        key={index}
                        p={1}
                        mb={1}
                      >
                        <Text>{text}</Text>
                      </Card>
                    ))}
                  </SimpleGrid>
                </VStack>
            
            <HStack>
              <Spacer flex={4}/>

            <InputGroup flex={4}>
              <InputLeftAddon>Delimiter</InputLeftAddon>
              <Input 
                placeholder="Enter delimiter" 
                value={delimiter}
                onChange={(e) => setDelimiter(e.target.value)}
              />
            </InputGroup>
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