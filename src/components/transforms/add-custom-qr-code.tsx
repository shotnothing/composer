import { addQRCodeAsync } from "./add-qr-code";

export async function addCustomQRCodeAsync(image, transform, noRender, index): Promise<string[]> {

    if (index >= transform.properties.texts.length) {
        return image;
    }

    let text = transform.properties.texts[index];

    if (text.replace(/^\n|\n$/g, '').length === 0) {
        return [];
    }

    const newTransform = {
        ...transform,
        properties: {
            ...transform.properties,
            text,
        }
    }

    const lastDotIndex = image.name.lastIndexOf(".");
    const name = image.name.substring(0, lastDotIndex);
    const extension = image.name.substring(lastDotIndex + 1);

    const newImage = {
        ...image,
        name: `${name}_(${text
            .replace(/\s+/gi, '-')
            .replace(/[^a-zA-Z0-9\-]/gi, '')
        }).${extension}`,
    }; 

    return Promise.all([addQRCodeAsync(newImage, newTransform, noRender)]);
}