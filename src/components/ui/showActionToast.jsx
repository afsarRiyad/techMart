import toast from 'react-hot-toast'
import ActionToast from '@/components/ui/ActionToast'

// one popup per action, so adding two things in a row replaces the notice
// instead of stacking a second copy of it. Five seconds is long enough to see
// the button and reach it, short enough that the card does not sit over the
// page. index.css drains the bar over the same time.
const POPUP_MS = 5000

const showActionToast = ({ id, title, cta, to }) =>
  toast.custom((t) => <ActionToast id={t.id} title={title} cta={cta} to={to} />, {
    id,
    duration: POPUP_MS,
    className: 'appToast actionToastWrap',
  })

export default showActionToast
