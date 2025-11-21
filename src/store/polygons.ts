import * as turf from '@turf/turf';

const VillaElSalvadorPoints = [
    [-12.218216, -76.945428],
    [-12.232510, -76.936943],
    [-12.234304, -76.934373],
    [-12.231522, -76.932334],
    [-12.227227, -76.924983],
    [-12.211748, -76.934308],
    [-12.218216, -76.945428],
];

export const VillaElSalvadorPolygon = turf.polygon([VillaElSalvadorPoints]);
