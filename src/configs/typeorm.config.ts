import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ORMConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: 'postgres://postgres:a1234@localhost:5432/test_db?timezone=Asia/Seoul',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
