import CakeDetail from '@/components/shop/cake-detail/cake-detail'

const CakeDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <main>
      <CakeDetail id={id} />
    </main>
  )
}

export default CakeDetailPage