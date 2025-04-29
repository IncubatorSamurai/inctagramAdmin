'use client'
import { useRouter } from '@/i18n/routing'
import { useLoginMutation } from '@/shared/api/auth/authApi'
import { PATH } from '@/shared/config/routes'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import s from './SignInForm.module.scss'
import { ErrorResponse } from '@/shared/types/auth'
import { setIsLoggedIn } from '@/shared/store/appSlice/appSlice'
import { useAppDispatch } from '@/shared/hooks'
import { SignInSchema, SignInSchemaData } from '@/shared/schemes/signInSchema'
import { useTranslations } from 'next-intl'

export const SignInForm = () => {
  const [errorMessage, setEmailMessage] = useState('')
  const [login, { data, error }] = useLoginMutation()
  const dispatch = useAppDispatch()
  const tAuth = useTranslations('auth')

  const router = useRouter()

  const { register, handleSubmit, formState } = useForm<SignInSchemaData>({
    mode: 'onTouched',
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { errors: validateError, isValid } = formState

  useEffect(() => {
    if (data?.accessToken) {
      localStorage.setItem('access_token', data?.accessToken)
      dispatch(setIsLoggedIn({ isLoggedIn: true }))
      router.push(PATH.HOME)
      return
    }

    const errorMessage = error as ErrorResponse<string>
    setEmailMessage(errorMessage?.data?.messages || validateError?.email?.message || '')
  }, [dispatch, router, error, validateError, data?.accessToken])

  const onSubmit = (data: SignInSchemaData) => {
    login({ email: data.email, password: data.password })
      .unwrap()
      .then(() => {
        localStorage.setItem('email', data?.email)
      })
  }
  const disabled = !isValid
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register('email')}
        error={errorMessage}
        className={s.input}
        label={tAuth('email')}
        placeholder="Epam@epam.com"
      />
      <Input
        {...register('password')}
        error={validateError?.password?.message}
        label={tAuth('password')}
        placeholder="**********"
        type="password"
      />
      <div className={s.box}>
        <Button fullWidth={true} disabled={disabled}>
          {tAuth('signIn')}
        </Button>
      </div>
    </form>
  )
}
