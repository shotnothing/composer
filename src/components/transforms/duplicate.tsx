export async function duplicateAsync(image, transform, noRender): Promise<string[]> {
    let promises = Array.from({length: transform.properties.copies}, (_, index) => {
        const lastDotIndex = image.name.lastIndexOf(".");
        const name = image.name.substring(0, lastDotIndex);
        const extension = image.name.substring(lastDotIndex + 1);
        const newImage = {
            ...image,
            name: `${name}_${index}.${extension}`,
        };
        return newImage;
    });

    return Promise.all(promises);
}
