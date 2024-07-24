import NextImage from 'next/image'
import ItemsTable from '../ItemsTable'
import DeleteWorkshopsButton from './DeleteWorkshopsButton'
import prisma from '@/utils/db'
import ToggleItemVisibility from '../ToggleItemVisibility'
import ProgressBar from '../ProgressBar'
import { formatDate } from '@/utils/formatDate'
import Link from 'next/link'

export default async function WorkshopsTable() {
  const items = await prisma.workshop.findMany({
    include: {
      _count: {
        select: { applications: true },
      },
    },
  })

  const tableStructure = {
    columns: [
      {
        title: 'Slika',
        width: '20%',
        getJSX: (index) =>
          items[index].image ? (
            <NextImage
              src={items[index].image}
              alt={items[index].image}
              className="items-table-image"
              width={200}
              height={200}
            />
          ) : (
            <span className="items-table-image-placeholder">
              {items[index].image?.charAt(0).toUpperCase()}
              {items[index].image?.split(' ')[1]
                ? items[index].image?.split(' ')[1].charAt(0).toUpperCase()
                : null}
            </span>
          ),
      },
      {
        title: 'Naslov',
        width: '30%',
        getJSX: (index) => <span>{items[index].title}</span>,
      },
      {
        title: 'Datum održavanja',
        width: '10%',
        getJSX: (index) => <span>{formatDate(items[index].date)}</span>,
      },
      {
        title: 'Broj prijava',
        width: '10%',
        getJSX: (index) => (
          <div className="progress-bar-container">
            <ProgressBar
              current={items[index]._count.applications}
              total={items[index].maxApplicant}
            />
            <span className="progress-bar-text">
              {items[index]._count.applications}/{items[index].maxApplicant}
            </span>
          </div>
        ),
      },
      {
        title: 'Datum kreiranja',
        width: '10%',
        getJSX: (index) => <span> {formatDate(items[index].createdAt)}</span>,
      },
      {
        title: 'Vidljivost',
        width: '10%',
        getJSX: (index) => (
          <ToggleItemVisibility item={items[index]} type="workshop" />
        ),
      },
      {
        title: 'Akcije',
        width: '10%',
        getJSX: (index) => (
          <div className="items-table-actions-button">
            <div className="items-table-actions-dot"></div>
            <div className="items-table-actions-dot"></div>
            <div className="items-table-actions-dot"></div>

            <div className="items-table-actions-dropdown">
              <Link
                href={`/dashboard/radionice/${items[index].id + '/prijave'}`}
              >
                {' '}
                Prijave
              </Link>
              <Link href={`/dashboard/radionice/${items[index].id}`}>
                {' '}
                Uredi{' '}
              </Link>

              <DeleteWorkshopsButton
                id={items[index].id}
                title={items[index].title}
              />
            </div>
          </div>
        ),
      },
    ],
  }

  return <ItemsTable items={items} tableStructure={tableStructure} />
}
