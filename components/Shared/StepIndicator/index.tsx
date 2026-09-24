import type { StepIndicatorProps } from '@/types/ui'
import styles from './style.module.scss'

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const steps = Array.from({ length: totalSteps }, (_, index) => index + 1)

  return (
    <div className={styles.indicator}>
      <ul className={styles.dots}>
        {steps.map((step) => (
          <li key={step} className={step === currentStep ? styles.dotActive : styles.dot} />
        ))}
      </ul>
      <p className={styles.count}>
        {currentStep} / {totalSteps}
      </p>
    </div>
  )
}
