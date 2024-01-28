import { useSettings } from '@/framework/settings';
import Logo from '@/components/ui/logo';
import CountdownTimer from '@/components/ui/countdown-timer/maintenance';
import Button from '@/components/ui/button';
import { BellIcon } from '@/components/icons/bell-icon';
import { LongArrowIcon } from '@/components/icons/long-arrow-icon';
import Image from 'next/image';
import { useModalAction } from '@/components/ui/modal/modal.context';
import { useAtom } from 'jotai';
import { drawerAtom } from '@/store/drawer-atom';
import { isMultiLangEnable } from '@/lib/constants';
import { LangIcon } from '@/components/icons/lang-icon';
import { useState } from 'react';
import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';
import { CloseIconNew } from '@/components/icons/close-icon';
import { languageMenu } from '@/lib/locals';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const MaintenanceMode = () => {
  const { settings } = useSettings();
  const { openModal } = useModalAction();
  const [_, setDrawerView] = useAtom(drawerAtom);
  const { t } = useTranslation('common');
  const [langOnClick, setLangOnClick] = useState<boolean>(false);
  const router = useRouter();
  const { locale, asPath, locales } = router;

  let filterItem = languageMenu?.filter((element) =>
    locales?.includes(element?.value)
  );

  const currentSelectedItem = locale
    ? filterItem?.find((o) => o?.value === locale)!
    : filterItem[2];
  const [selectedItem, setSelectedItem] = useState(currentSelectedItem?.value);

  const openNewsLetterModal = () => {
    openModal('NEWSLETTER_MODAL', {
      title: settings?.maintenance?.newsLetterTitle as string,
      description: settings?.maintenance?.newsLetterDescription as string,
    });
  };

  const handleItemClick = (item: string) => {
    Cookies.set('NEXT_LOCALE', item, { expires: 365 });
    setSelectedItem(item);
    router.push(asPath, undefined, {
      locale: item,
    });
  };

  const handleSidebar = (view: string) => {
    setDrawerView({
      display: true,
      view,
      data: {
        aboutUsTitle: settings?.maintenance?.aboutUsTitle,
        aboutUsDescription: settings?.maintenance?.aboutUsDescription,
        contactUsTitle: settings?.maintenance?.contactUsTitle,
        contactDetails: settings?.contactDetails,
      },
    });
  };

  return (
    <div className="relative h-screen min-h-[43.75rem] w-full bg-[#e6e5eb] text-center">
      <div className="relative z-20 mx-auto h-[calc(100%-70px)] max-w-7xl px-8">
        <div className="flex items-center justify-center pt-8">
          <Logo />
        </div>
        <div className="relative mt-8 lg:mt-16">
          <div>
            {settings?.maintenance?.title ? (
              <h1 className="mb-4 text-xl font-bold tracking-tight text-black lg:mb-8 lg:text-6xl">
                {settings?.maintenance?.title}
              </h1>
            ) : (
              ''
            )}
            {settings?.maintenance?.description ? (
              <p className="m-0 mx-auto max-w-md text-base leading-8 text-black lg:text-lg">
                {settings?.maintenance?.description}
              </p>
            ) : (
              ''
            )}
            <div className="mt-7 lg:mt-14">
              <CountdownTimer
                date={
                  new Date(
                    settings?.maintenance?.start
                      ? (settings?.maintenance?.until as string)
                      : (settings?.maintenance?.start as string),
                  )
                }
              />
            </div>
            {settings?.maintenance?.buttonTitleOne ||
            settings?.maintenance?.buttonTitleTwo ? (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-5 lg:mt-16">
                {settings?.maintenance?.buttonTitleOne ? (
                  <Button
                    onClick={openNewsLetterModal}
                    className="notify-button group h-auto rounded-full py-2.5 text-sm md:text-base"
                  >
                    {settings?.maintenance?.buttonTitleOne}
                    <span className="notify-button-icon flex h-9 w-9 rounded-full bg-accent-hover transition-colors duration-500 group-hover:bg-accent ltr:ml-3 rtl:mr-3">
                      <BellIcon className="m-auto" />
                    </span>
                  </Button>
                ) : (
                  ''
                )}
                {settings?.maintenance?.buttonTitleTwo ? (
                  <Button
                    onClick={() => handleSidebar('MAINTENANCE_MORE_INFO')}
                    className="info-button group h-auto rounded-full bg-white py-2.5 text-sm text-slate-700 hover:bg-slate-300 hover:text-slate-600 md:text-base"
                  >
                    {settings?.maintenance?.buttonTitleTwo}
                    <span className="info-button-icon flex h-9 w-9 rounded-full bg-slate-300 text-black duration-500 group-hover:bg-slate-400 group-hover:text-white ltr:ml-3 rtl:mr-3 rtl:rotate-180 rtl:transform">
                      <LongArrowIcon className="m-auto text-3xl" />
                    </span>
                  </Button>
                ) : (
                  ''
                )}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
      {settings?.maintenance?.image?.original ? (
        <div className="absolute top-0 left-0 z-10 h-full w-full bg-no-repeat">
          <Image
            src={settings?.maintenance?.image?.original}
            alt="maintenance image"
            fill
            className="object-contain object-bottom"
          />
        </div>
      ) : (
        ''
      )}
      {settings?.maintenance?.isOverlayColor ? (
        <div
          style={{
            backgroundColor: settings?.maintenance?.overlayColor as string,
            opacity: settings?.maintenance?.overlayColorRange as string,
          }}
          className="absolute top-0 left-0 z-10 h-full w-full"
        />
      ) : (
        ''
      )}
      {isMultiLangEnable && !isEmpty(filterItem) ? (
        <div className="fixed bottom-5 right-5 z-50">
          {langOnClick ? (
            <div className="absolute bottom-16 right-1 max-w-md overflow-hidden rounded-2xl bg-white shadow-lg md:bottom-24">
              <div className="bg-[#f0f4f8] px-4 py-5 text-left text-lg font-bold leading-none text-black md:px-8">
                <h3>{t('text-title-change-language')}</h3>
              </div>
              <div className="flex gap-2 px-4 pt-5 pb-2 md:px-8">
                {filterItem?.map((item, index) => {
                  return (
                    <button
                      key={index}
                      className={twMerge(
                        classNames(
                          'relative block h-9 w-9 shrink-0 overflow-hidden rounded-full border-4 border-transparent object-cover transition-all duration-300 md:h-12 md:w-12 [&>svg]:left-0 [&>svg]:top-0 [&>svg]:block [&>svg]:h-full [&>svg]:w-full',
                          selectedItem === item?.value ? 'border-accent' : '',
                        ),
                      )}
                      onClick={() => handleItemClick(item?.value)}
                    >
                      {item?.icon}
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-1 px-5 pt-2 pb-5 text-left text-base md:px-9">
                <span className="font-medium">{t('text-title-language')}</span>:
                <span className="font-bold">{currentSelectedItem?.name}</span>
              </div>
            </div>
          ) : (
            ''
          )}
          <button
            className={twMerge(
              classNames(
                'fixed right-5 bottom-8 z-50 flex h-10 w-10 cursor-pointer rounded-full bg-accent text-xl text-white md:h-16 md:w-16 md:text-3xl',
                langOnClick ? '' : 'lang-switch-icon',
              ),
            )}
            onClick={() => setLangOnClick(!langOnClick)}
          >
            {langOnClick ? (
              <CloseIconNew className="m-auto" />
            ) : (
              <LangIcon className="m-auto" />
            )}
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default MaintenanceMode;
