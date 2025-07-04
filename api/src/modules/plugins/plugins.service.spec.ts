import { Test, TestingModule } from '@nestjs/testing';
import { PluginsService } from './plugins.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Plugin } from './entities/plugin.entity';

const mockRepository = {};

describe('PluginsService', () => {
  let service: PluginsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PluginsService,
        {
          provide: getRepositoryToken(Plugin),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PluginsService>(PluginsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('deve ...', async () => {
    // ... existing code ...
  });
});
