import { useRef, useState, useEffect } from 'react';
import { Image } from '@/components/ui/image';
import cn from 'classnames';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTranslation } from 'next-i18next';
import { couponPlaceholder } from '@/lib/placeholders';
import { Coupon } from '@/types';
import { VerifyIcon } from '@/components/icons/verify-icon';

type CouponCardProps = {
  coupon: Coupon;
  className?: string;
};

const CouponCard: React.FC<CouponCardProps> = ({ coupon, className }) => {
  const { t } = useTranslation('common');
  const { code, image, target } = coupon;
  const [copyText, setCopyText] = useState({
    value: code,
    copied: false,
  });

  useEffect(() => {
    let timeout: any;
    if (copyText.copied) {
      timeout = setTimeout(() => {
        setCopyText((prev) => ({
          ...prev,
          copied: false,
        }));
      }, 3500);
    }
    return () => clearTimeout(timeout);
  }, [copyText.copied]);

  return (
    <div className={cn('coupon-card', className)}>
      <div className="relative flex overflow-hidden bg-gray-200 rounded">
        <Image
          src={image?.thumbnail ?? couponPlaceholder}
          alt={code}
          width="572"
          height="429"
        />
      </div>
      <div className="grid items-center w-11/12 grid-flow-col px-5 py-4 mx-auto rounded-bl shadow-sm rounded-be auto-cols-fr bg-light">
        <>
          <span className="flex items-center font-semibold uppercase text-heading focus:outline-none gap-1.5">
            {copyText.value}{' '}
            {target ? <VerifyIcon className="w-3.5 h-3.5 text-accent" /> : ''}
          </span>

          {!copyText.copied && (
            <CopyToClipboard
              text={copyText.value}
              onCopy={() =>
                setCopyText((prev) => ({
                  ...prev,
                  copied: true,
                }))
              }
            >
              <button className="text-sm font-semibold transition-colors duration-200 text-accent hover:text-accent-hover focus:text-accent-hover focus:outline-0 ltr:text-right rtl:text-left">
                <span>{t('text-copy')}</span>
              </button>
            </CopyToClipboard>
          )}

          {copyText.copied && (
            <div className="text-sm font-semibold text-accent ltr:text-right rtl:text-left">
              {t('text-copied')}
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default CouponCard;
