import React from 'react';

import { useRef, useCallback, useState } from 'react';
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

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
    Card,
    Icon,
    Spinner,
    CircularProgress,
} from "@chakra-ui/react";

import { 
    DragHandleIcon,
    DeleteIcon,
} from '@chakra-ui/icons';

export function ImageTransformCard(props) { // Using props cos err transform is keyword
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id: props.id});

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  
  const [isLongPressing, setIsLongPressing] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const useLongPress = (onLongPress, ms = 1000) => {
    const timerRef = useRef();
    const intervalRef = useRef();
  
    const start = useCallback(() => {
      setIsLongPressing(true);
      timerRef.current = Date.now();
      intervalRef.current = setInterval(() => {
        const elapsedTime = Date.now() - timerRef.current;
        setElapsedTime(elapsedTime);
        if (elapsedTime >= ms) {
          onLongPress();
          clearInterval(intervalRef.current);
        }
      }, 100);
    }, [onLongPress, ms]);
  
    const end = useCallback(() => {
      setIsLongPressing(false);
      clearInterval(intervalRef.current);
      setElapsedTime(0);
    }, []);
  
    return {
      onMouseDown: start,
      onTouchStart: start,
      onMouseUp: end,
      onTouchEnd: end,
      onMouseLeave: end,
      onTouchMove: end,
    };
  };
  const handleLongPress = () => {
    props.deleteTransform(props.id);
  };
  const longPressProps = useLongPress(handleLongPress);
  const isSelected = props.selectedTransform === props.id;
  
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <Card
          backgroundColor={isSelected ? "orange.100" : "white"}
          p={2}
          mb={2}
        >
            <HStack 
                spacing={3}
                justifyContent="space-between"
                onClick={() => props.setSelectedTransform(props.id)}
            >
                <HStack 
                    spacing={3}
                >
                    <Box 
                        display="flex" 
                        alignItems="center" 
                        justifyContent="center"
                    >
                        <Icon as={DragHandleIcon} boxSize={3} />
                    </Box>
                    <Box
                    >
                        <Text
                            fontSize="md"
                            fontWeight="bold"
                            userSelect={"none"}
                        >{props.transform.type}</Text>
                        <Text
                            fontSize="sm"
                            color="gray.500"
                            userSelect={"none"}
                        >{props.transform.display}</Text>
                    </Box>
                </HStack>
                <Button
                    variant={"ghost"}
                    color={"gray.500"}
                    opacity="0"
                    _hover={{ 
                        opacity: "1"
                    }}
                    {...longPressProps}
                >
                {isLongPressing ? 
                    <CircularProgress 
                        value={(elapsedTime / 1000) * 100} 
                        size={8}
                        color='orange.400'
                    /> 
                    : <DeleteIcon />}
            </Button>
            </HStack>
        </Card>
    </div>
  );
}