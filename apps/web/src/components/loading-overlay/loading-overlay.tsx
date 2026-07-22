import styles from './loading-overlay.module.scss'

export function LoadingOverlay() {
  return (
    <div className={styles.wrapper}>
      <span className={styles.loading}></span>
    </div>
  )
}
