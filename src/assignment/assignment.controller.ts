import {
  Controller,
  Post,
  Patch,
  Body,
  Param,
  Get,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './dtos/create-assignment.dto';
import { Assignment } from './entities/assignment.entity';

@Controller('assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Post()
  async create(@Body() createAssignmentDto: CreateAssignmentDto) {
    try {
      return await this.assignmentService.create(createAssignmentDto);
    } catch (error) {
      throw new BadRequestException('Failed to create assignment.');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Assignment> {
    try {
      const assignment = await this.assignmentService.findOne(id);
      if (!assignment) {
        throw new NotFoundException(`Assignment with ID ${id} not found.`);
      }
      return assignment;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Failed to fetch assignment details.',
      );
    }
  }

  @Patch(':id/grade')
  async gradeAssignment(
    @Param('id') id: number,
    @Body('status') status: string,
  ) {
    try {
      const updatedAssignment = await this.assignmentService.gradeAssignment(
        id,
        status,
      );
      if (!updatedAssignment) {
        throw new NotFoundException(`Assignment with ID ${id} not found.`);
      }
      return updatedAssignment;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to update assignment grade.');
    }
  }

  @Get('report/teacher/:teacherId')
  async getReportByTeacher(
    @Param('teacherId') teacherId: number,
    @Body('date') date: Date,
  ) {
    try {
      return await this.assignmentService.getReportByTeacher(teacherId, date);
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch report by teacher.',
      );
    }
  }
}
