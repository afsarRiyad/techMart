import toast from 'react-hot-toast'
import ActionToast from '@/components/ui/ActionToast'

// one popup per action, so adding two things in a row replaces the notice
// instead of stacking a second copy of it. One second is long enough to read
// the line and keep shopping, short enough that it is gone before the next
// click. index.css drains the bar over the same time (`toastDrain 1s`), so
// changing one means changing the other.
const POPUP_MS = 1000

const showActionToast = ({ id, title, cta, to }) =>
  toast.custom((t) => <ActionToast id={t.id} title={title} cta={cta} to={to} />, {
    id,
    duration: POPUP_MS,
    className: 'appToast actionToastWrap',
  })

export default showActionToast
