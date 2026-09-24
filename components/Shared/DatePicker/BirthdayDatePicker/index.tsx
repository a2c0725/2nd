'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import clsx from 'clsx'
import type { FormBirthdayDatePickerProps } from '@/types/form'
import { usedClasses } from '@/utility/usedClasses'
import styles from './style.module.scss'

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土']
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1)
const YEAR_RANGE = 100

function formatDisplay(value: string) {
  if (!value) return ''
  const [year, month, day] = value.split('-')
  return `${year}/${month}/${day}`
}

function buildCalendarCells(year: number, month: number) {
  const startWeekday = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: (number | null)[] = Array.from({ length: startWeekday }, () => null)
  for (let day = 1; day <= daysInMonth; day++) cells.push(day)
  return cells
}

export default function FormBirthdayDatePicker({
  name,
  value,
  onChange,
  placeholder,
  type,
  used,
  error,
  disabled,
}: FormBirthdayDatePickerProps) {
  const [open, setOpen] = useState(false)
  const initialDate = value ? new Date(value) : new Date()
  const [viewYear, setViewYear] = useState(initialDate.getFullYear())
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth())
  const [step, setStep] = useState<'year' | 'month' | 'day'>('year')
  const [calendarPosition, setCalendarPosition] = useState({ top: 0, left: 0 })
  const wrapperRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const calendarRef = useRef<HTMLDivElement>(null)
  const selectedYearTagRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node
      if (wrapperRef.current?.contains(target)) return
      if (calendarRef.current?.contains(target)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  useLayoutEffect(() => {
    if (!open) return
    function updatePosition() {
      const rect = triggerRef.current?.getBoundingClientRect()
      if (!rect) return
      const calendarHeight = calendarRef.current?.getBoundingClientRect().height ?? 0
      const spaceBelow = window.innerHeight - rect.bottom
      const spaceAbove = rect.top
      const showAbove = spaceBelow < calendarHeight + 8 && spaceAbove > spaceBelow
      setCalendarPosition({
        top: showAbove ? rect.top - calendarHeight - 8 : rect.bottom + 8,
        left: rect.left,
      })
    }
    updatePosition()
    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('resize', updatePosition)
    return () => {
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('resize', updatePosition)
    }
  }, [open, viewYear, viewMonth, step])

  useEffect(() => {
    if (step === 'year') {
      selectedYearTagRef.current?.scrollIntoView({ block: 'center' })
    }
  }, [step])

  function handleToggleOpen() {
    if (disabled) return
    setOpen((prev) => {
      const next = !prev
      if (next) setStep('year')
      return next
    })
  }

  function handleSelectYear(year: number) {
    setViewYear(year)
    setStep('month')
  }

  function handleSelectMonth(month: number) {
    setViewMonth(month - 1)
    setStep('day')
  }

  function handleSelectDay(day: number) {
    const mm = String(viewMonth + 1).padStart(2, '0')
    const dd = String(day).padStart(2, '0')
    onChange(`${viewYear}-${mm}-${dd}`)
    setOpen(false)
  }

  const cells = buildCalendarCells(viewYear, viewMonth)
  const [selectedYear, selectedMonth, selectedDay] = value ? value.split('-').map(Number) : []
  const isSelectedMonth = selectedYear === viewYear && selectedMonth === viewMonth + 1
  const currentYear = new Date().getFullYear()
  const yearOptions = Array.from({ length: YEAR_RANGE + 1 }, (_, i) => currentYear - i)

  return (
    <div className={clsx(styles.formDatePicker, ...usedClasses(styles, used))} ref={wrapperRef}>
      <button
        type="button"
        ref={triggerRef}
        className={clsx(styles.trigger, error && styles.hasError, !value && styles.placeholder)}
        onClick={handleToggleOpen}
        disabled={disabled}
      >
        {value ? formatDisplay(value) : (placeholder ?? '日付を選択')}
      </button>
      {open &&
        createPortal(
          <div
            className={styles.calendar}
            ref={calendarRef}
            style={{ top: calendarPosition.top, left: calendarPosition.left }}
          >
            {step === 'year' ? (
              <div className={styles.yearList}>
                {yearOptions.map((year) => (
                  <button
                    type="button"
                    key={year}
                    ref={year === selectedYear ? selectedYearTagRef : undefined}
                    className={clsx(styles.yearTag, year === selectedYear && styles.yearTagSelected)}
                    onClick={() => handleSelectYear(year)}
                  >
                    {year}
                  </button>
                ))}
              </div>
            ) : step === 'month' ? (
              <>
                <div className={styles.calendarHeader}>
                  <button
                    type="button"
                    className={styles.navButton}
                    onClick={() => setStep('year')}
                    aria-label="年選択に戻る"
                  >
                    ‹
                  </button>
                  <span className={styles.calendarTitle}>{viewYear}年</span>
                  <span className={styles.navButtonSpacer} />
                </div>
                <div className={styles.monthGrid}>
                  {MONTHS.map((month) => (
                    <button
                      type="button"
                      key={month}
                      className={clsx(
                        styles.monthCell,
                        selectedYear === viewYear && selectedMonth === month && styles.monthCellSelected,
                      )}
                      onClick={() => handleSelectMonth(month)}
                    >
                      {month}月
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className={styles.calendarHeader}>
                  <button
                    type="button"
                    className={styles.navButton}
                    onClick={() => setStep('month')}
                    aria-label="月選択に戻る"
                  >
                    ‹
                  </button>
                  <span className={styles.calendarTitle}>
                    {viewYear}年{viewMonth + 1}月
                  </span>
                  <span className={styles.navButtonSpacer} />
                </div>
                <div className={styles.weekRow}>
                  {WEEKDAYS.map((weekday) => (
                    <span className={styles.weekday} key={weekday}>
                      {weekday}
                    </span>
                  ))}
                </div>
                <div className={styles.daysGrid}>
                  {cells.map((day, index) =>
                    day === null ? (
                      <span className={styles.emptyDay} key={`empty-${index}`} />
                    ) : (
                      <button
                        type="button"
                        className={clsx(
                          styles.day,
                          isSelectedMonth && day === selectedDay && styles.daySelected,
                        )}
                        onClick={() => handleSelectDay(day)}
                        key={day}
                      >
                        {day}
                      </button>
                    ),
                  )}
                </div>
              </>
            )}
          </div>,
          document.body,
        )}
      <input type="hidden" name={name} value={value} required={type === 'required'} />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}
