import { UserProfile } from '@/widgets'

type Props = {
  params: Promise<{ userId: string }>
}

export default async function User({ params }: Props) {
  const { userId } = await params
  return <UserProfile userId={userId} />
}
