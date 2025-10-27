// tests/domain/entities/report.entity.test.ts
import {
    IReport,
    ReportEntity,
} from "../../../src/domain/entities/report.entity";

describe("ReportEntity", () => {
    const newMockReport: Omit<IReport, "id" | "created_at"> = {
        latitud: 40.7128,
        longitud: -74.006,
        image_url: "https://example.com/image.jpg",
        title: "Damaged Tree",
        description: "Tree with broken branches",
        state: "active",
        bonding_boxes: [
            {
                label: "tree",
                x: 100,
                y: 150,
                width: 50,
                height: 60,
            },
        ],
    };

    describe("Constructor", () => {
        it("should create a ReportEntity with the provided report data", () => {
            const reportEntity = ReportEntity.create(newMockReport);

            expect(reportEntity.raw).toMatchObject(newMockReport);
            expect(reportEntity.raw.latitud).toBe(40.7128);
            expect(reportEntity.raw.longitud).toBe(-74.006);
        });

        it("should handle reports with multiple bonding boxes", () => {
            const reportWithMultipleBoxes = {
                ...newMockReport,
                bonding_boxes: [
                    {
                        label: "tree",
                        x: 100,
                        y: 150,
                        width: 50,
                        height: 60,
                    },
                    {
                        label: "sign",
                        x: 200,
                        y: 100,
                        width: 30,
                        height: 40,
                    },
                ],
            };

            const reportEntity = ReportEntity.create(reportWithMultipleBoxes);

            expect(reportEntity.raw.bonding_boxes).toHaveLength(2);
            expect(reportEntity.raw.bonding_boxes[1].label).toBe("sign");
        });
    });

    describe("raw getter", () => {
        it("should return the raw report data", () => {
            const reportEntity = ReportEntity.create(newMockReport);
            const rawData = reportEntity.raw;

            expect(rawData).toMatchObject(newMockReport);
            expect(rawData.title).toBe("Damaged Tree");
            expect(rawData.state).toBe("active");
        });
    });
});
