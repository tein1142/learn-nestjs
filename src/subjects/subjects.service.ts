import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './entities/subject.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject) private readonly subjectRepository: Repository<Subject>
  ) { }

  create(createSubjectDto: CreateSubjectDto) {
    const subject = new Subject
    subject.subjectName = createSubjectDto.subjectName;
    return this.subjectRepository.save(subject);
  }

  findAll() {
    return this.subjectRepository.find({
      order:{
        id: 'ASC'
      }
    });
  }

  findOne(id: number) {
    return this.subjectRepository.findOneBy({id});
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    const subject = await this.subjectRepository.findOneBy({id});
    subject.subjectName = updateSubjectDto.subjectName
    return this.subjectRepository.save(subject);
  }

  remove(id: number) {
    return this.subjectRepository.delete({id});
  }
}
