import MenuDetail from '@/components/shop/menu-detail/menu-detail'

const MenuDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <main>
      <MenuDetail id={id} />
    </main>
  )
}

export default MenuDetailPage