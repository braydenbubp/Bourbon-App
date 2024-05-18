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
        <div id="bioBtns">
          <Link href={`/user/edit/${user.firebaseKey}`} passHref>
            <Button variant="btn-small btn-secondary" className="btn">Edit Bio</Button>
          </Link>
        </div>

      </Card.Body>
    </Card>
  );
}

// api call on this page to get user to get firebasekey instead of router query
// get firebasekey into edit btn
