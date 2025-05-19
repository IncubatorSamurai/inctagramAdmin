import { Button } from '@/shared/ui/button'
import { BlockIcon } from '@/shared/assets/icons/BlockIcon'
import { Typography } from '@/shared/ui/typography'
import { Modal } from '@/shared/ui/modal'
import s from './BanUserModal.module.scss'
import { SelectBox } from '@/shared/ui/select'
import { SelectOptionsList } from '@/shared/ui/select/SelectOptionsList'
import { useState } from 'react'
import { Input } from '@/shared/ui/input'
import { useForm } from 'react-hook-form'
import { banUserReasonSchema, BanUserReasonSchema } from '@/shared/schemes/banUserShema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useBanUserMutation } from '@/shared/graphql/banUser.generated'
import { client } from '@/app/_providers/apollo-client'
import { toast } from 'react-toastify'
import { optionsBanUser } from './consts'
import { UserIdAndNameProps } from '@/shared/types'

export const BanUserModal = ({ name, id }: UserIdAndNameProps) => {
  const [isAnotherReason, setIsAnotherReason] = useState(false)
  const [open, setOpen] = useState(false)

  const [addToBan, { loading }] = useBanUserMutation()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<BanUserReasonSchema>({
    resolver: zodResolver(banUserReasonSchema),
    mode: 'onTouched',
  })

  const isReason = watch('reason')

  const handleSubmitForm = async (data: BanUserReasonSchema) => {
    try {
      await addToBan({
        variables: {
          userId: id,
          banReason: data.reason,
        },
      })
      toast.success('User has been banned successfully')
      await client
        .refetchQueries({
          include: ['GetUsers'],
        })
        .then(() => setOpen(false))
    } catch {
      toast.error('Error while banning user')
    }
  }

  const onValueChange = (value: string) => {
    if (value === 'AnotherReason') {
      reset()
      setIsAnotherReason(true)
    } else {
      setValue('reason', value)
      setIsAnotherReason(false)
    }
  }
  const isDisabled = !isReason || loading
  return (
    <Modal
      className={s.banUserModal}
      title="Ban user"
      open={open}
      onOpenChange={setOpen}
      trigger={
        <Button variant="icon">
          <BlockIcon />
          <Typography variant="regular_text_14">Ban in the System</Typography>
        </Button>
      }
    >
      <form className={s.banUserContainer} onSubmit={handleSubmit(handleSubmitForm)}>
        <Typography variant="regular_text_16">Are you sure to ban this user, ${name} ?</Typography>
        <div className={s.selectBox}>
          <SelectBox
            placeholder={'Reason for ban'}
            onValueChange={onValueChange}
            {...register('reason')}
          >
            <SelectOptionsList options={optionsBanUser} />
          </SelectBox>
          <Typography variant="error"></Typography>
        </div>
        {isAnotherReason && (
          <Input
            error={errors.reason?.message}
            className={s.inputBox}
            isRequired={true}
            label="Please put down another reason"
            {...register('reason')}
          />
        )}
        <div className={s.row}>
          <Button className={s.btn} type="button" variant="outline" onClick={() => setOpen(false)}>
            No
          </Button>
          <Button className={s.btn} disabled={isDisabled}>
            Yes
          </Button>
        </div>
      </form>
    </Modal>
  )
}
