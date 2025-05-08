'use client'
import { TabContent, Tabs } from '@/shared/ui/tabs'
import { useTranslations } from 'next-intl'
import { Followers, Following } from '../../followManagement'
import { Payments } from '../../payments'
import { UploadedPhotos } from '../../uploadedPhotos'
import s from './ProfileTabs.module.scss'

type Props = {
  userId: string
}

export const ProfileTabs = ({ userId }: Props) => {
  const t = useTranslations('userProfile')

  const tabs = [
    {
      title: t('uploadedPhotos'),
      value: 'uploadedPhotos',
      content: <UploadedPhotos userId={userId} />,
    },
    { title: t('payments'), value: 'payments', content: <Payments userId={userId} /> },
    { title: t('followers'), value: 'followers', content: <Followers userId={userId} /> },
    { title: t('following'), value: 'following', content: <Following userId={userId} /> },
  ]

  return (
    <Tabs
      tabs={tabs.map(tab => ({ title: tab.title, value: tab.value }))}
      fullWidth
      defaultValue={tabs[0].value}
      className={s.tabsList}
    >
      {tabs.map(({ value, content }) => (
        <TabContent value={value} key={value}>
          {content}
        </TabContent>
      ))}
    </Tabs>
  )
}
