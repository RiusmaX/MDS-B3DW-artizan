import { Button, Card, CardBody, CardHeader, Image } from '@nextui-org/react'

function ProfileCard ({ user, onClickUpdate }) {
  return (
    <Card className='py-4'>
      <CardHeader className='pb-0 pt-2 px-4 flex-col items-start'>
        <p className='text-tiny uppercase font-bold'>{user.username}</p>
        <small className='text-default-500'>{user.email}</small>
      </CardHeader>
      <CardBody className='overflow-visible py-2'>
        <small className='text-default-500'>Créé le {new Date(user.createdAt).toLocaleString()}</small>
        <Button variant='light' onClick={onClickUpdate}>
          Modifier
        </Button>
      </CardBody>
    </Card>
  )
}

export default ProfileCard
