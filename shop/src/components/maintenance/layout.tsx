import MaintenanceMode from '@/components/maintenance';
import ErrorMessage from '@/components/ui/error-message';
import Spinner from '@/components/ui/loaders/spinner/spinner';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { useSettings } from '@/framework/settings';
import {
  adminOnly,
  getAuthCredentials,
  hasAccess,
} from '@/framework/utils/auth-utils';
import {
  NEWSLETTER_POPUP_MODAL_KEY,
  checkIsMaintenanceModeComing,
  checkIsMaintenanceModeStart,
} from '@/lib/constants';
import { eachDayOfInterval, isTomorrow } from 'date-fns';
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';

type MaintenanceProps = {
  children: React.ReactNode;
};

export const isInArray = (array: Date[], value: Date) => {
  return !!array?.find((item) => {
    return item?.getDate() == value?.getDate();
  });
};

const Maintenance = ({ children }: MaintenanceProps) => {
  const { settings, isLoading: settingLoading, error } = useSettings();
  const router = useRouter();
  const { locale } = router;
  const [underMaintenanceIsComing, setUnderMaintenanceIsComing] = useAtom(
    checkIsMaintenanceModeComing,
  );
  const [underMaintenanceStart, setUnderMaintenanceStart] = useAtom(
    checkIsMaintenanceModeStart,
  );

  const { permissions } = getAuthCredentials();
  const AccessAdminRoles = hasAccess(adminOnly, permissions);
  const { openModal } = useModalAction();

  useEffect(() => {
    if (settings?.maintenance?.start && settings?.maintenance?.until) {
      const dateInterVal = eachDayOfInterval({
        start: new Date(settings?.maintenance?.start),
        end: new Date(settings?.maintenance?.until),
      });
      const beforeDay = isTomorrow(
        new Date(settings?.maintenance?.start as string),
      );
      const checkIsMaintenance = beforeDay && settings?.isUnderMaintenance;
      const checkIsMaintenanceStart =
        isInArray(dateInterVal, new Date()) && settings?.isUnderMaintenance;
      setUnderMaintenanceStart(checkIsMaintenanceStart ?? false);
      setUnderMaintenanceIsComing(checkIsMaintenance ?? false);
    }
  }, [
    settings?.isUnderMaintenance,
    settings?.maintenance?.start,
    settings?.maintenance?.until,
    settingLoading,
    settings,
    locale,
  ]);

  useEffect(() => {
    if (Boolean(settings?.isPromoPopUp)) {
      let seenPopup = Cookies.get(NEWSLETTER_POPUP_MODAL_KEY);
      if (!underMaintenanceStart && !AccessAdminRoles && !Boolean(seenPopup)) {
        let timer = setTimeout(
          () =>
            openModal('PROMO_POPUP_MODAL', {
              isLoading: settingLoading,
              popupData: settings?.promoPopup,
            }),
          Number(settings?.promoPopup?.popUpDelay),
        );
        return () => clearTimeout(timer);
      }
    }
  }, [
    settings?.isPromoPopUp,
    settings?.promoPopup?.popUpDelay,
    underMaintenanceStart,
    AccessAdminRoles,
    settingLoading,
  ]);

  if (settingLoading) {
    return <Spinner />;
  }

  if (error) return <ErrorMessage message={error.message} />;

  if (underMaintenanceStart && !AccessAdminRoles) {
    return <MaintenanceMode />;
  }

  return <>{children}</>;
};

export default Maintenance;
