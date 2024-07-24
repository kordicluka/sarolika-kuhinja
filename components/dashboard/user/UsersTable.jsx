import NextImage from 'next/image'
import ItemsTable from '../ItemsTable'
import DeleteUserButton from './DeleteUserButton'
import prisma from '@/utils/db'
import Link from 'next/link'

export default async function UsersTable() {
  const items = await prisma.user.findMany()

  const tableStructure = {
    columns: [
      {
        title: 'Slika',
        width: '10%',
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
              {items[index].name.charAt(0).toUpperCase()}
              {items[index].name.split(' ')[1]
                ? items[index].name.split(' ')[1].charAt(0).toUpperCase()
                : null}
            </span>
          ),
      },
      {
        title: 'Ime',
        width: '25%',
        getJSX: (index) => <span>{items[index].name}</span>,
      },
      {
        title: 'E-mail',
        width: '45%',
        getJSX: (index) => <span>{items[index].email}</span>,
      },
      {
        title: 'Uloga',
        width: '10%',
        getJSX: (index) => <span>{items[index].role}</span>,
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
              <Link href={`/dashboard/korisnici/${items[index].id}`}>
                {' '}
                Uredi{' '}
              </Link>
              <DeleteUserButton
                id={items[index].id}
                title={items[index].name}
              />
            </div>
          </div>
        ),
      },
    ],
  }

  return <ItemsTable items={items} tableStructure={tableStructure} />
}
