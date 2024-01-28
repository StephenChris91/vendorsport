import Uploader from '@/components/common/uploader';
import { Controller } from 'react-hook-form';

interface FileInputProps {
  control: any;
  name: string;
  multiple?: boolean;
  acceptFile?: boolean;
  helperText?: string;
  maxSize?: number;
  disabled?: boolean;
}

const FileInput = ({
  control,
  name,
  multiple = true,
  acceptFile = false,
  helperText,
  maxSize,
  disabled,
}: FileInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, ...rest } }) => (
        <Uploader
          {...rest}
          multiple={multiple}
          acceptFile={acceptFile}
          helperText={helperText}
          maxSize={maxSize}
          disabled={disabled}
        />
      )}
    />
  );
};

export default FileInput;
