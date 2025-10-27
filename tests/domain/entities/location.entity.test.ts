// tests/domain/entities/location.entity.test.ts
import { LocationEntity } from '../../../src/domain/entities/location.entity';

describe('LocationEntity', () => {
  describe('Constructor', () => {
    it('should create a LocationEntity with provided coordinates', () => {
      const location = new LocationEntity(40.7128, -74.0060);
      
      expect(location.Lattitude).toBe(40.7128);
      expect(location.Longitude).toBe(-74.0060);
    });
  });

  describe('Getters', () => {
    it('should return correct latitude', () => {
      const location = new LocationEntity(34.0522, -118.2437);
      
      expect(location.Lattitude).toBe(34.0522);
    });

    it('should return correct longitude', () => {
      const location = new LocationEntity(34.0522, -118.2437);
      
      expect(location.Longitude).toBe(-118.2437);
    });
  });

  describe('isNearTo', () => {
    it('should return true when locations are within max distance', () => {
      const location1 = new LocationEntity(40.7128, -74.0060);
      const location2 = new LocationEntity(40.7130, -74.0062);
      const maxDistance = 0.1;
      
      const result = location1.isNearTo(location2, maxDistance);
      
      expect(result).toBe(true);
    });

    it('should return false when locations are beyond max distance', () => {
      const location1 = new LocationEntity(40.7128, -74.0060);
      const location2 = new LocationEntity(41.0000, -74.0000);
      const maxDistance = 0.1;
      
      const result = location1.isNearTo(location2, maxDistance);
      
      expect(result).toBe(false);
    });

    it('should handle exact same location', () => {
      const location1 = new LocationEntity(40.7128, -74.0060);
      const location2 = new LocationEntity(40.7128, -74.0060);
      const maxDistance = 0;
      
      const result = location1.isNearTo(location2, maxDistance);
      
      expect(result).toBe(true);
    });

    it('should calculate distance correctly using Euclidean distance', () => {
      const location1 = new LocationEntity(0, 0);
      const location2 = new LocationEntity(3, 4);
      const maxDistance = 5; // Distance should be exactly 5
      
      const result = location1.isNearTo(location2, maxDistance);
      
      expect(result).toBe(true);
    });
  });
});
