import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { GetSettingArgs } from './dto/get-setting.args';
import { SettingsInput } from './dto/update-setting.input';
import settingsJson from './settings.json';
import { Settings } from './entities/setting.entity';

const settings = plainToClass(Settings, settingsJson);

@Injectable()
export class SettingsService {
  private settings: Settings = settings;
  // create(createSettingInput: CreateSettingInput) {
  //   return 'This action adds a new setting';
  // }

  getSettings() {
    return this.settings;
  }

  findOne(id: number) {
    return `This action returns a #${id} setting`;
  }

  updateSettings(updateSettingsInput: SettingsInput) {
    console.log(updateSettingsInput);
    return this.settings;
  }

  remove(id: number) {
    return `This action removes a #${id} setting`;
  }
}
