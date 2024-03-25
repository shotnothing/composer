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

  export default function DuplicatePropertyCard ({
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
              Copies:
            </Heading>
            <NumberInput
              precision={0}
              max={999}
              min={1}
              step={1}
              value={transform.properties.copies}
              onChange={(value) => updateTransform({...transform.properties, copies: value})}
            >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput >
          </HStack>

        </Flex>
    )
  }