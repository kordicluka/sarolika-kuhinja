import NextImage from 'next/image'
import ItemsTable from '../ItemsTable'
import DeletePostsButton from './DeletePostsButton'
import prisma from '@/utils/db'
import ToggleItemVisibility from '../ToggleItemVisibility'
import Link from 'next/link'

export default async function SectionTypesTable() {
  const items = await prisma.post.findMany()

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
        width: '50%',
        getJSX: (index) => <span>{items[index].title}</span>,
      },
      {
        title: 'Datum kreiranja',
        width: '10%',
        getJSX: (index) => (
          <span>
            {new Date(items[index].createdAt).toLocaleDateString('hr-HR')}
          </span>
        ),
      },
      {
        title: 'Vidljivost',
        width: '10%',
        getJSX: (index) => (
          <ToggleItemVisibility item={items[index]} type="post" />
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
              <Link href={`/dashboard/blog/${items[index].id}`}> Uredi </Link>
              <DeletePostsButton
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
