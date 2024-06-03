import { Button, Input, Modal, ModalContent, Textarea } from '@nextui-org/react'
import { useState } from 'react'
import { updateProductApi } from '../../services/api'

function UpdateProductModal ({ product, onOpen, onClose, isOpen, getData }) {
  const { attributes } = product
  const [formData, setFormData] = useState({
    name: attributes.name,
    description: attributes.description,
    price: attributes.price
  })

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('formData', formData)
    try {
      await updateProductApi(product.id, formData)
      if (getData) {
        getData()
      }
      onClose()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal
      size='2xl'
      placement='center'
      onOpen={onOpen}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContent className='p-5'>
        {
        (onClose) => (
          <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
            <h2 className='text-2xl text-center my-2'>Modifier le produit</h2>
            <Input
              type='text'
              name='name'
              label='Nom : '
              placeholder='Le nom du produit'
              value={formData.name}
              onChange={handleChange}
            />
            <Textarea
              name='description'
              label='Description : '
              placeholder='La description du produit'
              value={formData.description}
              onChange={handleChange}
            />
            <Input
              type='number'
              name='price'
              label='Prix : '
              placeholder='00'
              value={formData.price}
              onChange={handleChange}
              endContent={
                <div className='pointer-events-none flex items-center'>
                  <span className='text-default-400 text-small'>€</span>
                </div>
              }
            />
            <Button
              type='submit'
            >
              Modifier le produit
            </Button>
          </form>
        )
      }
      </ModalContent>
    </Modal>
  )
}

export default UpdateProductModal
