import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import PasswordInput from '@/components/ui/password-input';
import { useAddStaffMutation, useShopQuery } from '@/graphql/shops.graphql';
import { useForm } from 'react-hook-form';
import { getErrorMessage } from '@/utils/form-error';
import Card from '@/components/common/card';
import Description from '@/components/ui/description';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { passwordRules } from '@/utils/constants';
import StickyFooterPanel from '@/components/ui/sticky-footer-panel';

type FormValues = {
  name: string;
  email: string;
  password: string;
};
const staffFormSchema = yup.object().shape({
  name: yup.string().required('form:error-name-required'),
  email: yup
    .string()
    .email('form:error-email-format')
    .required('form:error-email-required'),
  password: yup
    .string()
    .required('form:error-password-required')
    .matches(passwordRules, {
      message:
        'Please create a stronger password. hint: Min 8 characters, 1 Upper case letter, 1 Lower case letter, 1 Numeric digit.',
    }),
});
const AddStaffForm = () => {
  const router = useRouter();
  const {
    query: { shop },
  } = router;
  const { data: shopData } = useShopQuery({
    variables: {
      slug: shop as string,
    },
  });
  const shopId = shopData?.shop?.id!;
  const {
    register,
    handleSubmit,
    setError,

    formState: { errors },
  } = useForm<FormValues>({
    //@ts-ignore
    resolver: yupResolver(staffFormSchema),
  });
  const [addStaff, { loading }] = useAddStaffMutation({
    onCompleted: () => {
      router.push(`/${router.query.shop}/staffs`);
    },
    onError: (error) => {
      const serverErrors = getErrorMessage(error);
      Object.keys(serverErrors?.validation).forEach((field: any) => {
        setError(field.split('.')[1], {
          type: 'manual',
          message: serverErrors?.validation[field][0],
        });
      });
    },
  });
  const { t } = useTranslation();

  function onSubmit({ name, email, password }: FormValues) {
    addStaff({
      variables: {
        input: {
          name,
          email,
          password,
          shop_id: shopId,
        },
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="my-5 flex flex-wrap sm:my-8">
        <Description
          title={t('form:form-title-information')}
          details={t('form:form-description-staff-info')}
          className="w-full px-0 pb-5 sm:w-4/12 sm:py-8 sm:pe-4 md:w-1/3 md:pe-5"
        />

        <Card className="w-full sm:w-8/12 md:w-2/3">
          <Input
            label={t('form:input-label-name')}
            {...register('name')}
            type="text"
            variant="outline"
            className="mb-4"
            error={t(errors.name?.message!)}
            required
          />
          <Input
            label={t('form:input-label-email')}
            {...register('email')}
            type="email"
            variant="outline"
            className="mb-4"
            error={t(errors.email?.message!)}
            required
          />
          <PasswordInput
            label={t('form:input-label-password')}
            {...register('password')}
            error={t(errors.password?.message!)}
            variant="outline"
            className="mb-4"
            required
          />
        </Card>
      </div>

      <StickyFooterPanel>
        <div className="text-end">
          <Button loading={loading} disabled={loading}>
            {t('form:button-label-add-staff')}
          </Button>
        </div>
      </StickyFooterPanel>
    </form>
  );
};

export default AddStaffForm;
