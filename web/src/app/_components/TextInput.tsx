'use client'

import { ITextInputProps } from '@/interfaces/input.interface';
import { FC, ReactElement, useState } from 'react';
import { Input } from "@/components/ui/input"
import { Eye, EyeClosed } from 'lucide-react';

const TextInput: FC<ITextInputProps> = (props): ReactElement => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  return (
    <div className='relative'>
      {props.type === 'password' && (
        <div onClick={() => setShowPassword(!showPassword)} className="absolute right-0 flex h-full cursor-pointer items-center pr-3">
          {showPassword ? (
            <Eye />
          ) : (
            <EyeClosed />
          )}
        </div>
      )}
      <Input
        id={props.id}
        name={props.name}
        type={props.type === 'password' ? showPassword ? 'text' : 'password' : props.type}
        value={props.value}
        readOnly={props.readOnly}
        checked={props.checked}
        className={props.className}
        maxLength={props.maxLength}
        style={props.style}
        placeholder={props.placeholder}
        min={props.min}
        max={props.max}
        onChange={props.onChange}
        onClick={props.onClick}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        onKeyUp={props.onKeyUp}
        onKeyDown={props.onKeyDown}
        autoComplete="false"
      />
    </div>
  )
}

export default TextInput;
