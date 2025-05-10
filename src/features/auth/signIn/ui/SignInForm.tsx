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
import { toBase64Modern } from '@/shared/utils/Base64Convert'
import { useLoginAdminMutation } from '@/shared/graphql/loginAdmin.generated'

export const SignInForm = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const dispatch = useAppDispatch()
  const tAuth = useTranslations('auth')

  const router = useRouter()

  const [login] = useLoginAdminMutation()

  const { register, handleSubmit, formState } = useForm<SignInSchemaData>({
    mode: 'onTouched',
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { errors: validateError, isValid } = formState

  const onSubmit = async ({ email, password }: SignInSchemaData) => {
    try {
      const { data } = await login({
        variables: { email, password },
      })
      const logged = data?.loginAdmin.logged
      if (logged) {
        const auth = email + ':' + password
        dispatch(setIsLoggedIn({ isLoggedIn: logged }))
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
