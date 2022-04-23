import { PendingDataDao } from './app/pgs-database/dao/pending-data.dao';
import { PendingDataService } from './app/pgs-database/service/pending-data.service';
import { AdminMapController } from './app/pgs-controller/admin-map.controller';
import { MapControllerService } from './app/pgs-service/controller/map-controller.service';
import { Language, LanguageSchema } from './app/pgs-database/schema/language.schema';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { MapController } from './app/pgs-controller/map.controller';
import { ConfigurationDao } from './app/pgs-database/dao/configuration.dao';
import { MarkerDao } from './app/pgs-database/dao/marker.dao';
import { Configuration, ConfigurationSchema } from './app/pgs-database/schema/configuration.schema';
import { MarkerDetail, MarkerDetailSchema } from './app/pgs-database/schema/marker-detail.schema';
import { Marker, MarkerSchema } from './app/pgs-database/schema/marker.schema';
import { ConfigurationService } from './app/pgs-database/service/configuration.service';
import { MarkerService } from './app/pgs-database/service/marker.service';
import { PendingData, PendingDataSchema } from './app/pgs-database/schema/pending-data.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },
    }),

    /** MONGO DB */
    MongooseModule.forRoot(process.env.MONGO_URL, {
      // useFindAndModify: false,
      /* connectionFactory: (connection) => {
        connection.plugin(require('mongoose-autopopulate'));
        return connection;
      }, */
    }),
    MongooseModule.forFeature([
      { name: Language.name, schema: LanguageSchema },
      { name: Configuration.name, schema: ConfigurationSchema },
      { name: Marker.name, schema: MarkerSchema },
      { name: MarkerDetail.name, schema: MarkerDetailSchema },
      { name: PendingData.name, schema: PendingDataSchema }
    ]),
  ],
  controllers: [
    MapController,

    AdminMapController
  ],
  providers: [
    MapControllerService,

    ConfigurationService,
    MarkerService,
    PendingDataService,

    ConfigurationDao,
    MarkerDao,
    PendingDataDao
  ],
})
export class AppModule {}
