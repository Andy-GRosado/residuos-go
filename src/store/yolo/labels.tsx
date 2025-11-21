
export const MODEL_CLASSES = ['bag', 'bottle', 'cardboard', 'trash']
export type ModelClass = typeof MODEL_CLASSES[number]
export const MODEL_CLASSES_TRESHOLD: Record<ModelClass, number> = {
    'bag': 0.5,
    'bottle': 0.5,
    'cardboard': 0.5,
    'trash': 0.5,
}