// tests/domain/services/report-map.service.test.ts
import { LocationEntity } from '../../../src/domain/entities/location.entity';
import { ReportEntity } from '../../../src/domain/entities/report.entity';
import { IReportRepository } from '../../../src/domain/repositories/report.repository';
import { ReportMapService } from '../../../src/domain/services/report-map.service';

describe('ReportMapService', () => {
  let mockReportRepository: jest.Mocked<IReportRepository>;
  let mockCurrentLocation: LocationEntity;
  let reportMapService: ReportMapService;

  const mockReportData = {
    latitud: 40.7128,
    longitud: -74.0060,
    image_url: 'image.jpg',
    bonding_boxes: [],
    title: 'Test Report',
    description: 'Test Description',
    state: 'active',
    created_at: new Date()
  };

  beforeEach(() => {
    mockReportRepository = {
      addReport: jest.fn(),
      getReportsNearTo: jest.fn(),
      deleteReport: jest.fn(),
      findReportsOwnedBy: jest.fn()
    } as jest.Mocked<IReportRepository>;

    mockCurrentLocation = new LocationEntity(40.7128, -74.0060);
    reportMapService = new ReportMapService(
      mockReportRepository,
      mockCurrentLocation,
      10 // max_distance
    );
  });

  describe('Constructor', () => {
    it('should initialize with empty reports array', () => {
      expect(reportMapService['reports']).toEqual([]);
    });
  });

  describe('getNearReports', () => {
    it('should fetch reports near current location', async () => {
      const mockReports = [ReportEntity.create(mockReportData)];
      mockReportRepository.getReportsNearTo.mockResolvedValue(mockReports);

      const result = await reportMapService.getNearReports();

      expect(mockReportRepository.getReportsNearTo).toHaveBeenCalledWith(
        mockCurrentLocation,
        10
      );
      expect(result).toEqual(mockReports);
      expect(reportMapService['reports']).toEqual(mockReports);
    });

    it('should update local reports cache', async () => {
      const mockReports = [ReportEntity.create(mockReportData)];
      mockReportRepository.getReportsNearTo.mockResolvedValue(mockReports);

      await reportMapService.getNearReports();

      expect(reportMapService['reports']).toEqual(mockReports);
    });
  });

  describe('setLocation', () => {
    it('should update current location', () => {
      const newLocation = new LocationEntity(34.0522, -118.2437);

      reportMapService.setLocation(newLocation);

      expect(reportMapService['current_location']).toBe(newLocation);
    });
  });
});
