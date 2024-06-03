import { useAuth } from '../../contexts/authContext'
import { useFetch } from '../../hooks/Api'
import ProductsList from '../../components/products/ProductsList'

function Dashboard () {
  const { state: { user } } = useAuth()

  const { response, getData } =
  useFetch(`/products?filters[artisan][user][id]=${user.id}&populate[0]=images&populate[1]=artisan.user&sort=price:asc`)

  return (
    <>
      <h2 className='text-3xl text-center'>DASHBOARD</h2>
      <ProductsList products={response} getData={getData} />
    </>
  )
}

export default Dashboard
