// tests/domain/services/report-history.service.test.ts
import { ReportEntity } from '../../../src/domain/entities/report.entity';
import { UserEntity } from '../../../src/domain/entities/user.entity';
import { IReportRepository } from '../../../src/domain/repositories/report.repository';
import { ReportHistoryService } from '../../../src/domain/services/report-history.service';

describe('ReportHistoryService', () => {
  let mockReportRepository: jest.Mocked<IReportRepository>;
  let mockUser: UserEntity;
  let reportHistoryService: ReportHistoryService;

  const mockUserData = {
    id: '',
    email: 'user@example.com',
    password: 'password123',
    created_at: new Date()
  };

  const mockReportData = {
    id: '',
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

    mockUser = UserEntity.create(mockUserData);
    reportHistoryService = new ReportHistoryService(mockReportRepository, mockUser);
  });

  describe('Constructor', () => {
    it('should initialize with empty reports array', () => {
      expect(reportHistoryService['reports']).toEqual([]);
    });
  });

  describe('addNewReport', () => {
    it('should add report and refresh reports list', async () => {
      const newReport = ReportEntity.create(mockReportData);
      const mockReports = [newReport];
      
      mockReportRepository.findReportsOwnedBy.mockResolvedValue(mockReports);

      await reportHistoryService.addNewReport(newReport);

      expect(mockReportRepository.addReport).toHaveBeenCalledWith(newReport);
      expect(mockReportRepository.findReportsOwnedBy).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('getReports', () => {
    it('should call getReportsOnline', async () => {
      const mockReports = [ReportEntity.create(mockReportData)];
      mockReportRepository.findReportsOwnedBy.mockResolvedValue(mockReports);

      const result = await reportHistoryService.getReports();

      expect(mockReportRepository.findReportsOwnedBy).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockReports);
    });
  });

  describe('getReportsOnline', () => {
    it('should fetch reports from repository and update local cache', async () => {
      const mockReports = [ReportEntity.create(mockReportData)];
      mockReportRepository.findReportsOwnedBy.mockResolvedValue(mockReports);

      const result = await reportHistoryService.getReportsOnline();

      expect(mockReportRepository.findReportsOwnedBy).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual(mockReports);
      expect(reportHistoryService['reports']).toEqual(mockReports);
    });
  });

  describe('getReportsOffline', () => {
    it('should return cached reports without fetching from repository', async () => {
      const cachedReports = [ReportEntity.create(mockReportData)];
      reportHistoryService['reports'] = cachedReports;

      const result = await reportHistoryService.getReportsOffline();

      expect(result).toEqual(cachedReports);
      expect(mockReportRepository.findReportsOwnedBy).not.toHaveBeenCalled();
    });
  });
});
