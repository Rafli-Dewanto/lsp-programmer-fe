import CakeDetail from '@/components/shop/cake-detail/cake-detail'

const CakeDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <main>
      <CakeDetail id={params.id} />
    </main>
  )
}

export default CakeDetailPage