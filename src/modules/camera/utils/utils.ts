/**
 * Type of container to display bounding boxes
 */
export interface IContainerDimensions {
    width: number,
    height: number,
}

export interface IContainerBoundingBox {
    x: number,
    y: number,
    width: number,
    height: number,
}

/**
 * Transforms bounding box points to relative dimensions of container
 * [x1, y1, x1, y2] -> [x, y, w, h] 
 * @param image_dimensions - Bounding box relative dimensions
 * @param container_dimensions - Container dimensions where should be displayed bounding boxes
 * 
 * @returns A functions that calculates the bounding box position relative to that container and image dimensions
 */
export function BoundingBoxTransformer(image_dimensions: IContainerDimensions, container_dimensions: IContainerDimensions):
    (norm_x1: number, norm_y1: number, norm_x2: number, norm_y2: number) => IContainerBoundingBox {

    const scaleX = container_dimensions.width / image_dimensions.width;
    const scaleY = container_dimensions.height / image_dimensions.height;

    // Use the smaller scale to maintain aspect ratio (content fit)
    const scale = Math.min(scaleX, scaleY);

    // Calculate actual displayed image dimensions within container
    const displayedWidth = image_dimensions.width * scale;
    const displayedHeight = image_dimensions.height * scale;

    // Calculate offsets to center the image in the container
    const offsetX = (container_dimensions.width - displayedWidth) / 2;
    const offsetY = (container_dimensions.height - displayedHeight) / 2;

    console.log("Container dimensions", container_dimensions);
    console.log("Container dimensions", image_dimensions);

    return (norm_x1: number, norm_y1: number, norm_x2: number, norm_y2: number) => {
        const x1 = offsetX + (norm_x1 * displayedWidth);
        const x2 = offsetX + (norm_x2 * displayedWidth);
        const y1 = offsetY + (norm_y1 * displayedHeight);
        const y2 = offsetY + (norm_y2 * displayedHeight);

        const response = {
            x: x1,
            y: y1,
            width: x2 - x1,
            height: y2 - y1,
        };

        if (x2 > displayedWidth) {
            console.log(`x2 : ${x2} > ${displayedWidth} : ${JSON.stringify(response)}`);
        }

        if (y2 > displayedHeight) {
            console.log(`y2: ${y2} > ${displayedHeight} : ${JSON.stringify(response)}`);
        }

        return response;
    }
}

