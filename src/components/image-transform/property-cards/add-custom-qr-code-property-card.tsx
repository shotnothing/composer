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

export default function AddCustomQRCodePropertyCard({
      transform,
      updateTransform,
    }) {
      const [delimiter, setDelimiter] = useState(';');

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