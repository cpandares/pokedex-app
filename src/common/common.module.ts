import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adpters/axios.adapter';

@Module({
    providers: [AxiosAdapter],
    exports: [AxiosAdapter],
})
export class CommonModule {}
