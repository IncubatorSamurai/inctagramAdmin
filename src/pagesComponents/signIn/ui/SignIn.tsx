import { Typography } from '@/shared/ui/typography'
import { Card } from '@/shared/ui/card'
import s from './SignIn.module.scss'
import { SignInForm } from '@/features/auth'
import { useTranslations } from 'next-intl'

export const SignInPage = () => {
  const tAuth = useTranslations('auth')

  return (
    <Card className={s.wrapper}>
      <Typography className={s.text} variant="h1">
        {tAuth('signInHeader')}
      </Typography>
      <SignInForm />
    </Card>
  )
}
