import { useState, useEffect } from 'react';
import QRCode from 'qrcode';

export async function addQRCodeAsync(imageObj, transform, noRender): Promise<string> {
    if (transform.properties.text.length === 0) {
        return imageObj;
    }

    if (!noRender) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        const image = new Image();
        image.src = imageObj.url;
        await new Promise((resolve) => {
            image.onload = resolve;
        });
        
        canvas.width = image.width;
        canvas.height = image.height;
        
        context.drawImage(image, 0, 0);

        const qrCodeText = transform.properties.text
        const qrCodeDataURL = await QRCode.toDataURL(qrCodeText, {
            errorCorrectionLevel: transform.properties.errorCorrectionLevel, 
            margin: transform.properties.margin,
            color: {
                dark: transform.properties.fgColor, 
                light: transform.properties.bgColor,
            },
            width: transform.properties.width, 
        });

        const qrCodeImage = new Image();
        qrCodeImage.src = qrCodeDataURL;
        await new Promise((resolve) => {
            qrCodeImage.onload = resolve;
        });

        let x = image.width/2 - transform.properties.x - qrCodeImage.width/2;
        let y = image.height/2 - transform.properties.y - qrCodeImage.height/2;
        context.drawImage(qrCodeImage, x, y);

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                const modifiedImageBlobUrl = URL.createObjectURL(blob);
                const modifiedImageObj = {
                    ...imageObj,
                    url: modifiedImageBlobUrl,
                    pipelineLastTransform: transform.type,
                };
                resolve(modifiedImageObj);
            });
        });
    } else {
        return {
            ...imageObj,
            url: imageObj.url,
            pipelineLastTransform: transform.type,
        };
    }
}