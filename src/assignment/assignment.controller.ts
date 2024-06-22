import { Controller, Post, Patch, Body, Param, Get } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './dtos/create-assignment.dto';

@Controller('assignments')
export class AssignmentController {
  constructor(private readonly assignmentService: AssignmentService) {}

  @Post()
  create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentService.create(createAssignmentDto);
  }

  @Patch(':id/grade')
  gradeAssignment(@Param('id') id: number, @Body('status') status: string) {
    return this.assignmentService.gradeAssignment(id, status);
  }

  @Get('report/teacher/:teacherId')
  getReportByTeacher(
    @Param('teacherId') teacherId: number,
    @Body('date') date: Date,
  ) {
    return this.assignmentService.getReportByTeacher(teacherId, date);
  }
}
