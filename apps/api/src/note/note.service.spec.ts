import { Test, TestingModule } from '@nestjs/testing';
import { NoteService } from './services/note.service';

describe('AuthService', () => {
  let service: NoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoteService],
    }).compile();

    service = module.get<NoteService>(NoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
