import { Modal, ModalContent, useDisclosure } from '@nextui-org/react'
import ProfileCard from '../components/ProfileCard'
import UpdateProfile from '../components/forms/UpdateProfile'
import { useAuth } from '../contexts/authContext'
import { useFetch } from '../hooks/Api'

function Profil () {
  const { onOpen, onClose, isOpen } = useDisclosure()

  const { updateProfile, state: { user, loading } } = useAuth()

  return (
    <div className='container mx-auto'>
      <h1>Profil</h1>
      <ProfileCard user={user} onClickUpdate={onOpen} />
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
              <>
                <h2 className='text-2xl text-center my-2'>Modifier le profil</h2>
                <UpdateProfile user={user} onUpdate={updateProfile} isLoading={loading} onClose={onClose} />
              </>
            )
          }
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Profil
