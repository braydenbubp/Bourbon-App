import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

export default function UserBio() {
  const { user } = useAuth();

  return (

    <Card id="bio-card-img">
      <Card.Body>
        <Card.Title>{user.userName} </Card.Title>
        <p>{user.bio}</p>
        <Link href={`/user/edit/${user.firebaseKey}`} passHref>
          <Button variant="btn-small btn-secondary" className="btn">Edit Bio</Button>
        </Link>

        <Link href="/review/new" passHref>
          <Button variant="btn-small btn-secondary">Add A Review</Button>
        </Link>

      </Card.Body>
    </Card>
  );
}
