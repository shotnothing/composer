import { useState, useEffect } from 'react';

export async function addTextAsync(imageObj, transform, noRender): Promise<string> {

    function wrap(context, image, transform, text, lineNumber=0) {
        let textMetrics = context.measureText(text)
        let words = text.split(' ');
        let overflow = []

        const wrapThreshold = Number(transform.properties.wrapWidth);

        if (transform.properties.wrap) {
            while (textMetrics.width > wrapThreshold && words.length > 1) {
                overflow.unshift(words.pop());
                text = words.join(' ');
                textMetrics = context.measureText(text);
            }

            if (words.length > 0) {
                if (overflow.length > 0) {
                    wrap(context, image, transform, overflow.join(' '), lineNumber+1);
                }
            } else {
                text = overflow.join(' ');
            }
        }
    
        let x;
        if (transform.properties.xAnchor === 'center') {
            x = image.width / 2 + Number(transform.properties.x) - textMetrics.width/2;;
        } else if (transform.properties.xAnchor === 'right') {
            x = image.width - Number(transform.properties.x) - textMetrics.width;
        } else {
            x = Number(transform.properties.x);
        }
    
        let y;
        if (transform.properties.yAnchor === 'middle') {
            y = image.height / 2 + Number(transform.properties.y) + transform.properties.fontSize / 2;
        } else if (transform.properties.yAnchor === 'bottom') {
            y = image.height - Number(transform.properties.y) - transform.properties.fontSize;
        } else {
            y = Number(transform.properties.y) + transform.properties.fontSize;
        }
        y += lineNumber * transform.properties.fontSize;

        context.fillText(text, x, y);
    }

    if (!noRender) {
        const text = transform.properties.text;
        const image = new Image();
        image.src = imageObj.url;

        await new Promise((resolve) => {
            image.onload = resolve;
        });

        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;

        const context = canvas.getContext('2d');
        context.font = `${transform.properties.fontWeight} ${transform.properties.fontSize}px ${transform.properties.fontFamily}`;
        context.fillStyle = `${transform.properties.color}`;
        context.drawImage(image, 0, 0);

        wrap(context, image, transform, text);

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

// export function addText(inputUrl: string, text: string): string {
//     const [outputUrl, setOutputUrl] = useState(null);
  
//     useEffect(() => {
//       if (inputUrl) {
//         addTextAsync(inputUrl, text).then(setOutputUrl);
//       }
//     }, [inputUrl, text]);
  
//     return outputUrl;
//   }