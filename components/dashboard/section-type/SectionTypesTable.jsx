import NextImage from 'next/image'
import ItemsTable from '../ItemsTable'
import DeleteSectionTypeButton from './DeleteSectionTypeButton'
import prisma from '@/utils/db'
import Link from 'next/link'

export default async function SectionTypesTable() {
  const items = await prisma.sectionType.findMany()

  const tableStructure = {
    columns: [
      {
        title: 'Slika',
        width: '20%',
        getJSX: (index) => (
          <NextImage
            src={items[index].image}
            alt={items[index].image}
            className="items-table-image"
            width={200}
            height={200}
          />
        ),
      },
      {
        title: 'Naslov',
        width: '70%',
        getJSX: (index) => <span>{items[index].title}</span>,
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
              <Link href={`/dashboard/tipovi-sekcija/${items[index].id}`}>
                {' '}
                Uredi{' '}
              </Link>
              <DeleteSectionTypeButton
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
