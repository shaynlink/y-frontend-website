import type { ReactNode } from 'react'
import styles from './ClickableLayer.module.scss'

interface ModalProps {
  children: ReactNode;
}

export default function ClickableLayer({ children }: ModalProps) {
  return (
    <div className={styles.layer}>
      {children}
    </div>
  )
}