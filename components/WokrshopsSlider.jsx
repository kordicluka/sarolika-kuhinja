import React from 'react'
import { ItemsSlider } from './ItemsSlider'
import prisma from '@/utils/db'

export default async function WorkshopsSlider() {
  const items = await prisma.workshop.findMany({
    where: {
      isVisible: true,
    },
    select: {
      id: true,
      title: true,
      date: true,
      slug: true,
      image: true,
      description: true,
    },
    orderBy: {
      date: 'desc',
    },
    take: 5,
  })

  return <ItemsSlider type="workshops" items={items} />
}
