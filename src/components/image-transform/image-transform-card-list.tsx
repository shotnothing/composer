import React, {useState} from 'react';
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import {
    restrictToVerticalAxis,
    restrictToFirstScrollableAncestor,
    restrictToWindowEdges,
} from '@dnd-kit/modifiers';

import { ImageTransformCard } from './image-transform-card';

export default function ImageTransformCardList({
  transforms, 
  setTransforms, 
  deleteTransform,
  selectedTransform,
  setSelectedTransform,
  }) { 
    const activationConstraint = {
      distance: 1
    };
    const sensors = useSensors(
      useSensor(MouseSensor, {
        activationConstraint,
      }),
      useSensor(TouchSensor, {
        activationConstraint,
      }),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );

    function handleDragEnd(event) {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        setTransforms((transforms) => {
          const oldIndex = transforms.findIndex(transform => transform.id === active.id);
          const newIndex = transforms.findIndex(transform => transform.id === over.id);
    
          return arrayMove(transforms, oldIndex, newIndex);
        });
      }
    }
  
    return (
        <div>
        <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
        >
            <SortableContext 
                items={transforms}
                strategy={verticalListSortingStrategy}
            >
                {
                    transforms.map(transform => 
                      <ImageTransformCard 
                        key={transform.id}
                        id={transform.id} 
                        transform={transform}
                        deleteTransform={deleteTransform}
                        selectedTransform={selectedTransform}
                        setSelectedTransform={setSelectedTransform}
                      />)
                }
            </SortableContext>
        </DndContext>
      </div>
    );
  }
  

