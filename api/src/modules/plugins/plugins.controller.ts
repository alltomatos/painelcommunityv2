import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { PluginsService } from './plugins.service';
import { CreatePluginDto } from './create-plugin.dto';
import { UpdatePluginDto } from './update-plugin.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('plugins')
@UseGuards(JwtAuthGuard)
export class PluginsController {
  constructor(private readonly pluginsService: PluginsService) {}

  @Post()
  create(@Body() createPluginDto: CreatePluginDto) {
    return this.pluginsService.create(createPluginDto);
  }

  @Get()
  findAll() {
    return this.pluginsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pluginsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePluginDto: UpdatePluginDto,
  ) {
    return this.pluginsService.update(id, updatePluginDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pluginsService.remove(id);
  }
}
