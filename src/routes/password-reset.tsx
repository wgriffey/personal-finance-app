import PasswordResetRequestForm from '@auth/components/PasswordResetForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/password-reset')({
  component: PasswordReset,
})

function PasswordReset() {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center bg-backgroundColor-primary px-10 text-center shadow-lg backdrop-blur-sm backdrop-filter">
      <h1 className="mb-4 font-mono text-4xl text-textColor-primary">
        Reset Your Password
      </h1>
      <div className="grid h-[80%] w-full max-w-[720px] grid-cols-1 items-center justify-items-center rounded-md border border-solid border-textColor-primary bg-transparent px-4 py-10 lg:w-[60%]">
        <PasswordResetRequestForm />
      </div>
    </div>
  )
}
