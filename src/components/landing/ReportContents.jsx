import {
  IconCalendarEvent,
  IconCalendarCheck,
  IconListNumbers,
  IconMessageCircle,
  IconStairsUp,
  IconTrophy,
} from '@tabler/icons-react'
import Photo from '../Photo.jsx'
import { PHOTOS } from '../../config/images.js'

// What the EazyManage report card contains (GenerateStudentResult on the backend).
const ITEMS = [
  { icon: IconListNumbers, label: 'Score and grade per subject' },
  { icon: IconTrophy, label: 'Average and class position' },
  { icon: IconCalendarCheck, label: 'Attendance for the term' },
  { icon: IconMessageCircle, label: 'Conduct and teacher’s remarks' },
  { icon: IconStairsUp, label: 'Promotion at the end of the year' },
  { icon: IconCalendarEvent, label: 'Vacation and reopening dates' },
]

export default function ReportContents() {
  return (
    <section className="section" aria-labelledby="report-title">
      <div className="container split">
        <div className="split__media">
          <Photo photo={PHOTOS.classroom} className="split__photo" sizes="(min-width: 900px) 50vw, 100vw" />
        </div>
        <div>
          <h2 id="report-title" className="section__title">
            The full report card
          </h2>
          <ul className="report-items">
            {ITEMS.map((item) => (
              <li key={item.label}>
                <span className="report-items__icon">
                  <item.icon size={20} aria-hidden="true" />
                </span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
