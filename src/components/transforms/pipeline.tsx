import { useState, useEffect } from 'react';

import { addTextAsync } from './add-text';
import { addCustomTextAsync } from './add-custom-text';
import { duplicateAsync } from './duplicate';
import { addQRCodeAsync } from './add-qr-code';
import { addCustomQRCodeAsync } from './add-custom-qr-code';

function applyTransforms(image, transform, index, previewIndex=-1) {
    const noRender = previewIndex !== -1 && index !== previewIndex;

    if (!image) {
        console.error('No images to transform');
        return image;
    }

    if (transform.type === 'Add Text') {
        return addTextAsync(image, transform, noRender);
    } else if (transform.type === 'Add Custom Text') {
        return addCustomTextAsync(image, transform, noRender, index); 
    } else if (transform.type === 'Duplicate') {
        return duplicateAsync(image, transform, noRender);
    } else if (transform.type === 'Add QR Code') {
        return addQRCodeAsync(image, transform, noRender);
    } else if (transform.type === 'Add Custom QR Code') {
        return addCustomQRCodeAsync(image, transform, noRender, index);
    } else {
        console.error('Unknown transform type:', transform.type);
        return image;
    }
}

function applyTransformsImages(images, transform, previewIndex=-1) {
    return Promise.all(images.map((image, index) => applyTransforms(image, transform, index, previewIndex)))
        .then((imageArrays) => {
            return [].concat(...imageArrays);
        });
}

export function pipeline(images, transforms, previewIndex=-1) {
    const [output, setOutput] = useState(images);

    useEffect(() => {
        transforms.reduce((prevImagesPromise, transform) => {
            return prevImagesPromise.then((currentImages) => {
                return applyTransformsImages(currentImages, transform, previewIndex)
                    .then((newImages) => [].concat(...newImages));
            });
        }, Promise.resolve(images))
        .then(setOutput);
    }, [images, transforms, previewIndex]);


    return output;
}






    // Comments are the best VCS
    // useEffect(() => {
    //     Promise.all(workingImages.map((image) => {
    //       return transforms.reduce((prevPromise, transform) => {
    //         return prevPromise.then((modifiedImage) => applyTransforms(modifiedImage, transform));
    //       }, Promise.resolve(image));
    //     }))
    // .then(setOutput);
    // }, [images, transforms, previewIndex]);


    // export function pipeline(images, transforms, previewIndex=-1) {
    //     const workingImages = previewIndex === -1 ? images : [images[previewIndex]];
    //     const [output, setOutput] = useState(workingImages);
    
    //     useEffect(() => {
    //         Promise.all(workingImages.map((image) => {
    //           return transforms.reduce((prevPromise, transform) => {
    //             return prevPromise.then((modifiedImages) => applyTransforms(modifiedImages[0], transform));
    //           }, Promise.resolve([image]));
    //         }))
    //         .then((imageArrays) => {
    //             const flattenedImages = [].concat(...imageArrays);
    //             setOutput(flattenedImages);
    //         });
    //     }, [images, transforms, previewIndex]);
    //     return output;
    // }