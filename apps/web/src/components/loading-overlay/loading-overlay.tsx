import Image from 'next/image'
import styles from './loading-overlay.module.scss'

export function LoadingOverlay() {
  return (
    <div className={styles.wrapper}>
      <Image
        src={'/loading.svg'}
        alt="در حال دریافت اطلاعات..."
        width={40}
        height={40}
      />
    </div>
  )
}
