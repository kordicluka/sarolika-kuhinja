import NextImage from 'next/image'
import ItemsTable from '../ItemsTable'
import DeletePostsButton from './DeleteMealButton'
import prisma from '@/utils/db'
import ToggleItemVisibility from '../ToggleItemVisibility'
import Link from 'next/link'

export default async function MealsTable() {
  const items = await prisma.meal.findMany()

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
          <ToggleItemVisibility item={items[index]} type="meal" />
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
              <Link href={`/dashboard/jela/${items[index].id}`}> Uredi </Link>
              <DeletePostsButton id={items[index].id} />
            </div>
          </div>
        ),
      },
    ],
  }

  return <ItemsTable items={items} tableStructure={tableStructure} />
}
