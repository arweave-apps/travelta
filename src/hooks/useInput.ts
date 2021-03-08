import { useState } from 'react';

type useInputType = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function useInput(initialValue: string): useInputType {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange,
  };
}
