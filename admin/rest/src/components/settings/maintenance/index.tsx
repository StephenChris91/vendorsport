import Card from '@/components/common/card';
import { SaveIcon } from '@/components/icons/save';
import Button from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import Description from '@/components/ui/description';
import FileInput from '@/components/ui/file-input';
import ValidationError from '@/components/ui/form-validation-error';
import Input from '@/components/ui/input';
import Label from '@/components/ui/label';
import StickyFooterPanel from '@/components/ui/sticky-footer-panel';
import SwitchInput from '@/components/ui/switch-input';
import TextArea from '@/components/ui/text-area';
import { useUpdateSettingsMutation } from '@/data/settings';
import { Attachment, Settings } from '@/types';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDays } from 'date-fns';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { maintenanceValidationSchema } from './maintenance-validation-schema';

type MaintenanceFormValues = {
  isUnderMaintenance: boolean;
  maintenance: {
    image: Attachment;
    title: string;
    description: string;
    start: string;
    until: string;
    isOverlayColor: boolean;
    overlayColor: string;
    buttonTitleOne: string;
    buttonTitleTwo: string;
    overlayColorRange: string;
    newsLetterTitle: string;
    newsLetterDescription: string;
    aboutUsTitle: string;
    aboutUsDescription: string;
    contactUsTitle: string;
  };
};

type IProps = {
  settings?: Settings | null;
};

export default function MaintenanceSettingsForm({ settings }: IProps) {
  const { t } = useTranslation();
  const { locale } = useRouter();
  const { mutate: updateSettingsMutation, isLoading: loading } =
    useUpdateSettingsMutation();
  const { language, options } = settings ?? {};

  const {
    register,
    handleSubmit,
    control,
    getValues,
    watch,
    formState: { errors },
  } = useForm<MaintenanceFormValues>({
    shouldUnregister: true,
    // @ts-ignore
    resolver: yupResolver(maintenanceValidationSchema),
    defaultValues: {
      ...options,
    },
  });

  async function onSubmit(values: MaintenanceFormValues) {
    updateSettingsMutation({
      language: locale,
      // @ts-ignore // // FIXME
      options: {
        ...options,
        ...values,
      },
    });
  }

  const startDate = watch('maintenance.start');
  const isOverlayColor = watch('maintenance.isOverlayColor');
  const isMaintenanceMode = watch('isUnderMaintenance');
  const today = new Date();

  const maintenanceImageInformation = (
    <span>
      {t('form:maintenance-cover-image-help-text')} <br />
      {t('form:cover-image-dimension-help-text')} &nbsp;
      <span className="font-bold">1170 x 435{t('common:text-px')}</span>
    </span>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
        <Description
          title={t('form:form-title-information')}
          details={t('form:site-maintenance-info-help-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div className="my-5">
            <div className="flex items-center gap-x-4">
              <SwitchInput name="isUnderMaintenance" control={control} />
              <Label className="mb-0.5 ">
                {t('form:input-label-enable-maintenance-mode')}
              </Label>
            </div>
          </div>
        </Card>
      </div>
      <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
        <Description
          title={t('form:input-label-maintenance-cover-image')}
          details={maintenanceImageInformation}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full logo-field-area sm:w-8/12 md:w-2/3">
          <FileInput
            name="maintenance.image"
            control={control}
            multiple={false}
            disabled={!isMaintenanceMode}
          />
        </Card>
      </div>

      <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
        <Description
          title={t('form:form-title-maintenance-information')}
          details={t('form:site-maintenance-info-help-text')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-title')}
            {...register('maintenance.title')}
            error={t(errors.maintenance?.title?.message!)}
            variant="outline"
            className="mb-5"
            {...(isMaintenanceMode && {
              required: true,
            })}
            disabled={!isMaintenanceMode}
          />
          <TextArea
            label={t('form:input-label-description')}
            {...register('maintenance.description')}
            error={t(errors.maintenance?.description?.message!)}
            variant="outline"
            className="mb-5"
            {...(isMaintenanceMode && {
              required: true,
            })}
            disabled={!isMaintenanceMode}
          />
          <div className="mb-5">
            <Label>
              {t('form:maintenance-start-time')}
              {isMaintenanceMode ? (
                <span className="ml-0.5 text-red-500">*</span>
              ) : (
                ''
              )}
            </Label>

            <Controller
              control={control}
              name="maintenance.start"
              // @ts-ignore
              render={({ field: { onChange, value } }) => {
                return (
                  <DatePicker
                    minDate={today}
                    selected={new Date(value)}
                    startDate={new Date(startDate)}
                    onChange={onChange}
                    locale={locale}
                    todayButton="Today"
                    placeholderText="Start Date"
                    disabled={!isMaintenanceMode}
                  />
                );
              }}
            />
            <ValidationError message={t(errors.maintenance?.start?.message!)} />
          </div>
          <div className="w-full">
            <Label>
              {t('form:maintenance-end-date')}
              {isMaintenanceMode ? (
                <span className="ml-0.5 text-red-500">*</span>
              ) : (
                ''
              )}
            </Label>

            <Controller
              control={control}
              name="maintenance.until"
              // @ts-ignore
              render={({ field: { onChange, onBlur, value } }) => {
                return (
                  <DatePicker
                    selectsEnd
                    selected={new Date(value)}
                    disabled={!startDate || !isMaintenanceMode}
                    minDate={addDays(new Date(startDate), 1)}
                    placeholderText="End Date"
                    onChange={onChange}
                    locale={locale}
                  />
                );
              }}
            />
            <ValidationError message={t(errors.maintenance?.until?.message!)} />
          </div>
        </Card>
      </div>

      <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
        <Description
          title="Maintenance mode extra settings"
          details="Add maintenance mode extra settings here."
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <div className="mb-5">
            <div className="flex items-center gap-x-4">
              <SwitchInput
                name="maintenance.isOverlayColor"
                control={control}
                disabled={!isMaintenanceMode}
              />
              <Label className="mb-0.5 ">Overlay color enable?</Label>
            </div>
          </div>

          {isOverlayColor ? (
            <div className="mb-5">
              <div className="flex flex-col gap-y-4">
                <div className="flex items-center space-x-4">
                  <label htmlFor="maintenance.overlayColor">
                    Overlay Color
                  </label>

                  <input
                    type="color"
                    {...register('maintenance.overlayColor')}
                    id="maintenance.overlayColor"
                    disabled={!isMaintenanceMode}
                  />
                </div>
                <div className="flex items-center space-x-4">
                  <label htmlFor="maintenance.overlayColorRange">Alpha</label>
                  <input
                    id="maintenance.overlayColorRange"
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    {...register('maintenance.overlayColorRange')}
                    disabled={!isMaintenanceMode}
                  />
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
          <Input
            label="Button Title One"
            {...register('maintenance.buttonTitleOne')}
            error={t(errors.maintenance?.buttonTitleOne?.message!)}
            variant="outline"
            className="mb-5"
            {...(isMaintenanceMode && {
              required: true,
            })}
            disabled={!isMaintenanceMode}
          />
          <Input
            label="Button Title Two"
            {...register('maintenance.buttonTitleTwo')}
            error={t(errors.maintenance?.buttonTitleTwo?.message!)}
            variant="outline"
            {...(isMaintenanceMode && {
              required: true,
            })}
            disabled={!isMaintenanceMode}
          />
        </Card>
      </div>

      <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
        <Description
          title="News letter settings"
          details="Add news letter settings here."
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label="News letter title."
            {...register('maintenance.newsLetterTitle')}
            error={t(errors.maintenance?.newsLetterTitle?.message!)}
            variant="outline"
            className="mb-5"
            {...(isMaintenanceMode && {
              required: true,
            })}
            disabled={!isMaintenanceMode}
          />
          <TextArea
            label={t('form:input-label-description')}
            {...register('maintenance.newsLetterDescription')}
            error={t(errors.maintenance?.newsLetterDescription?.message!)}
            variant="outline"
            {...(isMaintenanceMode && {
              required: true,
            })}
            disabled={!isMaintenanceMode}
          />
        </Card>
      </div>

      <div className="flex flex-wrap pb-8 my-5 border-b border-dashed border-border-base sm:my-8">
        <Description
          title="Side bar drawer content"
          details="Add side bar content here."
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label="About us heading."
            {...register('maintenance.aboutUsTitle')}
            error={t(errors.maintenance?.aboutUsTitle?.message!)}
            variant="outline"
            className="mb-5"
            {...(isMaintenanceMode && {
              required: true,
            })}
            disabled={!isMaintenanceMode}
          />
          <TextArea
            label={t('form:input-label-description')}
            {...register('maintenance.aboutUsDescription')}
            error={t(errors.maintenance?.aboutUsDescription?.message!)}
            variant="outline"
            className="mb-5"
            {...(isMaintenanceMode && {
              required: true,
            })}
            disabled={!isMaintenanceMode}
          />
          <Input
            label="Contact us heading."
            {...register('maintenance.contactUsTitle')}
            error={t(errors.maintenance?.contactUsTitle?.message!)}
            variant="outline"
            {...(isMaintenanceMode && {
              required: true,
            })}
            disabled={!isMaintenanceMode}
          />
        </Card>
      </div>

      <StickyFooterPanel className="z-0">
        <Button
          loading={loading}
          disabled={loading}
          className="text-sm md:text-base"
        >
          <SaveIcon className="relative w-6 h-6 top-px shrink-0 ltr:mr-2 rtl:pl-2" />
          {t('form:button-label-save-settings')}
        </Button>
      </StickyFooterPanel>
    </form>
  );
}
