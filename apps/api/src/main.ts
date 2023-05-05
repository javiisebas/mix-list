import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            origin: '*',
            methods: ['GET,HEAD,OPTIONS,POST,PUT'],
            allowedHeaders: ['Cookie', 'Content-Type', 'Authorization'],
            credentials: true,
            preflightContinue: false,
            optionsSuccessStatus: 204,
        },
        bodyParser: true,
    });
    app.use(cookieParser());
    app.use(helmet());
    app.enableCors();
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
        }),
    );

    await app.listen(process.env.API_PORT);
}
bootstrap();
