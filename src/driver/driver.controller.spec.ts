import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PaginationQueryDto } from 'src/shared/dto';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { CreateDriverDto, UpdateDriverDto } from './dto';

describe('DriverController', () => {
  let driverController: DriverController;
  let driverService: DriverService;
  const mockDriverId = '1';
  const mockDriver = { id: mockDriverId, name: 'John Doe' };
  const paginationQuery: PaginationQueryDto = { limit: 10, offset: 0 };

  const createDriverDto: CreateDriverDto = {
    id: '1',
    name: 'John Doe',
  };

  const updateDriverDto: UpdateDriverDto = {};

  const driverServiceMock: Partial<DriverService> = {
    create: jest.fn().mockResolvedValue(mockDriver),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriverController],
      providers: [
        {
          provide: DriverService,
          useValue: driverServiceMock,
        },
      ],
    }).compile();

    driverController = module.get<DriverController>(DriverController);
    driverService = module.get<DriverService>(DriverService);
  });

  it('should be defined', () => {
    expect(driverController).toBeDefined();
  });

  describe('create', () => {
    it('should create a driver', async () => {
      const create = await driverServiceMock.create(createDriverDto);

      expect(create).toEqual(mockDriver);
      expect(driverServiceMock.create).toHaveBeenCalledWith(createDriverDto);
    });
  });

  describe('findAll', () => {
    it('should return a list of drivers', async () => {
      const mockDrivers = [mockDriver];

      driverService.findAll = jest.fn().mockResolvedValue(mockDrivers);

      const result = await driverController.findAll(paginationQuery);
      expect(result).toEqual(mockDrivers);
      expect(driverService.findAll).toHaveBeenCalledWith(paginationQuery);
    });

    it('should return an empty list if no drivers are found', async () => {
      const mockEmptyDrivers = [];

      driverService.findAll = jest.fn().mockResolvedValue(mockEmptyDrivers);

      const result = await driverController.findAll(paginationQuery);
      expect(result).toEqual(mockEmptyDrivers);
      expect(driverService.findAll).toHaveBeenCalledWith(paginationQuery);
    });
  });

  describe('findOne', () => {
    it('should return a single driver', async () => {
      driverService.findOne = jest.fn().mockResolvedValue(mockDriver);

      const result = await driverController.findOne(mockDriverId);
      expect(result).toEqual(mockDriver);
      expect(driverService.findOne).toHaveBeenCalledWith(mockDriverId);
    });

    it('should throw NotFoundException if driver is not found', async () => {
      driverService.findOne = jest.fn().mockResolvedValue(null);

      try {
        await driverController.findOne(mockDriverId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }

      expect(driverService.findOne).toHaveBeenCalledWith(mockDriverId);
    });
  });

  describe('update', () => {
    it('should update a driver', async () => {
      driverService.update = jest.fn().mockResolvedValue(mockDriver);

      const result = await driverController.update(
        mockDriverId,
        updateDriverDto,
      );
      expect(result).toEqual(mockDriver);
      expect(driverService.update).toHaveBeenCalledWith(
        mockDriverId,
        updateDriverDto,
      );
    });

    it('should throw NotFoundException if driver is not found', async () => {
      driverService.update = jest
        .fn()
        .mockRejectedValue(new NotFoundException('No driver found'));

      try {
        await driverController.update(mockDriverId, updateDriverDto);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }

      expect(driverService.update).toHaveBeenCalledWith(
        mockDriverId,
        updateDriverDto,
      );
    });
  });

  describe('remove', () => {
    it('should remove a driver', async () => {
      driverService.remove = jest.fn().mockResolvedValue(mockDriver);

      const result = await driverController.remove(mockDriverId);
      expect(result).toEqual(mockDriver);
      expect(driverService.remove).toHaveBeenCalledWith(mockDriverId);
    });

    it('should throw NotFoundException if driver is not found', async () => {
      driverService.remove = jest
        .fn()
        .mockRejectedValue(new NotFoundException('No driver found'));

      try {
        await driverController.remove(mockDriverId);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }

      expect(driverService.remove).toHaveBeenCalledWith(mockDriverId);
    });
  });
});
