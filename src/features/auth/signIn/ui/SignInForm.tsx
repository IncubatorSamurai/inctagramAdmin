'use client'
import { useRouter } from '@/i18n/routing'
import { PATH } from '@/shared/config/routes'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import s from './SignInForm.module.scss'
import { setIsLoggedIn } from '@/shared/store/appSlice/appSlice'
import { useAppDispatch } from '@/shared/hooks'
import { SignInSchema, SignInSchemaData } from '@/shared/schemes/signInSchema'
import { useTranslations } from 'next-intl'
import { useMutation } from '@apollo/client'
import { LOGIN_ADMIN } from '@/shared/graphql'
import { toBase64Modern } from '@/shared/utils/Base64Convert'

export const SignInForm = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const dispatch = useAppDispatch()
  const tAuth = useTranslations('auth')

  const router = useRouter()

  const [loginAdmin] = useMutation(LOGIN_ADMIN)

  const { register, handleSubmit, formState } = useForm<SignInSchemaData>({
    mode: 'onTouched',
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { errors: validateError, isValid } = formState

  const onSubmit = async (data: SignInSchemaData) => {
    try {
      const response = await loginAdmin({
        variables: { email: data?.email, password: data?.password },
      })
      const logged = response.data.loginAdmin.logged
      if (logged) {
        const auth = data?.email + ':' + data?.password
        dispatch(setIsLoggedIn({ isLoggedIn: response.data.loginAdmin.logged }))
        localStorage.setItem('authorization', toBase64Modern(auth))
        router.push(PATH.USERS_LIST)
      } else {
        setErrorMessage('Incorrect login or password')
      }
    } catch (error) {
      console.log('request error: ' + error)
    }
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
