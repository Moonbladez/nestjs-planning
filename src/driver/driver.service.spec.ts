import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './../../src/prisma/prisma.service';
import { DriverService } from './driver.service';

describe('DriverService', () => {
  let driverService: DriverService;
  let prismaService: PrismaService;
  const mockDriver = { id: '1', name: 'John Doe' };

  const setupMocks = () => ({
    create: jest
      .spyOn(prismaService.driver, 'create')
      .mockResolvedValue(mockDriver),
    findMany: jest.spyOn(prismaService.driver, 'findMany'),
    findUnique: jest.spyOn(prismaService.driver, 'findUnique'),
    update: jest.spyOn(prismaService.driver, 'update'),
    delete: jest.spyOn(prismaService.driver, 'delete'),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DriverService,
        {
          provide: PrismaService,
          useValue: {
            driver: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    driverService = module.get<DriverService>(DriverService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(driverService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a list of drivers', async () => {
      const { findMany } = setupMocks();
      findMany.mockResolvedValue([mockDriver]);

      const result = await driverService.findAll({ limit: 10, offset: 0 });
      expect(result).toEqual([mockDriver]);
      expect(findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
      });
    });

    it('should return an empty list if no drivers are found', async () => {
      const { findMany } = setupMocks();
      findMany.mockResolvedValue([]);

      const result = await driverService.findAll({ limit: 10, offset: 0 });
      expect(result).toEqual([]);
      expect(findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
      });
    });
  });

  describe('findOne', () => {
    it('should return a single driver', async () => {
      const { findUnique } = setupMocks();
      findUnique.mockResolvedValue(mockDriver);

      const result = await driverService.findOne('1');
      expect(result).toEqual(mockDriver);
      expect(findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        include: { vehicle: true },
      });
    });

    it('should throw NotFoundException if no driver is found', async () => {
      const { findUnique } = setupMocks();
      findUnique.mockResolvedValue(null);

      await expect(driverService.findOne('1')).rejects.toThrow(
        NotFoundException,
      );
      expect(findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        include: { vehicle: true },
      });
    });
  });

  //CREATE
  describe('create', () => {
    it('should create a driver', async () => {
      const { create } = setupMocks();

      const result = await driverService.create(mockDriver);
      expect(result).toEqual(mockDriver);
      expect(create).toHaveBeenCalledWith({ data: mockDriver });
    });
  });

  //UPDATE
  describe('update', () => {
    it('should update a driver', async () => {
      const { findUnique, update } = setupMocks();
      const updateDriverDto = { name: 'Updated Name' };
      findUnique.mockResolvedValue(mockDriver);
      update.mockResolvedValue({ ...mockDriver, ...updateDriverDto });

      const result = await driverService.update('1', updateDriverDto);
      expect(result).toEqual({ ...mockDriver, ...updateDriverDto });
      expect(findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        include: { vehicle: true },
      });
      expect(update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: updateDriverDto,
      });
    });

    it('should throw NotFoundException if no driver is found', async () => {
      const updateDriverDto = { name: 'Updated Name' };

      const findUniqueSpy = jest
        .spyOn(prismaService.driver, 'findUnique')
        .mockResolvedValue(null);

      const updateSpy = jest.spyOn(prismaService.driver, 'update');

      await expect(driverService.update('1', updateDriverDto)).rejects.toThrow(
        NotFoundException,
      );
      expect(findUniqueSpy).toHaveBeenCalledWith({
        where: { id: '1' },
        include: { vehicle: true },
      });
      expect(updateSpy).not.toHaveBeenCalled();
    });
  });

  //REMOVE
  describe('remove', () => {
    it('should remove a driver', async () => {
      const { delete: deleteSpy, findUnique } = setupMocks();
      findUnique.mockResolvedValue(mockDriver);
      deleteSpy.mockResolvedValue(mockDriver);

      const result = await driverService.remove('1');
      expect(result).toEqual(mockDriver);
      expect(findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(deleteSpy).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should throw NotFoundException if no driver is found', async () => {
      const { findUnique, delete: deleteSpy } = setupMocks();
      findUnique.mockResolvedValue(null);

      await expect(driverService.remove('1')).rejects.toThrow(
        NotFoundException,
      );
      expect(findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(deleteSpy).not.toHaveBeenCalled();
    });
  });
});
