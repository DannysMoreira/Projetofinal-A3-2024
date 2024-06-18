
import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
  import { UserService } from '../service/user.service';
  import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
  
  @Controller('user')
  @ApiTags('user')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    @Get()
    @ApiOperation({ summary: 'Achar todos os usuarios' })
    async findAll(): Promise<any[]> {
      return this.userService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Achar um usuario pelo Id' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Usuário não encontrado.' })
    async findOne(@Param('id') id: number): Promise<any> {
      return this.userService.findOne(id);
    }
  
    @Post()
    @ApiOperation({ summary: 'Criar um novo usuario' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Email já registrado.' })
    @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Erro ao criar o registro. Tente novamente mais tarde.' })
    async create(@Body() createUserDto: CreateUserDto): Promise<any> {
      return this.userService.create(createUserDto);
    }
  
    @Put(':id')
    @ApiOperation({ summary: 'Atualizar os dados de um usuario pelo Id' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Usuário não encontrado.' })
    async update(
      @Param('id') id: number,
      @Body() updateUserDto: UpdateUserDto,
    ): Promise<any> {
      return this.userService.update(id, updateUserDto);
    }
  
    @Delete(':id')
    @ApiOperation({ summary: 'Deletar um usuario pelo Id' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Usuário não encontrado.' })
    async delete(@Param('id') id: number): Promise<void> {
      return this.userService.delete(id);
    }
  }
