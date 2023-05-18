import { Module } from '@nestjs/common';
import { generators } from './generators';
import { hashers } from './hashers';
import { consoles } from './console';
import { controllers } from './controllers';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule],
  controllers,
  providers: [...generators, ...hashers, ...consoles],
  exports: [...generators, ...hashers],
})
export class CommonModule {}
