import { Button, Card, CardBody, CardFooter, CardHeader, useDisclosure } from '@nextui-org/react'
import PropTypes from 'prop-types'
import ArtisanAvatar from '../ArtisanAvatar'
import { useAuth } from '../../contexts/authContext'
import UpdateProductModal from './UpdateProductModal'

function ProductsListItem ({ product, getData }) {
  const { onOpen, isOpen, onClose } = useDisclosure()
  const { name, description, price, images, artisan } = product.attributes
  const { state: { user: { id: userId } } } = useAuth()
  const imgUrl = process.env.REACT_APP_IMAGES_URL + images?.data[0]?.attributes?.url
  const showArtisan = artisan?.data?.attributes?.profilePicture

  const canUpdate = artisan?.data?.attributes?.user?.data?.id === userId
  console.log('canUpdate', canUpdate)

  return (
    <Card className='max-w-[400px] min-h-[600px] flex flex-col flex-grow'>
      <CardHeader className='p-0'>
        <img
          src={imgUrl}
        />
      </CardHeader>
      <CardBody className='flex flex-col gap-4 justify-between'>
        <h3 className='font-semibold text-xl'>{name}</h3>
        <p>{description}</p>
      </CardBody>
      <CardFooter className='flex flex-row justify-between'>
        {
            canUpdate
              ? (
                <>
                  <Button variant='light' onClick={onOpen}>
                    Modifier
                  </Button>
                  <UpdateProductModal product={product} onOpen={onOpen} onClose={onClose} isOpen={isOpen} getData={getData} />
                </>
                )
              : showArtisan && <ArtisanAvatar artisan={artisan} />
          }
        <p className={`w-${showArtisan ? '1/6' : 'full'} flex justify-end text-right text-xl font-semibold`}>{price} €</p>
      </CardFooter>
    </Card>
  )
}

ProductsListItem.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductsListItem
